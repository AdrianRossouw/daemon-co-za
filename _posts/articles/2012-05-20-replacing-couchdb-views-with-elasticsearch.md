---
title: Replacing CouchDB views with ElasticSearch
category: post
layout: post
original_date: "2011-04-09"
alert: "I edited this post to provide more context, so that the references to the project internals actually make sense to those who didn't work on it.<br />This internal post eventually led to a [public blog post](http://developmentseed.org/blog/2011/may/31/flexible-faceting-and-full-text-indexes-using-elasticsearch/), but this is the journal of my concrete experiences with [ElasticSearch](http://elasticsearch.org)."
breakWords: 461
---
{% include dateDisclaimer.html %}

This devlog follows directly on from [my post about performance improvements](http://daemon.co.za/2012/05/json-schema-and-couchdb-bulk-import-performance).

The main gist of the previous post, was that I was having trouble fixing some bugs happening during a bulk import, due to the glacial pace the process was running at, and this pace was directly attributed to needing to generate incredibly large CouchDB views.

What started as a straight forward task, forced me to try some very interesting approaches, eventually turning into a completely experimental branch of the project I have been fiddling with on my free time over the last weekend. 

### We have ElasticSearch available, let's use it.

Since I had [last written about elasticsearch](http://daemon.co.za//2012/05/elasticsearch-5-minutes), we have implemented it for use in the search functionality on the background and analysis pages. Knowing the kind of indexes we were building this incredibly slow view for in couchDB, i thought it might be faster, if not more straight forward, to simply index the data with elasticsearch as well, allow us to make use of it's extensive query capabilities.

One of the concessions I did however make in my experiment, was that I saved the 'materialized' latest values and the respective year inside the object in CouchDB. It made not only the queries and indexing simpler, but made a whole bunch of the code around comparisons and displays cleaner too. It would probably have simplified things  for the maps too, so I am of the opinion we should probably have done this a long time ago regardless.

### About the data

The data for each of the school districts is split into around 65 indicators, which are then split (sparsely) into up to 10 values for each recorded year. The most complex view we have is used to compare each of the school districts to each other, based on these indicators. We end up with 57059 entries in the view for every dataset that is uploaded, and there are multiple datasets in the system at any one time.

Having this amount of data in CouchDB and the views is not a problem, but being in a situation where there is user-initiated batch imports into the system paints a very different performance picture than the traditional user contributed content workflow. What was killing us was having to import > 16k records all at once, not simply having > 16k records in the database.

<!--more-->

### Immediate improvements

Having ripped out the expensive views, this is what the import times looked like :

    Done: imported 13642 rows into k12_district as version 1 in 229459ms. Average: 16ms per record. # 3.8 minutes
    Done: imported 7523 rows into higher_ed as version 1 in 126311ms. Average: 16ms per record. # 2.1 minutes

    Rebuilt _design/data in 241ms.
    Rebuilt _design/districts in 741ms.
    Rebuilt _design/schema in 1214ms.
    Imported rows 13501 to 13600 into k12_district in 1857ms. Average: 16ms per record.

The time it took to import the data is down to 16ms per record, where it was between 48ms and 96ms before I made these changes.

### Comparison listing

This byIndicator view was being primarily used to generate the [comparison listings](http://febp.newamerica.net/higher-ed/MA/215500/compare/outstateprice), and we were using it to select the 10 records before the current record, and the ten records after the current record, sorted by the chosen field. I wasnt able to do it all in one query in ElasticSearch, but what I ended up was making two queries that looked something like this, and concatenating the results :

{% highlight javascript %}
{ 
    size: 10, // first ten results, excluding the current record
    query: { range: { "latestValues.cenpov": { lt: 0.098 } }},
    filter: { term: { version: 1 } },
    facets: { version: {  terms: { field: "version" }  } },
    sort: [ { "latestValues.cenpov": { order: "desc" } } ]
}

{ 
    size: 11, // current record, and the next ten results.
    query: { range: { "latestValues.cenpov": { from: 0.098 } }},
    filter: { term: { version: 1 } },
    facets: { version: {  terms: { field: "version" }  } },
    sort: [ { "latestValues.cenpov": { order: "asc" } } ]
}
{% endhighlight %}

<div class='alert alert-info'>I should note that the switch to ElasticSearch made it possible for us to do a lot more complex filtering, sorting and faceting than we would have been able to with just CouchDB views at our disposal.</div>

### Institution and enrollment counts

Because of the flexibility of elasticsearch, the other view I found that we could replace very easily was the 'count' views, that were solely responsible for populating the [little numbers on the front page](http://febp.newamerica.net/) stating how many universities and so forth there were. Once indexed, i could replace it with a query similar to :

{% highlight bash %}
curl -XGET http://localhost:9200/k12_district/k12_district/_count?q=version:1
{% endhighlight %}

Which is not even the most effective way, because we can easily [create facets on things such as versions](http://www.elasticsearch.org/guide/reference/api/search/facets/). It also has a tools in it's belt that allow us to structure queries that [include statistical analysis](http://www.elasticsearch.org/guide/reference/api/search/facets/statistical-facet.html) and even the results of [our own embedded javascript for fields](http://www.elasticsearch.org/guide/reference/api/search/script-fields.html). I eventually found my way to replacing the count views with the following :

{% highlight javascript %}
{ 
    size: 0,  // don't return any results we just want the summary
    query: { match_all: {} }, // match all records that arent filtered out
    filter: { term: { version: 1 } }, // filter out versions other than '1'
    facets: { 
        version: {  terms: { field: "version" }  }, // facet on the version field

        // add a statistical field called count. 
        count : { statistical : { field : "latestValues.enroll"  } } 
    }
}
{% endhighlight %}

This query returns the followingly formatted result, which allowed me to cleanly extract the needed information : 

{% highlight javascript %}
{
    "took": 5,  // 5ms , it gets cached
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": {
      "total": 13461, // number of matching rows, ie: district count
      "max_score": 1.0,
      "hits": []
    },
    "facets": {
      "version": {
        "_type": "terms",
        "missing": 0,
        "terms": [{
          "term": 1,
          "count": 13461 // same as above, but will give us counts per version
        }]
      },
      "count": {
        "_type": "statistical",
        "count": 13380,  // not all records have the enroll field
        "total": 4.8169628E7,  // the sum of the 'enroll' field for all districts
        "min": 0.0,
        "max": 968722.0,
        "mean": 3600.1216741405083,
        "sum_of_squares": 3.051386846346E12,
        "variance": 2.150949420439398E8,
        "std_deviation": 14666.115438109022
      }
    }
}
{% endhighlight %}

And so it went, as I slowly made my way through the whole codebase, trying to get replacement queries for pre-existing ones. I havent been aiming to actually use this on FEBP, because the project is already so close to done, but it has been useful to have real data and real requirements against which to evaluate ElasticSearch. I can stick my branch up somewhere if anybody wants to have a look at the changes.

### ElasticSearch trumps CouchDB views

I wasnt involved in the previous projects that used MongoDB as a backend, but I suspect that I can't be the only person who yearns for a more flexibile and powerful tool than CouchDB's views at times. There are definitely times when it fits the problem at hand, but more often than not i find myself missing a lot of the power I have been used to in the SQL world.

I also think the elastic search approach is easier to develop on, and allows you to be more productive. I think we should consider making it a more permanent fixture in our toolbelt, with the pragmatic dichotomy that we use CouchDB to store the data, and ElasticSearch to query for it. Yes, it may be another component that can break, but it has the distinction of being really good at what it does, which is also something that CouchDB has issues in.

To put it in another way, it's a hell of a easier to have your custom "data types" generate and manipulate JSON query objects to query the index, than to even consider doing something similar where your code ends up having to generate design_docs and views for couchdb on the fly, re-indexing and possibly stalling your database completely.

### Lessons for the future

If we ever move down the road of having a 'Data UI', being able to use the meta information from the schema to be able to build queries for these objects is going to be an important part of the puzzle. If we have the ability to [generate forms for json-schemas](http://daemon.co.za//2012/05/dynamic-forms-json-schema), and because the query language is itself json, we inherintly gain the ability to bootstrap a query builder interface too. 

Other than just our opportunities with it, Elasticsearch has other wonderful tricks up it's sleave like the sheer 'it just works' magic of the [Couch-db river](http://www.elasticsearch.org/guide/reference/river/couchdb.html), which has meant that the entire idea of a [searchlight](http://drupal.org/project/searchlight) or [apachesolr](http://drupal.org/project/apachesolr) module is obsolete. 

It also doesnt really give a damn about boundaries between databases. You can [query across search indexes and types](http://www.elasticsearch.org/guide/reference/api/search/indices-types.html) with reckless abandon. Because it's distributed you can do a lot of nifty things with this too, such as being able to have a company wide search, as well as the typical db-wide one.

There's the interesting notion of [percolation](http://www.elasticsearch.org/guide/reference/api/percolate.html), where you register a bunch of queries up front, and then pass it a document to retrieve results that match it (think term extraction for instance).

### Storing map data

Infinitely more in our court though, is that they [seem to be taking geo-spatial indexing fairly seriously](http://www.elasticsearch.org/guide/reference/query-dsl/geo-polygon-filter.html). None of the tools like mapnik work with it yet though, and I'm not really sure they know how to interface with the mapping community. 

As a complete mapping neo-phyte, and having experienced the 'bumps' of trying to get my local mapping instance up and running in this project, involving very very custom builds of sqlite and it's related stack, I kind of wish there was something like ElasticSearch as an option.

It supports [bulk updates](http://www.elasticsearch.org/guide/reference/api/bulk.html), so we could build support for importing shape files and the like. It's worth noting, that with it's [GET , POST and DELETE API](http://www.elasticsearch.org/guide/reference/api/get.html) it can function as a complete replacement for the key-data store function of CouchDB too.

I obviously don't have all the facts when it comes to mapping, but I would love for someone with the necessary expertise to take a proper look and see what might be possible.

