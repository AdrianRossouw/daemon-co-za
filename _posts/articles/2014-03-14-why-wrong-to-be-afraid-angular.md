---
title: Why I was Wrong to be Afraid of Angular.js
layout: post
category: post
---

Recently I shared some of the thought processes that I went through when trying to
understand [why I chose to use Angular.js](/2014/03/wrong-to-be-afraid-of-angular) for a [little demo project](/2014/03/mirror-tumblr-picture-blogs-browsr) I was building
as a learning exercise.

This article is about what I took away from my experiment on a more intellectual level.

_Also, I'm currently "between challenges". 
If you have anything that you think would interest me,
please check out my [online portfolio](/portfolio)._

### When it was all said and done ...

The parts of [Angular.js](http://angularjs.org/) that caused me the most apprehension didn't even give
me a minute's worth of trouble. More importantly, instead of becoming frustrated, it was some
of the most fun I've had building stuff in a while.

Now that I know more about how everything fits together, I am also able to see that
it can actually be improved. It has the potential to become a lot simpler over time,
because it ended up having some sound design decisions at the basis of it.

<a name="observables"> </a>

### Observables are not the train smash I thought they would be.

I'm not going to lie, the current implementation with digest cycles and the like still seems far too fragile.

For instance, a [good friend of mine](http://acko.net) was telling me last night about a race condition he ran into
while integrating the JSON type of [share.js](http://sharejs.org/) into an Angular app he was building. He eventually concluded
that Angular's databinding assumes only one scope is changing at a time. That's a reasonable assumption if
it is being operated by a human, but programmatic modification can't really be guaranteed anymore.

These are the kind of things that are bound to happen with how that feature is built right now.  It also
wouldn't surprise me if this is a major source of the bugs and edge cases that affect people on a day to day basis.

Now that I have had the time to actually sit down with Angular though, I think that the developers have
managed to make this implementation work more reliably (for the general case) than I thought they would be
able to. I also think that it is possible to work around a lot of the things that can go wrong, if you are aware of them.

I now understand that this feature is so fundamental that it's actually something that should have been part
of the browser environment to begin with.

The main reason I am comfortable with this feature though, is that the current implementation is only 'For Now'.

{{raw}}
<iframe class="youtube col-lg-12 col-md-12 col-sm-12 col-xs-12" height="315" src="//www.youtube.com/embed/maBRrGbkPEs" frameborder="0">
</iframe>
{{endraw}}

Observables are being implemented on the browser level in a [future version of javascript](http://wiki.ecmascript.org/doku.php?id=harmony:observe),
so things will get better in the future. This means we won't stay shackled to the current limitations for all time.

On the other hand, I am still still not absolutely convinced that '2-way binding for all the things' is the sanest default,
but that may just be because I've not built many systems that legitimately needed it.

<a name="reuse"> </a>

### Sometimes I am fine with not being able to reuse my code on the server. 

The only reason I was able to use Angular for my test project was because I had explicitly set out to develop a [CouchApp](http://couchapp.org/).

In the last few years I have built many applications on [Node.JS](http://nodejs.org), and one of the constants in how I architected those
systems has been that I structured my code in such a way as to allow the largest amount of code reuse between the frontend
and the backend. I picked up this habit while I was still working with the [MapBox](http://mapbox.com) guys, but it is
something that has become central to how I approach any new system.

Most commonly this has taken the form of using the [Backbone](http://backbonejs.org) models and collections to drive the REST api (as above so below).
Other times I have needed to make use of the router, views and templates to pre-render the initial page view so that the client-side can just 'wake up' and take over
parts of the DOM. I've even used this technique to build a [distributed state machine over several multiplexed realtime communication channels](/2014/03/werewolves-io-alpha).

There is nothing in Angular that is really appropriate (or even possible) to re-use on the server in this manner. Because of that I would
end up needing to do almost twice the work, or somehow try to strap my Backbone models into Angular. The latter just feels like it has
too many moving parts that in turn have far too much of a functional overlap for that approach to end in anything other than tears. 

I can only really justify using Angular for a project where I don't have complete control of the backend or I am not able to use Node.js.

<a name='libraries'> </a>

### The angular eco-system is wonderful.

I wasn't afraid of not being able to find the libraries I needed, but I was aware of how difficult it can be to avoid jquery when
using third party code.

I found that most of the libraries I used were actually of a very high quality, and I am really impressed by the high amount of
re-use that directives allow for. I don't think it's even possible to have a third party Backbone extension provide UI elements
on this level, because there aren't really many assumptions backbone makes about what rendering view will result in.

I think the fact that the Angular community has made real progress towards divorcing themselves from jQuery is one
of the most encouraging signs for their future. The design of Angular is just different enough, and it is just compelling enough,
that it has convinced a whole range of developers to build a new generation of libraries that I suspect are more likely to be suited to
whatever the next iteration of the web as a platform will look like.

<a name='di'> </a>

### I was right to be scared of Inferred Dependencies

This is the one thing that I think my fears were entirely justified about. This feature more than anything else
made me doubt the entire platform. I don't think I am capable of not furrowing my brow just thinking about it.

They work by abusing the toString method of the function to be able to extract the names of the variables as
defined in the code using a regex. This has the acknowledged limitation that they break when minified,
because the code is altered.

I am actually going to need to write a more thoroughly researched post about why I believe they are a fundamental mistake,
but the basis of my argument is that they are completely and entirely uneccesary.

I was able to avoid them entirely by using the other two ways that are provided to do exactly the same thing. I don't
believe that level of magic is even remotely justified if the exact same results are possible with code that is
much more straight forward and doesn't break under what can be considered normal usage.

I think they should be deprecated, removed from the documentation and only ever be mentioned again in a version migration doc.
