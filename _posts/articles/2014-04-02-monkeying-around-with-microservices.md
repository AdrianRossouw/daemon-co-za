---
title: Of Monkeys and Microservices
category: post
layout: post
---

__This is the first in a series documenting the process of building
out an example application for the Seneca.js framework, which is built
around the concept of microservices. This post is more
about the theory behind microservices, to lay the groundwork
for future posts as I embark on this journey.__

_[NearForm](http://nearform.com) is paying me for the development work,
but blogging about it is my idea. To take on this project I am going to be operating as an independent contractor for the next few months,
which means I am still open to new work, on a contract or permanent basis._

_Check out my [online portfolio](/portfolio)
and please get in touch with me if you think you have a project that would interest me._
{% capture intro %}
## The Parable of the Programmable Primate

_I'm starting here because I think it's probably going to be easier if everybody knows  
what kind of article this is going to be upfront._

<h3>It is helpful to think of your application as a monkey...</h3>
<div class='pull-right hidden-sm'>
<img class='img-responsive' src='/img/codemonkey.jpg' />
<footer class='bs-callout'>
   <h4>This is not your monkey!</h4>
   <p>This monkey's name is Charles,<br />
   and he's a better programmer<br />
   than you will ever be.</p>
   <p>If anything, I guess you could say<br />he is <a href='https://www.kickstarter.com/projects/gregpak/code-monkey-save-world'>JoCo and gPak's monkey</a></p>
</footer>
</div>
Your application is a monkey that you have trained to take a note from you, and then perform whatever
actions that will be required to result in what you asked for on the note.

__When it has finished reading the note:__ it starts skittering around
the factory floor, running in no discernible pattern, dashing between a random subset of
these bespoke manafacturing behemoths on display in front of you.

__Once it stops flipping levers__ and feeding industrial offal into the various machines, It comes back to you and gives you (hopefully) the result you requested.

__If it doesn't get everything perfectly right__, it might lose a limb on the belt sander, or set off a catastrophic factory fire.

__It might be a cleverer monkey than most__, but it's still just a monkey. __It doesn't matter how well you dress it__, it is still always just going to stay a monkey.

__The monkey can never be smarter than the one who trained  him__, so if you didn't warn it about 
putting ball bearings in the industrial microwaves... that's your fault. If you didn't tell him not to 
freely hand out the keys to your bitcoin vault. also your fault.

{% endcapture %}

<div class='bs-callout'>
{{ intro || markdownify }}
</div>

<div class='clearfix'>
I think my distate for needless complexity is nothing more than the realization that suspending a <a href='/2014/03/complexity-creeps-concerned-for-future-of-angular'>tightrope
over a pit of alligators</a> between the industrial lathes and the smeltery might <em>look</em> cool,
but you can never be sure your monkey isn't going to need to drag a crate of sousaphones across it.
</div>

<div class='img-wrapper'>
    <img src='/img/monkey1.png' />
</div>

## How do you train a better monkey?

When your monkey inevitably dies in a gruesome industrial accident, you are going to need to debug it by [digging around in it's
entrails](http://en.wikipedia.org/wiki/Core_dump) or cloning a new one and [following it around carefully](http://en.wikipedia.org/wiki/Debugger) on the factory floor to see where it went wrong so you can train it how to do the right thing. You might even write some tests to include in future
monkey training regimens.

You want to scale up your output? Sure, just build more factories with yet more monkeys. Redundancy is the same thing,
but you just leave a few spare factories and monkeys lying around for when the others explode.

What about threads? No reason you can't have more than one monkey per factory, you just have to be careful
to orchestrate it in such a way that they never run into each other or get into fights for the same 2x4 
from the wood pile.

<div class='img-wrapper'>
    <img src='/img/monkey2.png' />
</div>

## Microservices are a humane alternative

[Microservices](http://klangism.tumblr.com/post/80087171446/microservices) are a relatively new and not widely known approach to designing systems
in an incredibly distributed fashion. I say _"relatively new"_, but to put this into context,
there isn't even a wikipedia entry for the term yet. 

What they come down to though, is the following :

{% capture second %}
<h3>Why don't we just give each machine it's own monkey?</h3>

Every monkey would just get a note, with whatever resources it needed,  
that tells it to <strong>do exactly one thing</strong>.

If it is able, it does that one thing it knows how to do,  
and then it will <strong>return the result</strong>.

<strong>That is the sum total of the expectations we make of the monkey.</strong>
{% endcapture %}

<div class='bs-callout'>
{{ second || markdownify }}
</div>

<div class='img-wrapper'>
  <img src='/img/monkey3.png' />
</div>

## Is this just SOA by another name?

[Service-oriented architecture](http://en.wikipedia.org/wiki/Service-oriented_architecture) (or SOA) does have very similar goals, but through nature or nurture, SOA has evolved in a direction
that would more accurately described as specialization and segmented responsibilities.

In the context of this article, SOA would be like building a factory to house all your woodworking equipment,
and forcing everything that involves wood in some way to pass through this factory. That's still a valid approach,
but it's also not nearly as granular as microservices suggest.

I think that the desire and need to build systems this way has been with us for a long time, but
I think the environment that this new iteration is evolving in is going to allow us to get closer 
this "platonic ideal".

Because of [DevOps](http://en.wikipedia.org/wiki/DevOps) and the [Cloud](http://en.wikipedia.org/wiki/Cloud_computing), we are a lot more efficient at cloning monkeys and fabricating factories.

<div class='img-wrapper'>
  <img src='/img/monkey4.png' />
</div>

## Benefits of a Many-Monkey Maelstrom


Apart from just allowing us monkey trainers to sleep easier, with the knowledge that we are causing less
senseless carnage, there are many benefits to this approach as well.

### Scalability

Although not a requirement, systems designed this way are __inherently distributable and parallelizable__, since 
all of the monkeys only need a message and the required resources, it doesn't matter if they are
in the same factory, or hundreds of factories.

That alone makes them __easier to scale__, but let's say you notice that it's taking your monkey too  
long to paint things? How do you scale that? Easy, you just clone some more monkeys and give them paint brushes.

Because of their very nature, they are also __easier to build redundant systems with__ because you
can switch out individual monkeys/machines on the fly without bringing the whole factory to a halt.

### Simplicity

{% include terms.html %}

My favorite benefit is probably the focus on simplicity, that results in microservices
getting down to __less than 100 lines of code__. The resulting code is often so simple, that many
practitioners have found that __they no longer need unit tests__!

It's just __fundamentally simpler__, and therefor __easier to debug__, a system that has been
built on these principles. They make sense for the same reasons that people have realized
that functional programming really makes sense.

This also allows you to __more easily schedule development__, because each developer or team
only has a very specific set of requirements and can work on these completely independently.

It's also truly __indepentent of the implementation language__, because we don't care if
there's a capuchin monkey or an Orangutang pulling levers behind the scenes. It just doesn't matter
to us.

<div class='img-wrapper'>
  <img src='/img/monkey5.png' />
</div>



## An Idea as old as Industrialization

There are quite a few reprecussions
that you really have to follow to their logical conclusion to understand the benefits of.




Code monkey https://www.rockymounttelegram.com/media/story_image/042513MarqueeSec2CLIP.jpg
One got Fat http://www.reminisce.com/wp-content/uploads/2012/10/onegotfat.jpg
Mc Escher - http://en.wikipedia.org/wiki/M._C._Escher
:

