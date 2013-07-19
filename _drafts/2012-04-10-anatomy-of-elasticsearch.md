---
title: The Anatomy of ElasticSearch
category: post
original_date: "2011-06-15"
---
Something we had run across before was the lack of usable documentation regarding how to configure ES, so I made a concerted effort to piece it all together.

#### Terminology

Index
:    A 'location' where documents are stored and indexed to be searched.

Shard
:    A search index may be split into a number of 'shards', each of which is a fully functional lucene search index. The logic here is that it is quicker to do several searches on a bunch of smaller indexes and collate the results, than it is to do a single search on a much larger index. The default number of shards is 5.

Node
:    ElasticSearch server, accessible via network or on localhost.

Cluster
:    A collection of nodes. When more than one node are in a cluster, nodes are dynamically elected to be  responsible for some of the shards of each index. So if an index has 3 shards, you may have up to 3 servers each hosting a shard.

Replicas
:    How many duplicates of shards to keep available on disk. If one of your nodes should stop responding, this would provide the capability of recovering without downtime as one of the other nodes will just take over with the replica.

Segments
:    Each ES shard is a fully functional lucene index, in the way we are traditionally used to. Lucene manages it's indexes by [splitting them into smaller segments to avoid having to rebuild the entire index when adding new data](http://stackoverflow.com/questions/2703432/what-is-the-segment-in-lucene).

#### How this affects performance

So the picture we have is : a __Cluster__ of one or more __Nodes__, hosting multiple __Indexes__, split into one or more __Shards__ (and keeping track of one or more __Replicas__ of those shards) which are split into one or more __Segments__.

I was doing some (fairly unscientific) experiments to try and determine how these things fit together. In short, I found that more indexes seems to result in a higher memory usage (but not drastically so). While experimenting with the number of shards my experience was that fewer shards do not have any noticeable effect on memory consumption, but had a fairly pronounced effect on CPU usage and responsiveness.

With the default 5 shards, the system remained responsive and usable, even while bulk importing 13k records, fewer shards resulted in noticeable slowdown and a dramatic increase in the time it took to index the data. Replicas had no effect on memory or performance, but seeing as we are only working on a single node and we are using couchdb as our main datastore, i suggest we disable them as a rule.

You can change the number of replicas on the fly, but to change the number of shards you need to rebuild the search index. You can also only have as many servers hosting an index as you have shards, so I think we should
just stick to the (reasonable) default which would allow us to add an additional server to the cluster if we ever need to.

#### Configurability

The other reason I discussed the terminology is because you are able to configure a number of settings to affect the operation of ES, but these settings may need to be configured on a node, index or shard level (sometimes more), and each of these levels are configured differently.

Node level configuration can always be done by [modifying the config/elasticsearch.yml file](http://www.elasticsearch.org/guide/reference/setup/configuration.html) and Index level settings are usually configured by doing a [PUT request against the indexes settings api](http://www.elasticsearch.org/guide/reference/api/admin-indices-update-settings.html), but there are special cases. Some index level settings also allow you to configure a default in the node level settings. Certain settings can be set on the fly, other settings require a restart, and yet other settings require the entire index to be rebuilt.

This is the reason that the documentation for configuration is so difficult to understand, the configuration properties are documented as part of the ['modules' that provide them](http://www.elasticsearch.org/guide/reference/index-modules/), and not where they could occur. This is also why there is no example config file in the tarball, as most of the interesting settings can't be set there.

To make it more fun, a number of the settings require you to specify things such as ["The max size (count, not byte size) of the cache (per search segment in a shard)."](http://www.elasticsearch.org/guide/reference/index-modules/cache.html)
