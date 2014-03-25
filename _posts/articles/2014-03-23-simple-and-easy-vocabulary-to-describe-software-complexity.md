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

### Conclusion

We are going to stop here at about 25 minutes in, mostly because it's a really dense
presentation with a lot of concepts, and these are the most important ones I needed
to get across.

This article originally had 2 parts, but I felt it was better to just keep on updating
this document with the terminology, and moved the effects of complexity to the second
part in the series.

I __highly recommend__ that you watch the [presentation itself](http://www.infoq.com/presentations/Simple-Made-Easy), if you want to learn more.
