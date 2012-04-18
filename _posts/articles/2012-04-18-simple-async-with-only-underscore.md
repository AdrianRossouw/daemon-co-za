---
title: Simple async control flow, using only underscore.js
category: post
layout: post
original_date: "2011-08-25"
alert: "I don't recommend this approach much anymore, because I have come to the conclusion that the [async.js module](http://github.com/caolan/async) is by far the best tool for the job"
---
{% include dateDisclaimer.html %}

At [DevelopmentSeed](http://developmentseed.org), we have mostly standardized on [Step](https://github.com/creationix/step) to handle our asynchronous function call requirements. It does sometimes feel like like bringing a sledgehammer to a game of croquet though. 

While doing the import work for a client project i ran into the common use case of having to import files in a certain order and then make process the results into a  record to import. I came across the following pattern with underscore which seems to have fit the situation very well.

### Some code

{% highlight javascript %}
// generate a callback
function cb(text) { return function(next) { 
  console.warn(text); 
  next();
}}

// a list of things to call
var actions = [ cb(1), cb(2), cb(3), cb(4) ]

// call the functions in the series array in order
_(actions).reduceRight(_.wrap, function() { console.warn('done') })();
{% endhighlight %}

This results in the following output : 

    1
    2
    3
    4
    done
          
### How does it work ?

To explain what is happening. we should explain the two underscore methods it makes use of :

<dl class="dl-horizontal">
  <dt><a href='http://underscorejs.org/#reduceRight'>_.reduceRight</a></dt>
  <dd>is the same as the <a href='http://underscorejs.org/#reduce'>_.reduce</a> method we should all know by now, but in reverse. This means it starts at the end of the array of actions.</dd>

  <dt><a href='http://underscorejs.org/#wrap'>_.wrap</a></dt>
  <dd>method allows you to wrap functions inside other functions.</dd>
</dl>
        
So if we trace the execution, we start iterating through the list of functions in reverse, and we call the specified callback (ignoring for the moment that it is `_.wrap`) with 2 arguments. The first argument is the default supplied in the third argument to the reduceRight call. The second argument is the last function in our list of callbacks.

Now from the perspective of `_.wrap`, which we are using as our callback in the reduction, it expects 2 arguments. The first argument is a function that we want to 'wrap' in another function we specify as the second argument. It does this by passing the first function as an argument to the second and __returning a function representing this composition__.

Now, back in the context of the reduction, the value that is returned from the supplied callback becomes the new 'memo' value that is passed on the next item in the array. So now the first argument to the callback is the return value of `_.wrap`, and the second argument is the next to last function in the callbacks array.

To cut a long story short, the use of these two functions nests the callbacks into each other like russian nesting dolls, and results in a function that will execute them all in order. We could either store this composition, but more realistically we just call it directly by suffixing the `()`.

### How the hell is that simple ?

While it may seem a bit confusing, I have actually found it pretty simple to work with because you dont need to learn and understand an entirely different library to handle these tasks. At the same time it also doesnt have a lot of bells and whistles that you might need, such as handling exceptions and better argument passing semantics. Where I definitely prefer it to 
Step however is that it doesn't overload the meaning of `this`, which I am not really comfortable with. 

In my mind it is also simpler to nest this pattern, in that each of the actions in your list of callbacks can implement this pattern very easily. Just pass the next callback as the last argument to the reduceRight call.

It also lends itself very cleanly to write functions that return closures, so you can just pass in arguments such as the filename and a function to process the results.

### What about parallel calls ?

This pattern works really well with another underscore based pattern using the <a href='http://underscorejs.org/#after'>_.after</a> method. Any of the actions in your list of callbacks can look like this.

{% highlight javascript %}
actions.push(function(next) {
    var counter = _.after(_(records).size(), next);
    _(records).each(function(record) {
        put(config, 'data', record, counter);
    });    
});
{%endhighlight%}

I have actually found instances where we are still implementing our own counter closures, so I think everyone should be aware of `_.after` regardless of wether they are using the first pattern or not.
