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

_To take on this project I am going to be operating as an independent contractor for the next few months,
which means I am still open to new work, on a contract or permanent basis._

_Check out my [online portfolio](/portfolio)
and please get in touch with me if you think you have a project that would interest me._

## Parable of the Simian Automaton

{% capture intro %}
<h3>It is helpful to think of your application as a monkey...</h3>
<div class='pull-right hidden-sm'>
<img class='img-responsive' src='/img/codemonkey.jpg' />
<footer class='bs-callout'>
   <h4>This is not your monkey!</h4>
   <p>This monkey's name is Charles,<br />
   and he's a better programmer<br />
   than you will ever be.</p>
   <p>He even speaks monkey natively</p>
   <p>If anything, I guess you could say<br />he is <a href='https://www.kickstarter.com/projects/gregpak/code-monkey-save-world'>JoCo and gPak's monkey</a></p>
</footer>
</div>
A monkey that you have trained to: take a note you pass to it, 
read and understand what the note asks for.

__When it has finished reading your note:__ it starts skittering around
the factory floor, running in no detectible pattern, dashing between a random subset of
these bespoke manafacturing behemoths on display in front of you.

__Once it's stops flipping levers__ and feeding industrial offal into the various machines, It comes back to you and gives you (hopefully) the result you requested.

__If it doesn't get everything perfectly right__, it might lose a limb on the belt sander, or set off a catastrophic factory fire. Often, it dies in a blaze of fire.

__It might be a cleverer monkey than most__, but it's still just a monkey. __It doesn't matter how well you dress it__, it is still always just going to stay a monkey.

__The monkey can never be smarter than the one who trained  him__, so if you didn't warn it about 
putting steel samples in the industrial microwaves... that's your fault. If you didn't tell him not to 
freely hand out the keys to your bitcoin vault. also your fault.


{% endcapture %}


<div class='bs-callout'>
{{ intro || markdownify }}
</div>

## Meanwhile in the "real world"

We start hearing murmurs of this new way, possibly a better way, but almost definitely
a simpler way, 

Microservices are a relatively new and not widely known approach to designing systems
in an incredibly distributed manner. I say relatively new, but to put this into context,
there isn't even a wikipedia entry for the term yet.

What I find fascinating about them, is that they mostly exist as a form of tribal knowledge at the moment,
which has been evolving out of hard-won experience by engineers with decades of experience building really 
complex enterprise level
systems.

While informed by their SOA forebearers, they have broken free of the shackles of
restrictive schemas and overbearing standards committees, and take the idea down
to it's most effective.


## I Strain Metaphors for a Living

Imagine, instead of a monkey for each factory, you instead were able to have a monkey
at each machine.


<div class='img-wrapper'>
  <img src='/img/onegotfat.full.jpg' />
</div>

## Why would you want that?

The first touted benefit is usually 'scaling'. When you are in that situation, you could
just as easily have 5 or 10 or 1000 processes for that specific function. You have an
incredible amount of options to scale to loads that most monolythic systems will only
dream of.

Another interesting point on the scaling aspect, is that you are able to do rollouts
much more quickly without getting any downtime. From this point on all new instance
of save_user will load up 2.0, and the old ones will be shut down after their current
task.

My favorite is probably the focus on simplicity, that results in microservices often
getting down to 100 lines of code.



There are quite a few reprecussions
that you really have to follow to their logical conclusion to understand the benefits of.







## Where I get involved

Shortly after publishing my recent series of posts about software complexity, 
was contracted by NearForm (an established and well-respected Node.js consultancy firm),
to build an example app on such a microservices architecture.

They have been working with this architecture for almost 3 years now, but because
the majority of their projects are consulting for much larger companies. there is
just nothing on the code-level that they have to show for it.

There is no real publicly available open source node.js app that is built
in a microservices manner.


Blogging about it, was my idea. This is a fascinating topic that really
resonates with a lot of things I have been working out for myself about
the complexity of software.












As a result of my recent series of posts about software complexity, I have been
contracted by NearForm to build an open source application to illustrate the uses
and benefits of a 


Code monkey https://www.rockymounttelegram.com/media/story_image/042513MarqueeSec2CLIP.jpg
One got Fat http://www.reminisce.com/wp-content/uploads/2012/10/onegotfat.jpg
Mc Escher - http://en.wikipedia.org/wiki/M._C._Escher
:

