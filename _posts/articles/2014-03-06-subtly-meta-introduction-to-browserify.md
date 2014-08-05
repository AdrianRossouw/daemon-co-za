---
title: A Subtly Meta Introduction to Browserify
category: post
layout: post
---
I built these slides for a presentation on [Browserify](http://browserify.org) I gave at a [Node.js Cape Town user group](http://nodecpt.github.io) meetup
recently.

To make it a little bit more interesting, I used browserify to build the slides themselves. I then used browserify to pull in the
code that it built back into the slides to use it's own code for the examples!

You can find the [browserify slides](https://adrianrossouw.github.io/browserify-slides),
and the [code used to generate them](https://github.com/AdrianRossouw/browserify-slides) on [my github account](https://github.com/AdrianRossouw).

<div class='img-wrapper'>
   <a href='http://adrianrossouw.github.io/browserify-slides'><img alt='browserify introduction slides' src='/img/browserify.png' /></a>
</div>

#### Build Tools

As the slides progress the entire thing becomes more complex with various levels of transforms and clever trickery. At some point
the code even switches entirely to coffeescript (because typing yaml is easier than json).

I used a variety of packages from places like [bower](bower.io) and [npm](http://npmjs.org), and I used [grunt](http://gruntjs.com) to automate the entire build process.
If I were to do it over today, I would definitely be using [gulp](http://gulpjs.com) instead, since it's just so much closer to how I instinctually perceive a lot of these tasks (streams all the way down).

#### Other Tools

[Disc](https://github.com/hughsk/disc)
is a tool that visualizes the module tree of the bundle generated, allowing you to catch files that might have been included in error, and it is definitely my [favorite slide in the deck](http://adrianrossouw.github.io/browserify-slides/#/disco).

I used [Impress.js](http://bartaz.github.io/impress.js/) and a couple of other libraries to make it look nice. Impress was especially fun to mess about with, as it presents you with a css3d virtual space to distribute your slides on while it zooms between them.

It really tickled my inner yak-shaver to the point where I spent an embarrasing amount of time building a functional transition api that would allow me to
distribute the slides based on a formula. Basically I wanted to tell the slides to 'do a barrel roll'.

<!--break-->
