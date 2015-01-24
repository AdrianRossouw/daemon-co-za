---
title: The Rise of Microservices 
category: post
layout: post
---

[Microservices](http://martinfowler.com/articles/microservices.html) are a very old idea that have picked up a new head of steam, and they are becoming a very popular approach to building applications with node.js.  

I have [written about them in the past](http://daemon.co.za/2014/04/monkeys-and-microservices), but I have many months of experience migrating a monolithic app to a set of services now, so it was a good time to bundle everything up and share the knowledge.

__Slides from this presentation: arrow keys or space navigates between slides.__  

<div class='img-wrapper'>
   <a href='http://adrianrossouw.github.io/rise-of-microservices'><img alt='rise of microservices slides' src='/img/rise-microservices.png' /></a>
</div>

Instead of building a single application, why not build many applications that communicate over standard network protocols? With each service being very small (often around 100 lines of code), they become very easy to build and compose into new systems.

While they do have a lot of promise of being much more developer friendly, flexible and scaleable, there is no such thing as a silver bullet, and every benefit comes with some drawbacks.

_Originally built for the [Node.js Cape Town user group](http://www.meetup.com/nodecpt/events/199313432/), but I have presented these a couple of times since. The [microservice slides](https://adrianrossouw.github.io/rise-of-microservices), and [source code](https://github.com/AdrianRossouw/rise-of-microservices) are available on [my github account](https://github.com/AdrianRossouw)._

<!--break-->
