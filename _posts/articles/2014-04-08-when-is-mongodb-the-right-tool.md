---
title: When is MongoDB the Right Tool for the Job?
layout: post
category: post
---
Recently, I've been mentoring a few full-stack developers through a process that bears some similarity to the [Meerkat Method](http://datascienceretreat.com/meerkat-method.html). Since I also intend to publish a series of articles about the whole journey, I have to be careful to keep things factual and honest.

This puts me in a quandary, because my recent stint on the job market has shown that just about everybody is using [MongoDB](https://www.mongodb.com), and I've just never been in any situation that I have needed to use it.

I also can't foresee any situation where there is a solid technical reason for choosing MongoDB over it's competitors either, and the last thing I want to do is lead people astray or foist my preconceptions onto them.

_I'm still open to new projects, please check out my [online portfolio](/portfolio) and reach out if you think you have an interesting challenge for me._

## Why MongoDB?

__I'm looking for the cases where MongoDB was the right technical decision to make.__ I'm finding it really difficult to cut through the FUD to find any really impartial information about it.

This is something I have been asking other developers privately, and in some cases such as this [AskHN](https://news.ycombinator.com/item?id=7446919) and [again a few days later](https://news.ycombinator.com/item?id=7498637), publicly. I am __not__ trolling here, I genuinely want to know.

As some of my students are hoping to use these skills I share with them on the job market, I am either going to have to buckle down and learn it, or have a concrete reason not to.

__I want to know what your data looks like.__ What are the data access patterns, how much of it is there, how much trouble did you have building it, scaling it, but especially maintaining it?

{% capture quote %}
Show me you algorithm and I will remain puzzled,  
but show me your data structure and I will be enlightened.  
{% endcapture %}

<blockquote>{{ quote || markdownify }}<footer>Old programming proverb</footer></blockquote>

__I want to know the reasons you had for choosing Mongo.__ What databases were you using originally, what other databases did you evaluate, and why did you decide against them?

__Would you use MongoDB again?__ If you had to do it all over again, would you make the same choice, or would you use one of the other options such as [PostgreSQL](http://postgresql.org), [Redis](http://redis.io/), [CouchDB](http://couchdb.org), [ElasticSearch](http://elasticsearch.org), or any of the [dozens of competitors](http://en.wikipedia.org/wiki/NoSQL#Examples).

__I'm not looking for more MongoDB horror stories.__ There are plenty of those out there already. All that noise makes it really difficult to evaluate MongoDB on a technical level.

## My current perception of MongoDB.

{% include terms.html %}

I'm not saying that I am free of biases myself. Everybody has them, and I'm no different. I just don't feel comfortable making any kind
of blanket statement about a technology unless I've done my due diligence. These are the things about it that I hope to prove or disprove.

__The only benefit I can see in MongoDB is that it's popular.__ The only reason I can see for it being popular, is that everybody uses it, and so on.

__I worry about vendor lock-in.__ I spent years working with MySQL when I thought PostgreSQL was superior. The difference is that
they were so closely related that the majority of database code I wrote was incredibly portable between them.

__I have deep reservations about any database that is as prone to catastrophic failure.__ I'm not really sure that the possibility to configure it correctly
in any way makes up for the fact that it just doesn't come with sane defaults.

__A lot of people are saying that MongoDB is very easy,__ if you are only familiar with relational databases. I'm not convinced that not being relational is
a good enough reason to choose it if you are really going for something familiar.

__It really just seems too complex to me.__ MongoDB just tries to do so much, that it doesn't surprise me that
there are all of these nightmares with it. Redis I get, CouchDB I get, ElasticSearch I get. MongoDB? Not so much.

__Why is one of the major pluses that it has a really popular ORM for it?__ I don't like ORM's at the best of times, but using one for a non-relational database
just feels really strange to me. It's NoSQL so the first thing you do is declaratively define your schema? 

## I don't mind being proven wrong

I actually kind of enjoy it, because I find that I can [learn so much from those experiences](http://localhost:4000/2014/03/wrong-to-be-afraid-of-angular).
I __will__ update this post, or even write a new one if I manage to learn anything from this process.

For instance, the [one use case I have found](https://news.ycombinator.com/item?id=7498803) so far that actually makes a lot of sense.

{% capture geojson %}
Geolocation, specifically GeoJSON ... I'm not doing trivial 'find my 3 places near [y,x]' queries, but am traversing a pseudo-network of routes to calculate directions. Neo4j also wouldn't have worked in my case.
{% endcapture %}

<blockquote>{{ geojson || markdownify }}<footer><a href='https://news.ycombinator.com/item?id=7498803'>Nevi-M on HN</a></footer></blockquote>

I believe it because PostGIS/spatialite were so incredibly frustrating to move GeoJSON around in, and GeoCouch wasn't up to scratch either. I don't know if it would still be the right tool now, but I am willing to admit it was the right decision back then.

## How to reach me

I don't have comments on this blog, but I will read and respond to anything posted on:

* The <a href='{{hnThread}}'>HackerNews discussion</a>.
* The <a href='{{progitThread}}'>/r/programming thread</a>.
* You could even leave an [issue on GitHub](https://github.com/Vertice/daemon-co-za/issues) for me.

<aside class='bs-callout bs-callout-warning'><strong>Please try to be impartial.</strong> A lot of the feedback I have seen is that the way that MongoDB has been sold to developers is a large part of the problem. I am going to find it difficult to place a lot of trust in any party that stands to gain from selling Mongo as a product.</aside>

## Unless otherwise convinced

I will probably teach them the tools that I know the best. Those would be CouchDB as a data store, ElasticSearch as a search index and sometimes Redis to store sessions and other ephemeral data.

Using CouchDB as a separate "source-of-truth" and doing queries and reads from ElasticSearch makes a lot of sense to me because those things often scale differently. It is also in-line  with some of the [data storage lessons that LinkedIn have shared recently](http://vitalflux.com/data-handled-linkedin-com/).

Teaching CouchDB+ElasticSearch also means I can focus more on the principles of REST, and teach the concepts of node streams through the use of proxying connections around. 

This in turn would give me the opportunity to teach them about realtime systems such as Websockets or WebRTC instead of mucking around in MongoDB specifics.

That's probably the best course of action anyway, but I want to be able to take it with a clear conscience.
