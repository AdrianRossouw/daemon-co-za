---
title: Building my first Jekyll site.
category: post
layout: post
original_date: "2011-10-20"
breakWords: 155
---
{% include dateDisclaimer.html %}

For the last 2 weeks I have been working on the new site for [Global Adaptation Index](http://gain.org), to bring it in line with the [index data site](http://index.gain.org) we built. We chose to use jekyll and github to built the main brunt of the site, which mostly involved 'about' pages and team profiles.

The experience has been interesting, and relatively painless. It has been a while since I have had to build something so straight forward and from scratch. I can't even remember the last time I had to build all the markup and styles for a site, as usually I only become involved once the structure is complete and we just need to wire up the functionality to it.

<!--more-->

![screenshot](/img/gain.site.png)

Jekyll is mostly straight forward, but has some very interesting limitations. First thing I found was that I couldn't use a front-matter variable to define a conditional include, such as that a specific page needs a video intro or an image intro. 

{% highlight javascript%}
  ---
  intro_include_file: intro-video.html
  intro_include: image
  ---

  // instead of being able to include the contents of the variable 
  {{ "{% include page.intro_include_file "}}%}

  // i ended up needing to build a swith on the contents
  {{ "{% case page.intro_include "}}%}
    {{ "{% when 'video' "}}%}
      {{ "{% include intro-video.html "}}%}
    {{ "{% when 'image' "}}%}
      {{ "{% include intro-image.html "}}%}
  {{ "{% endcase "}}%}

{%endhighlight%}

Data structures are way more difficult to work with than they have any right to be. You don't have anyway to access the nth item in an array, without using a for loop. You don't have any way to access a property on a hash table using a variable for the index. You can loop through hash tables, but they are cast to arrays.

This is made even more difficult because the sort order of posts is defined as the reverse date order, which leads to having to batch rename files for stuff that isn't really sequential (like team profiles). I ended up relenting and wiring up the next/ previous buttons on the client side, because it was an unholy mess trying to do it in liquid.

<div class='alert alert-info'>I ended up implementing the navigation this way for this site. It was as painful as I expected it to be. Will write about it soon.</div>

We decided to use tumblr for the [blog component on the site](http://news.gain.org), and I am in the process of building out the tumblr theme to match the jekyll layout. We pull in the latest blog posts on the front page, through javascript, instead of having to regenerate the pages when a new post is published.

This was a remarkably sensible decision which has made the project a hell of a lot simpler, because the main site does not need a database. It is something we should look at a lot more in the future, because it simplifies the requirements for a lot of sites where we could get away without needing a user system at all.
