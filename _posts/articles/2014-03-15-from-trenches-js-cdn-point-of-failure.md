---
title: 'From The Trenches: CDN-hosted JavaScript Represents an Additional Point of Failure'
layout: post
category: post
---
This is the first in a new series of articles on painful lessons that I have learnt from real problems I have faced in the past.
This is an effort to stop future generations from running into the same mistakes, or at the very least, it will give them
something to find via google when they get stumped.

Since I'm still busy collecting my thoughts on [why I was afraid of angular](http://daemon.co.za/2014/03/why-wrong-to-be-afraid-angular),
specifically illustrating what about the inferred dependency feature worries me so much, I decided to take a break from the topic to start
publishing some of my war stories.

<!--more-->

_Also, I'm currently "between challenges". 
If you have anything that you think would interest me,
please check out my [online portfolio](/portfolio)._

### Using a public JS CDN is inappropriate for anything more complex than a JSFiddle.

This really flies in the face of currently accepted best practices, but in the last 6 months I have
had two experiences that taught me this the hard way. 

I should add that I don't object to using a CDN to serve your static files, but rather to using a shared public CDN (such as cdnjs or google hosted libraries) to serve your vendor libraries (such as jquery and backbone).

While not my own experience, I have included
someone else's experience from a [reddit discussion](http://www.reddit.com/r/javascript/comments/1zsu7h/my_requirejs_itches_and_how_i_scratched_them/cfx7l40) to further illustrate my point.


#### My ADSL connection died.

This happened quite recently, where I was left with really flakey 3G. Since I had a critical deadline the next day, I was forced to make some changes to the application. Only then did I realize that
some of my other team members had changed some resources to use public CDN files, and also google fonts. 

Just loading up the application became a process that took several minutes to time out all the connections, before I was able to get a syntax error in my code. It took me about 2 hours to finally get all the resources hosted locally and to be able to START working on the critical fixes I needed to have ready just a few hours later.

#### The Botched Demo.

While it wasn't a catastrophe, our CEO was also affected by this when he was trying to demo our app for some investors. While at their offices, it turned out it was impossible
to get on their wifi, and he wasn't getting proper reception for his phone.

I gather that they hopped between conference rooms to try and get online more reliably,
and even then the youtube videos we integrated into our product weren't working properly. We eventually integrated our own player that could play from the local files or S3.

#### Just in the wrong place...

<blockquote>I live in china and most of the big public CDN don't go through the great firewall so i know that problem well. I personally have a "fake" CDN on my local that i use to server static assets when developing - <a href='http://www.reddit.com/user/0mbre'>0mbre</a></blockquote>

### Why you should not use a public CDN.

All of the problems caused above were entirely avoidable, and this post would not have existed, had we not been using a public CDN in the first place.

All of the files that your application needs for normal operation should be hosted together, instead of one library from this public CDN, one library from that public CDN, your code from wherever you serve your static files... and so forth.

You are adding an unnecessary dependency that all of those servers (on completely different networks) need to be available, and also reachable.

In still technical, but possibly more relatable terms:

<blockquote>Using code from a public CDN is similar to storing your most critical library (or DLL) files on an external network share (such as NFS or SMB), and then assuming it is always available when you run your application.</blockquote>

The generally accepted benefit of using a public CDN (such as cdnjs or google hosted libraries), is that your user _might_ have gone to another site that _might_ have used the same CDN to load the same version of the library before he loaded you window, and it _might_ still be cached in his browser. 

It is impossible to predict when these criteria will be met and what actual difference it will make to your site across your user base. Even if you could predict it, the only thing this would ever be able to do is optimize some theoreticaly best case scenario.

Your worst case performance is far more important than your best case performance because you should be focusing on making your application actually work, not improving a situation that is already pretty good.

<blockquote>Optimizing for the best case in this way is like releasing the hounds on runners hoping the fastest ones will run faster, while not caring that the slower ones are being mauled to death.</blockquote>


Using an external dependency this way increases the opportunities that inevitable network errors can break your system. If you are using a build system,
and self-hosting the files, a network issue that stops you from accessing the file has exactly one chance to be triggered. When you use the file hosted on the CDN, it
has as many opportunities as unique hits you receive (give or take).

<blockquote>The difference in probable risk between code that is self-hosted and public CDN-hosted, is like playing russian roulette with a revolver exactly once, or playing russian roulette as many times as you have hits per second.
</blockquote>

While it is certainly possible to [specify a fallback via some javascript](http://www.paulund.co.uk/fallback-on-local-jquery-if-cdn-fails), that is still not a good idea because
it is introducing complexity into your application's critical path that would not be necessary if you just didn't use the public CDN to begin with.

It also doesn't acknowledge that it
takes time for network requests to fail, so even if it does manage to fall back to your library you have just done twice as many HTTP requests and delayed your application from even starting.

__I firmly believe that you are introducing an unacceptable amount of uncertainty into your application through the use of external dependencies that can in no way
be justified by any possible benefits.__

### Engineering Principles

These are just the points i could handedly find wikipedia pages for, but they are actually well accepted engineering principles.

1. It represents a [Single Point of Failure](http://en.wikipedia.org/wiki/Single_point_of_failure).
1. Adds more [Moving Parts](http://en.wikipedia.org/wiki/Moving_parts#Failure) than needed.
1. "The Network is Reliable" is the first [Distributed Computing Fallacy](http://en.wikipedia.org/wiki/Fallacies_of_Distributed_Computing).
1. "Latency is Zero" is another, especially in relation to additional HTTP requests.
1. It is [Premature Optimization](http://en.wikipedia.org/wiki/Program_optimization#When_to_optimize).
1. Optimizes the best case, but [worst case performance](http://en.wikipedia.org/wiki/Worst_case) of much higher importance.


This is probably the most theoretical I will get in these articles, so hopefully i can give more concrete answers to
the problems I encounter in the future than just "I learnt not to do that".

I also feel that if more people understood that the internet is basically held together by duct tape, they would have a lot more reverence to the miracle that it
works even remotely as reliably as it does.
