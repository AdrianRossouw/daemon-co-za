---
title: How Complexity Affects Your Software
layout: post
category: post
---

This is the second in a series of notes I have made about an enlightening presentation called [Simple Made Easy](http://www.infoq.com/presentations/Simple-Made-Easy) by Rich Hickey, the creator of [Clojure](http://en.wikipedia.org/wiki/Clojure).

{% include terms.html %}

_Also, I'm currently "between challenges". 
If you have anything that you think would interest me,
please check out my [online portfolio](/portfolio)._

### The Parable of the USB Rat's Nest

<blockquote>
<p>Think of removing a cable from a big box filled with them.</p>
<p>The way those other cables come along with it, in a tangled mess?</p>
<p><strong>That's what complexity does to your software.</strong></p>
</blockquote>

### Development Speed

<div class='img-wrapper'>
   <a href='http://www.slideshare.net/evandrix/simple-made-easy'><img alt='simple made easy - development speed' src='/img/simple.easy.speed.png' /></a>
</div>

This 'experiential graph' represents how, if you focus on ease while ignoring simplicity, you might be able to move at top speed at the beginning of the project.
However, no matter what your tools are, or how advanced they are, the complexity will eventually kill your productivity.

While, If you focus on simplicity, you might not be able to move as fast initially because you will actually need to think
and plan before you start, you will be able to accomplish much more in the long run.

A lot of simple tools are still very easy, but the focus on simplicity is what is going to help you succeed.

__Complexity reduces your productivity over time to a point of grinding you to a near halt, whereas  
simplicity will slow you down initially and then level out to keep you productive for much longer than otherwise.__

### There are limits to our understanding

We can't make things reliable if we don't understand them, and there is a limit to the amount of things that can be considered together.
Intertwining things need to be considered together, because to understand the one thing you will need to understand how it affects the
others.

This braiding together of things is going to limit our ability to understand our software.

__Complexity makes it harder to understand your program,  
whereas simplicity makes it easier to understand.__

### Changing Things is Hard

To be able to change our software, we need to analyze what it does and make decisions about what it ought to do.
To be able to do that we will need to know where these changes need to be made and what will be impacted by them.

You need to be able to reason about your program to be able to change it without fear.

__Complexity makes it harder to change your program,  
whereas simplicity makes it easier to change.__

### Fixing Things is Even Harder

Every bug in the field has passed the type checker and passed all of the tests! These tools are like guard
rails, which are not going to help you figure out where you need to be going, and they won't steer your car
for you. You need to be able to use logic to debug your program, and to determine where the bugs may lie.

If you are not able to reason about your program, you will not be able to debug it.

__Complexity makes it harder to debug your program,  
whereas simplicity makes it easier to debug.__


