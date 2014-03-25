---
title: "Simple and Easy: A Vocabulary to Describe Software Complexity"
layout: post
category: post
---
Recently I was directed to an enlightening presentation called [Simple Made Easy](http://www.infoq.com/presentations/Simple-Made-Easy) by Rich Hickey, the creator of [Clojure](http://en.wikipedia.org/wiki/Clojure).

Because it's really difficult to justify asking someone to watch an hour long presentation just to be able to use the same terminology,
I'm publishing some notes here in a more easily digestible format. This is not a direct transcription, but more of a selective overview of the parts I consider the most important.

I still __highly recommend__ that you watch at least the first half of the [presentation itself](http://www.infoq.com/presentations/Simple-Made-Easy). 
While it does become a tad Clojure-specific at times, on the whole it remains broadly relevant. There are also
[slides from the presentation](http://www.slideshare.net/evandrix/simple-made-easy) up on slideshare, from which I have taken some screencaps for this post.

_Also, I'm currently "between challenges". 
If you have anything that you think would interest me,
please check out my [online portfolio](/portfolio)._

### Terminology 

Rich starts the presentation by examining the latin roots of the terms, to illustrate their meanings in this context.

<blockquote class='col-sm-6'>
<dl>
<dt>sim·ple</dt>
<dd>cf. <em>sim- plex</em></dd>
<dd>one fold/braid</dd>
</dl>
</blockquote>

<blockquote class='col-sm-6'>
<dl>
<dt>eas·y</dt>
<dd>cf. <em>ease&nbsp;&lt;&nbsp;aise&nbsp;&lt;&nbsp;adjacens</em></dd>
<dd>to lie near</dd>
</dl>
</blockquote>

__Simple__ is traced to _simplex_, a combination of _sim-_ (meaning one), and _plex_ (meaning fold or braid).  He describes it as a piece of string,
which if it only had one fold or twist, would still basically have no twists. The opposite of simplex is __complex__, which
literally means 'braided together'.  He describes it as having a couple or pieces of string that have been braided or
knotted together.

__Easy__, when traced down to the original latin _adjacens_, means 'lying close by' or 'to lie near'.  In the sense of
being having something be within reachable distance. The opposite of easy is __hard__, which doesn't actually have a specific
meaning here beyond the general usage of the term.

#### Simple vs Complex

When we look for things that are simple, we are looking for things that have one of something, such as
having one role; fulfilling one task or job; be about accomplishing one objective; be
about one concept (like security); or be about a particular dimension of a problem you are trying to solve.

Simple doesn't mean that there is just one of them, or that is an interface that only has one operation. It
is about the lack of [interleaving](http://en.wiktionary.org/wiki/interleave#English), not the [cardinality](http://en.wiktionary.org/wiki/cardinality).

__Simple is Objective:__ To see if something is __simple__, you can go look in the code and see whether there any connections, or any place that it twists with something else.
If it isn't interleaved, it's simple, otherwise it's complex.

#### Easy vs Hard

There are several different senses in which something can be easy or hard.  
Rich categorizes them in the following ways :

<dl>
<dt>Near, as in at Hand</dt>
<dd>On our hard drive, in our toolset or IDE... just generally available.</dd>
<dd><em>"Oh, library X includes that so we might as well use theirs!"</em></dd>
<dt>Near to our Understanding/Skillset</dt>
<dd>Familiar, or closely enough related to allow for knowledge transfer.</dd>
<dd><em>"I already know Library Y, so I will just use that!"</em></dd>
<dt>Near to our Capabilities</dt>
<dd>Whether it is within our ability to reason about, how 'smart' we are.</dd>
<dd><em>"What the hell is going on in Incredibly Complex Topic Z, I'm so lost!"</em></dd>
</dl>

__Easy is Subjective:__ For something to be __easy__ to me, it needs to be near to me, so it is relative to how
available and understandable it is to me, or whether I am even capable of understanding it.

Stuff that is easy to me, in the familiar sense, might not be easy to you. 
Stuff that is easy to you, in the capability sense, I might not even be able to comprehend.

#### Constructs vs Artifacts

We program using __constructs__. The programming languages, libraries, and tools we use
are all constucts. All of them also have these characteristics of being simple or easy, in
and of themselves.

The programs we build are the __artifacts__. All of the characteristics such as whether it runs, whether it
performs acceptably, or whether we have the ability to change it... those are all properties of the artifact, not the construct.

We tend to focus on our experience from using the construct, by emphasising how convenient it is for the programmer, or how
easy it is to replace programmers on a project.  

__We should be thinking about the artifacts we produce and how long term use of a construct will
affect software quality and our ability to maintain or change the software over time.__

### How Complexity Affects Us

<blockquote>Think of trying to remove a cable from a box you use for that purpose.
You know the way that all those other cables come along with it in a tangled mess?  
That's what complexity does to your software.
</blockquote>

#### There are limits to our understanding

We can't make things reliable if we don't understand them, and there is a limit to the amount of things that can be considered together.
Intertwining things need to be considered together, because to understand the one thing you will need to understand how it affects the
others. This braiding together of things is going to limit our ability to understand our software.

__Complexity makes it harder to understand your program,  
whereas simplicity makes it easier to understand.__

#### Changing Things is Hard

To be able to change our software, we need to analyze what it does and make decisions about what it ought to do.
To be able to do that we will need to know where these changes need to be made and what will be impacted by them.
You need to be able to reason about your program to be able to change it without fear.

__Complexity makes it harder to change your program,  
whereas simplicity makes it easier to change.__

#### Fixing Things is Even Harder

Every bug in the field has passed the type checker and passed all of the tests! These tools are like guard
rails, which are not going to help you figure out where you need to be going, and they won't steer your car
for you. You need to be able to use logic to debug your program, and to determine where the bugs may lie.
If you are not able to reason about your program, you will not be able to debug it.

__Complexity makes it harder to debug your program,  
whereas simplicity makes it easier to debug.__

#### Development Speed

<div class='img-wrapper'>
   <a href='http://www.slideshare.net/evandrix/simple-made-easy'><img alt='simple made easy - development speed' src='/img/simple.easy.speed.png' /></a>
</div>

This 'experiential graph' represents how, if you focus on ease while ignoring simplicity, you might be able to move at top speed at the beginning of the project.
However, no matter what your tools are, or how advanced they are, the complexity will eventually kill your productivity.

While, If you focus on simplicity, you might not be able to move as fast initially because you will actually need to think
and plan before you start, you will be able to accomplish much more in the long run. A lot of simple tools are still
very easy, but the focus on simplicity is what is going to help you succeed.

__Complexity reduces your productivity over time to a point of grinding you to a near halt,
whereas simplicity will slow you down initially and then level out to keep you productive for much longer than otherwise.__

### Conclusion

We are going to stop here at about 25 minutes in, mostly because it's a really dense
presentation with a lot of concepts, and these are the most important ones I needed
to get across.

At some point, I might do a second part, but there are a lot of Clojure and functional
programming specific terms that come into play, especially when Rich starts explaining
how to avoid complexity and how to fix it.

I __highly recommend__ that you watch the [presentation itself](http://www.infoq.com/presentations/Simple-Made-Easy), if you want to learn more.
