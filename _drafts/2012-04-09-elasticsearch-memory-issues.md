---
title: Elasticsearch memory leak solved.
category: post
original_date: "2011-07-14"
---
I spent part of the week putting to bed the resource creep issues we have been seeing with the JVM on our servers running ElasticSearch. Our methodology this week was to [run a bunch of different methods in parallel](https://atrium.developmentseed.org/dsi/node/35524#comment-84685), so that we could try more than one thing at a time and have something to compare the numbers to.

After helping Kimchy cancel out all the other options, our Fearless Maintainer dusted off his C-skills , D-Trace and started dumpster diving through the JVM source code. He managed to track down the [memory leak in the jvm](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=7066129) to code that is meant to monitor the VM for the very memory leaks it causes. This same issue has been hit by cassandra, netty and many many others in the past it turns out, but nobody had tracked down the 'WHY' till now.

Thankfully, there is already an option to disable the call in ES that calls this leaky function once a second, so we can fix the current servers by just adding <code>-Des.monitor.jvm.enabled=false</code> to the command line. After just one day, the test environment is using 160mb of memory, while the control is using 200mb.

This is not my screenshot, but from one of the other users who had the issue. Notice the constant usage after the last restart of ES:

![munin](http://img6.imagebanana.com/img/0ee7js7p/Selection_027.png)

I have also determined that we can significantly reduce the amount of memory that we configure the ES process with, since we only use about 15-30mb of the heap. On our biggest instance, i was able to reduce the heap to 128mb. There is probably more tuning I can do, but we'll get to that at some point.

I've rolled out the fix to all the instances, and future versions of ES will have this disabled by default.
