---
title: Tuning Elasticsearch
category: post
original_date: "2011-06-13"
---
This devlog has been a long time coming, but every time I have sat down to write it, I seem to peel back another layer of the onion, so I apologize if this is a bit dense.

#### Issue we needed to solve :

On both FEBP and Spinnaker, we experienced drastic instabilities relating to memory usage by ElasticSearch. After restarting elasticsearch, the problem resolved itself, but the question was how to stop it from happening ever again. Aside from doing the research, I have spent the last week keeping a very very close eye on the febp server, to try and get a grasp on exactly how the memory usage and performance of an Elasticsearch node changes over time.

None of this is actually affecting the usability or the performance of the sites btw, we simply have a situation where we have encountered a configuration problem that triggers a failure that is likely to occur again in the future, so i am just tracking it to avoid future issues.

It took the FEBP box months to slowly consume about 2.6gb of physical ram out of the 4gb available, but when it got big enough it caused a crash of the application while importing a new dataset that resulted in some maps on part of the site not displaying correctly.
<!--more-->

What I have noted is the following behaviour on febp :

1. Once ES is started it will take around 300mb of real memory, this may vary depending on the size and number of indexes. (in our case 4 indexes between 50 and ~26k documents each).
1. When doing a bulk import (in our case of the 13 000 records at a time), ES __may__ take up to an additional 50-100mb of system memory (which does not get released until the process is restarted).
1. Where the 'may' in the previous point comes from, is that under certain conditions the process will allocate far less memory to handle the indexing.
1. The memory usage for our data set seemed to settle around a comfortable 500mb of ram after a day or two, with no major jumps in allocation.
1. In all this time, I have not really seen ES release any of the memory it allocates back to the operating system.
1. While the memory usage is relatively stable, it grows by 5-10 megs every day, and because it never releases the memory, it eventually starves the other processes on the box.

### Configuring Elasticsearch Properly

I have put together a [post containing what I learnt about configuring ES](https://atrium.developmentseed.org/dsi/node/34883), but I still needed to use this new knowledge to figure out the optimal configuration.

My first thought was that this was related to caching. ES has a [number of different caches](http://www.elasticsearch.org/guide/reference/index-modules/cache.html) that could conceivably be running amok and never be cleared.

I spent a bunch of time experimenting with the various administrative API end points such as [flush](http://www.elasticsearch.org/guide/reference/api/admin-indices-flush.html), [optimize](http://www.elasticsearch.org/guide/reference/api/admin-indices-optimize.html), [refresh](http://www.elasticsearch.org/guide/reference/api/admin-indices-refresh.html) and [clear cache](http://www.elasticsearch.org/guide/reference/api/admin-indices-clearcache.html), but I was still unable to reduce the memory usage of a running process. 

It was only after I discovered the [node stats command](http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-stats.html), that I was able to track down the fact that it was [definitely not the caching causing the memory issues](https://gist.github.com/0fb00a132c3c1a591feb).

        "store_size" : "1gb",
        "store_size_in_bytes" : 1134093051,
        "field_cache_evictions" : 8128,
        "field_cache_size" : "12.1mb",   // definitely not the problem
        "field_cache_size_in_bytes" : 12753928,
        "filter_cache_size" : "28.1kb",  // yeeeaaah, not it.
        "filter_cache_size_in_bytes" : 28848

### Back to the drawing board.

I started asking around on IRC for pointers, and I was surprised to learn that this is a very very widespread issue. 

What I had run into, was not an ES issue, but instead an incredibly common issue with deploying ANY java application on the JVM. After doing some more scratching around, i discovered [the related documentation in the ES guide](http://www.elasticsearch.org/guide/reference/setup/installation.html). 

_(The irony is, that of all the pages in the guide, i read that one practically last because I could swear when i first looked at it several months ago it was just a stub with no information.)_

### Set the memory, duh!

What needs to be done is telling the JVM how much memory it is allowed to consume, which can be done through command line switches to the elasticsearch binary, environmental variables, the elasticsearch yaml config file and the method most relavant to our case, namely the elasticsearch.conf for the service wrapper (confused yet?).

This lead me to the discovery that our service wrapper was misconfigured a bit, which may or may not have caused it to ignore the already specified memory limits. Once fixed these settings should result in reasonable memory usage, __however__ they only control how much memory to allocate to the heap.

### Heaps and stacks and garbage collection.

What follows next gets a bit technical unfortunately, and forced me to become more acquainted with the JVM internals than I had ever hoped to be.

I received two possible, but conflicting explanations and solutions to my problems : 

Setting the PermSize and PermMaxSize
:  What seems to be occurring is that the jvm's ['PermSize'](http://www.velocityreviews.com/forums/t638220-xx-permsize-and-maxpermsize.html) is unbounded. Other than the main part of memory java allocates (the heap), which is garbage collected and thus will have memory reduced, it also has a "Permanent generation" heap, where it stores generated objects and the like, from what I can tell.     This is a very common thing to set for java applications apparently, and should be defaulted to something reasonable. The [discussion in irc](https://gist.github.com/b93373b1a6a1ae8f5a2e) also pointed out that reducing this limit may result in OutOfMemory errors.

Fixed memory allocation using mlockall
:  The docs tell us how to hard wire the memory usage of ES by setting the minimum and maximum memory usage to the same value, and forcing it to allocate all of the memory on startup using the bootstrap.mlockall setting. [That discussion actually made me hopeful that this would solve the problem](https://gist.github.com/0544447e144c3dbdc945), but if our problem is actually the PermGen would do nothing. This may also resolve another possible culprit, namely the possibility of the garbage collector getting confused by moving memory from the swap to the heap.

### Where I am now

So for now, I'm still keeping an eye on the FEBP server to see if fixing the corrupt service configuration might have been responsible for the basic memory limits not taking effect, and more so to get a grasp on how much memory ES is likely to need, if we decide to allocate it all up front. This is a bit of a tricky situation because it can take several days for a change in the settings to have an apparent effect, and it would take months for it to pose a real problem.

While I suspect the second option would resolve our issues, there is still the question of how much memory we need to set aside for ES. This would change from server to server and project to project, and I am still unsure of how to evaluate and determine this value. I *think* around 750mb of the 4gb would be reasonable, but I'm not really sure yet. I have seen node.js grow to about 700mb while doing large imports, but nothing else on the box seems to be really making use of much memory.
