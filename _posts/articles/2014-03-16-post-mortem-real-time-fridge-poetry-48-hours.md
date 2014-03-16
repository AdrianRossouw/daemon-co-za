---
title: 'Post-Mortem: Real-Time Fridge Poetry in Just 48 Hours'
category: post
layout: post
iframe: false
---
{% capture preface %}
[Helvetica Cardigan](http://cardigan.daemon.co.za/) is an implementation of the popular 'fridge poetry' curio.

It was completed in 48 hours during the Node Knockout 2012 coding contest by [myself](http://daemon.co.za) and [Le Roux Bodenstein](http://twitter.com/lerouxb). The name comes from one of the combinations we made with the default 'hipster ipsum' wordset. You can add your own fridges with your own words too.

Although it was finished back then, I spent some time cleaning it up last night to make it a bit more interesting to blog about. Primarily I added the ability to embed it into other pages, and improved tablet support.

It has been released under a MIT license and the [source is available on GitHub](https://github.com/Vertice/helvetica-cardigan).
{% endcapture %}

<div class='bs-callout-info bs-callout'>
 {{preface || markdownify}}
</div>

{% if page.iframe %}
<div class='iframe-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12'>
  <iframe height="315" src="http://cardigan.daemon.co.za/e" frameborder="0">
  </iframe>
</div>
{% else %}
<div class='img-wrapper'>
   <a href='http://cardigan.daemon.co.za/' target='blank'>
       <img src='/img/cardigan.offline.png' />
   </a>
</div>
{% endif %}

You know... for some [very narrow definitions](http://en.wikipedia.org/wiki/WebSocket) of ["real-time"](http://en.wikipedia.org/wiki/Real-time_computing). Doesn't it feel
like there needs to be an [Emoji](http://en.wikipedia.org/wiki/Emoji) for air-quotes?

The last startup I was involved in declared bankruptcy last week, so I've
just kind of been taking the time to delve through the projects I've built in
the last few years to flesh out my [online portfolio](http://daemon.co.za/portfolio).

My exploration around the [motivation for using angular](http://daemon.co.za/2014/03/why-wrong-to-be-afraid-angular) in a [recent experiment of mine](http://daemon.co.za/2014/03/mirror-tumblr-picture-blogs-browsr) has gotten [a little bit ... deep](http://daemon.co.za/2014/03/wrong-to-be-afraid-of-angular), so I've decided to change the pace and revisit something fun and frivolous today.

### Fisher Price's My First Hackathon

If I were being completely honest, I think my [decision to start a Node.js user group](http://daemon.co.za/2012/05/why-start-a-nodejs-user-group)
was largely influenced by my desire to take part in a node knockout. It just looked like so much fun,
and the idea of being able to __crush__ a challenge like that looked like it would be very rewarding (and it is).

NKO is definitely what made me finally realize to what degree I was living in a vacuum, and that
I was going to stagnate both professionally and most likely emotionally if I didn't find people
I could discuss my interests with.

Thankfully me and the Le Roux (my co-founder) hit it off, and have been fast friends since. Sometimes it's just nice to actually have peers, you know?

### Maybe we should try something a little bit less ... ambitious?

We decided on this project the afternoon before the contest started, when I was just blurting out
possible things we could build. That wasn't the original plan.

The original plan was building a pseudo-realtime naval combat board game,
that made me research things like [hexagonal grids](http://www-cs-students.stanford.edu/~amitp/gameprog.html#hex_),
[path finding algorithms](http://theory.stanford.edu/~amitp/GameProgramming/), [webGL](http://creativejs.com/) and so much more.

That day before, we had to admit to ourselves that there was no way we would ever be able to do all that. Obviously we
made the right choice, and once I knew what we wanted to do for the next year, I spent the year planning out the project
meticulously.

I think this reinforced that you should acknowledge your limitations and focus on what is possible right now.

### Why are build systems so hard?

Oh god. It was so painful to get this up and running, because this was pre-grunt and pre-gulp and pre-browserify. We only started building at 8am when Le Roux came over to my house, and it took us most of the first day to get something
up and running. 

A few weeks before we played around with ender, and checked out whether require.js was feasible for us... It wasn't,
but that's an article for another time. We ended up erring towards just having duplicates of the libraries that we
served via express, because we had no idea how to make the same jquery be used on the client and the server. You know
what? That stuff is still hard, and it's taken me a long time to [wrap my head around it](http://github.com/Vertice/browserify-harness).

The next year, I used the fact that we live on the GMT+2 timezone, and the fact that Le Roux is a 'Day-Walker', to
get the full build process ready for him in the six hours between 2am and 8am. I really don't get a lot of sleep on these weekends.

We ended up with something pretty simple, where we had the backbone models in a [common.js](https://github.com/Vertice/helvetica-cardigan/blob/master/lib/common.js), the views and the like
in a [client.js](https://github.com/Vertice/helvetica-cardigan/blob/master/lib/client.js) and the routes in a [server.js](https://github.com/Vertice/helvetica-cardigan/blob/master/server.js).

### What do you mean it's down?

While we didn't have as much of a mad dash to the finish line for this project, we did have some pretty
annoying bugs. I ended up having to restart the application several times during the next week, because it would somehow start
delivering empty fridges to the visitors.

I _think_ I finally tracked it down yesterday to not removing socket.io handlers on disconnect, but I can't really be sure
until I have lots of people connecting to the server. We'll see if the embedded fridge above holds.

### Yeah, no ... i'm not making a screencast right now.

After we finally finished at 8pm on sunday night, we realized dejectedly that we needed to make a video to be eligible for judging.

Video production is not really part of my skillset, and I wouldn't even know where to start looking for the best tools for the job. Also, the very last
thing I want to do after a weekend with no sleep, and incredible stress levels, is to make a fscking video.

This didn't change for the next year either, which was an even more demanding project. I don't think I will ever complete this requirement of the contest, but I am quite ok with that because I am not really taking part in them for
the external recognition.

I learnt a lot, and I had a lot of fun. Which is what really matters, right?
