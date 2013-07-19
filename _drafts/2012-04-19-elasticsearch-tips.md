---
title: Some Elasticsearch tips
category: post
original_date: "2011-04-13"
---

Even though the [Elasticsearch docs](http://www.elasticsearch.org/guide/) are very thorough, they suffer from a stunning lack of context at times, especially in the discussion on the [Query DSL](http://www.elasticsearch.org/guide/reference/query-dsl/).

#### Selecting records where a list of fields match.

I ran into this where I wanted to return matches for the auto-complete that contained not just matches on the state or district name, but also the postcode (ie: the state abbreviation such as "NY").

Every query is required to have a Query element (which is obvious), but by default you are only able to specify a single 'query object'. If i was only looking at a single field, i would end up with a query like this :

    // POST body for http://localhost:9200/k12_state/k12_state/_search

    // would return nevada and new york etc.
    {
        query: {
            prefix: { state: "ne" }
        }
    }

But if i were to do that query with "ny", it would not return new york, since it was not searching the 
postcode field. Instead of doing 2 queries, what we are actually attempting to do is search on multiple fields. Elasticsearch gives you a couple of different ways to do this, but what I found works well for this case is the ['constant score query' ](http://www.elasticsearch.org/guide/reference/query-dsl/constant-score-query.html)

### Constant_score

What constant score allows you to do is wrap a filter, inside a query, and instead of having to evaluate and score the results of a search, it will simply add the records you filtered for to the results, at the constant score value you specified. 

This is much faster than what would otherwise be happening, and scoring may seem a bit complex right now, but it could become an interesting tool later on when we start trying to express queries such as "Show me the most related records in my general facility, failing that give me the most relevant other records", where the geographic results would be considered more relevant hence we assign them a higher score.

This intermediate stage looks like this :

    {
        query: {
            constant_score: {
                filter: { prefix: { state: "ne" } }
            }
        }
    }

#### The magical thing about filters

Once you get into filters and the closely related facets, you get a fairly interesting set of toys to work with, but specifically in this case we will be making use of the ['or filter'](http://www.elasticsearch.org/guide/reference/query-dsl/or-filter.html). 

Most any place you can put an filter, you can use an 'or' boolean wrapper inside it. The or allows you to place an array of filters instead of just a single filter, with the resulting query looking like this :

    // returns the correct results
    {
        query: {
            constant_score: {
                filter: { 
                    or : [
                        { prefix: { state: "ny" } },
                        { prefix: { postcode: "ny" } }
                    ]
                }
            }
        }
    }

### Across indexes

Previously we were doing 2 searches, one against the states stored in the k12_state database, and another against the school districts stored in the k12_district database. Because we are no longer bound by the limitations of the couchdb database, we can instead add the additional field to check for results, and query multiple indexes with the same query :

    // POST against http://localhost:9200/k12_state,k12_district/_search
    // Returns matching states and districts !
    {
        query: {
            constant_score: {
                filter: { 
                    or : [
                        { prefix: { state: "ny" } },
                        { prefix: { postcode: "ny" } },
                        { prefix: { leaname: "ny" } }
                    ]
                }
            }
        }
    }

It seems with ElasticSearch there is more than one way to do things, at almost all times, and the learning curve is a little steep in the beginning. This is mostly however because of the flexibility afforded to you, as the tool allows you to search for things on a level that would even be difficult to express in a single SQL query.




