---
title: amanda vs jsv
category: post
original_date: "2011-11-28"
---
I recently discovered [Amanda](https://github.com/Baggz/Amanda), a very new json-schema validator. I literally stumbled across it in a random google search, as it hasnt even been anounced on the mailing list or listed on the json-schema.org site yet.

Amanda's primary advantages are that it is very clean and small. (compressed = 5kb). It is also asynchronous in design and easily extensible. It is also very actively in development, and the author is responsive to the emails I have sent him. It's disadvantages are that that it is not a complete implementation of the spec, and some of the major parts missing may be a show stopper for certain uses.

My biggest complaint is that it does not support $ref, which is in my opinion the single most powerful feature of json schema. It is integral to the design of the schema that it was just split out into it's [own specification](http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-01). It is what allows you to define custom types for objects, handling inheritance and allowing you to keep your code DRY. Almost every json-schema using project I worked on ended up having a problem that was best solved using json-referencing, but I realize I climbed the difficulty curve earlier than most, so I know how it works.

I have been in contact with the author about $ref support though, as I am aware that dojo has a very portable implementation of json-ref that we should be able to adapt/retrofit into the library. I will be doing some more tests with it to see how well it works for problems we have already encountered.

__in defense of JSV__

Jeff asked me last week to evaluate different json-schema implementations because of several pain points you guys were experiencing with JSV. The concerns were especially oriented around performance, the difficulty in providing friendly user messages from failed validations and the large size of the library.

JSV is so complex because it is as close as possible to an extensible reference implementation of the spec, which it does by being very declaritive and recursive. Because the json-schema itself is written as a json-schema, JSV uses the base schemas to build it's validator object. Because of this it supports all the drafts of the spec simultaneously, which acts as an important compatibility feature. When a new version of the spec comes out and becomes supported by JSV, you are not forced to upgrade all of your existing schemas to be able to make use of later versions of the library.

The best practices of using JSV are also not widely known, although I [have documented them here before](https://atrium.developmentseed.org/dsi/node/33271). If you use JSV in a less optimal way, you greatly impact the performance of your application, because instead of making use of an instantiated validation object to represent the your already validated schema, you will be instructing it to build this schema object, which in itself needs to build the json schema schema validator object and so forth. If you don't understand JSV it is liable to punish you severely.

Because it is so deeply self referential and recursive it becomes incredibly difficult to generate useful error messages in a way that makes sense to your application. You literally end up with only the URI that it was evaluating, and the URI of the constraint it failed, and some basic error description. The functions that generate the errors have absolutely no way of knowing whether you are busy validation the json-schema itself, your own schema, the object you gave it, or one of it's properties (or any combination of those). To generate the friendly error messages requires you to do some very frustrating string manipulation and context lookups, and you will still only be able to hit the situations you actually program for.  You are guaranteed to get edge cases.

I completely understand why a developer might not feel comfortable with JSV, but after having spent a fair amount of time working with it and the json-schema, I can appreciate and acknowledge that it's design is well suited and written for what the author is trying to do. It is just trying to solve a different problem (validate all the things, all the way down) versus what you would expect it to (validate my object against json schema).
