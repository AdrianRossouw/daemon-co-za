---
title: "Complexity Creeps: Why I'm Concerned for the Future of Angular.js"
category: post
layout: post
---
{%capture code1%}
#### Inferred Dependencies
{% highlight javascript %}
function ctrlFn($scope) {
  // code
}
{% endhighlight %}
#### $inject Annotation
{% highlight javascript %}
var ctrlFn = function($scope) {
  // code
};
ctrlFn.$inject = ['$scope'];
{% endhighlight %}
#### Inline Annotation
{% highlight javascript %}
var ctrlFn = ['$scope',
  function($scope) {
      // code
  }];
{% endhighlight %}
{%endcapture%}

In recent weeks I have been trying to resolve [why I had such a visceral reaction to Angular.js](http://daemon.co.za/2014/03/wrong-to-be-afraid-of-angular),
that I even started dreaming about it.

After having worked my way through the [parts of Angular.js that concerned me the most](http://daemon.co.za/2014/03/why-wrong-to-be-afraid-angular), I think
that I have finally narrowed it down to the fact that I believe the way it tries to infer dependencies is a
critical mistake.

### Github issue: [Please consider removing inferred dependencies](https://github.com/angular/angular.js/issues/6717)

{% capture portfolio %}
Also, I'm currently "between challenges".  
If you have anything that you think would interest me,
please check out my [online portfolio](/portfolio).
{% endcapture %}

<div class='bs-callout-info bs-callout'>
 {{portfolio || markdownify}}
</div>

### Inferred Dependencies

Angular.js uses a pattern called called [Dependency Injection](http://en.wikipedia.org/wiki/Dependency_injection) to pass references into various parts of the system, but it
is not this pattern in itself that I object to.

When you reach this point of the developer guide, it will introduce you to three different ways of accomplishing the exact same outcome. What is disconcerting though, is that the first way they tell you to do it, also has the documented caveat that it breaks under minification.

The reason that it breaks minification, is that is using some really clever trickery to abuse parts of the javascript language, to 
do things that conflict with the fundamentals of the language itself.

Specifically, it uses Function.prototype.toString(), to read the source code of the function that is being called, and extract the names
that the parameters were given in your source. Because minification changes those variable names, it can no longer rely on that to work.

This following video is not needed to understand the rest of the article, but it shows you what Angular is actually doing when it does this:

{{raw}}
<iframe class="youtube col-lg-12 col-md-12 col-sm-12 col-xs-12" height="315" src="//www.youtube.com/embed/Jyhz2e4grHo" frameborder="0">
</iframe>
{{endraw}}

### Parable of the Fulminating Automobile.

I think that all of this is a just really bad idea and is going to have signicant negative consequences for the long term maintainability
and viability of Angular.js as a platform.

When I first read all this, this is the scenario came to mind:

{%capture quote1%}
On your first day at a new company, you are offered the use of one of three company cars.

As you slip into the red car nearest you, you notice a small sign on the dashboard saying "warning: red cars will explode violently on wednesdays".
{%endcapture%}

<blockquote>{{quote1 | markdownify}}</blockquote>

I worry about the fact that something like this is just accepted and people have decided that it's easier to just warn others about the exploding cars rather
than just not giving people exploding cars to begin with. This is expounded by the fact that there are two other perfectly working cars, which might not be your favorite color, but at least they won't
kill you.

When I've discussed these opinions with people, many of them have pointed out the existence of [ngmin](https://github.com/btford/ngmin), which
is a pre-minifier for Angular applications that rewrites the source code into something that can be minified.

### Tooling as a workaround
{% capture disclaimer %}
I really need to state first, that I greatly respect the developers and maintainers of ngmin, and I value that they have taken their
time and energy identify a common problem and by solving it enriched the lives of their users and the open source community in general.

The following is in no way an attack on the quality of their work or the time and dedication they have spent on their project.
{% endcapture %}
<div class='bs-callout-info bs-callout'>
{{disclaimer | markdownify}}
</div>

When you start talking about solving a problem this fundamental with tooling, you are saying something like:

{%capture quote2%}
"The red cars won't explode as long as you drive on these roads we specifically built for them.
These roads are closed on wednesdays."
{%endcapture%}

<blockquote>{{quote2 | markdownify}}</blockquote>

I think we need to acknowledge that the primary reason for the existence of a tool like ngmin, is
to work around the bug that is not possible to fix in and of itself. I also think we would all be better off in a world where the authors of ngmin would have been able
to solve problems for the greater good that weren't ultimately completely self inflicted.

### Matter of Principle

I don't believe it is justified to argue that this allows you to program in a more [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) manner
while ignoring the fact that it breaks the principles of [KISS](http://en.wikipedia.org/wiki/KISS_principle) and [least astonishment](http://en.wikipedia.org/wiki/Principle_of_least_astonishment).

It's also not correct to try and optimize for the avoidance of localized bugs caused by user error,
by introducing deep systemic problems.

The user can easily fix their typo, but needing to dive through all those layers of abstraction when this magic breaks? You will also still be able to make a typo in the format that has all the magic.

### The Long Tail

Even though I have been accused of overthinking this, people really need to understand that this
kind of thing has an incredibly long tail.

Ngmin has a grunt plugin, and I've seen many people recommending the yeoman Angular generator
primarily because it configures ngmin correctly out of the box. All of those projects have
issue queues and stack overflow questions and thousands of references all over the internet.

None of that needed to exist, if this feature was acknowledged as being flawed in the first place.

### Past sets precedent

I have thought about this a lot, and I really only see one way that this can end, and it's not pretty.

At some point someone is going to find a compelling reason to use this technique to do something that
has a desirable enough outcome to make it seem like a good idea.

It's probably going to be something like "let's inspect the source to tune the digest cycle", which I have no
idea if it is even possible, but i'm pretty sure it will be along those lines. It might also be further syntactic
sugar.

People might feel a little uneasy about it, but ultimately it's going to win support because you will
be able to extend the tooling to support this new feature. This will make the tooling more complex, and
expand the ecosystems built on top of them further.. etc.

### You Can't just say no

With so many people interested in Angular, and the amount of time this will play off in, I think it really
is inevitable that at some point, somebody will come up with reason so compelling you can't say no to it.

If you try to head this off using social engineering, by refusing any additional changes along these lines,
you are in fact admitting that there is something wrong with this feature to begin with. 

### No hope for improvement

What really struck me about Angular after I played with it a bit, is that there is a possibility
that it can actually become simpler over time.

All the major problems I had with it at first, such as not trusting the dirty checking, can
get better over time. This is because a lot of these things are so close to the web component
standards being worked on, that they can be removed as they become implemented on a browser
level.

I can see that it might be possible to remove entire parts of the framework, without sacrificing
any of the things that it can currently do. That is just so incredibly _rare_ in a system,
that it makes me really interested in seeing how it evolves.

What I don't see, is how anybody will ever be able to convince all browser vendors and
the language standard committee to change the call time name binding semantics of
javascript as a language in such a way, as to make this clever hack uneccesary.

### Finding a middle road

I don't like writing [this kind of thing](http://groups.drupal.org/node/24709) unless I can back it up with some actual concrete
steps that will at least provide somewhat of a reasonable compromise between the parties.

NgMin is already able to replace the magic that is in Angular itself at the moment, by
instead turning it into an opt-in build step if you want to use this format. This is closer to what is actually happening here,
as this magic is on some level similar to something like coffeescript when all said and done.

If you remove the black magic from Angular entirely, probably after deprecating it first,
you will have simplified the core quite a lot. It also sets the right precedent for the future,
so you can avoid further situations like that.

Stop telling people about this first, or possibly even at all. Mention it in the handbook
as a "oh, this is another way to do it, but it is not recommended". You need to do this
before it gets too deeply ingrained in the community.


