---
title: handlebars considered harmful
category: post
original_date: "2011-02-23"
---
It should be no secret that i have been incredibly unhappy with some of the choices made in our nascent 'stack'. I have actually been holding back though, because until I could recommend a suitable replacement or at least determine why certain things bother me, it would be counterproductive to whine too much.

This is actually not the post I had originally intended to start this series of blogpost, I had actually started writing a post called "settings.js considered harmful". However, other than the issues I have with expresslane, the single biggest problem I have encountered day to day is the display module and handlebars.

#### Enough is enough

_Usually I would have put this paragraph at the end of the blog, but I felt that it was important that you see my conclusions first, and then I will justify them._

I'd been working with the current system as much as possible, but I reached a point last week where I felt confident enough to fork and change things. That is what I originally intended to write about, but this is more important. I decided that I needed to do more research to get my facts straight, so i started a little [test project on github](http://github.com/vertice/template-test) to satisfy my curiosity.

Now, I am no stranger to this kind of research. I have [written](http://drupal.org/node/7272) [extensively](http://drupal.org/node/7133) about it in the past, and I did a significant amount of research when I wrote PHPTemplate. A lot of what was true back then is still applicable today, but there have been some advancements.

My process was to take some records out of couch, namely some states and the relevant schema. I would then try to implement the current markup we require in a couple of different template languages to get a feel for them, so we can
make an informed decision.

#### And so come to Jade

I first tried to test [Weld](https://github.com/hij1nx/weld) ,which involves jsdom and jquery on the server, but just the code to bootstrap that all was atrocious. I think the general approach has merit, but it still needs to be ironed out more to be production ready.

I decided to try [Jade](http://github.com/visionmedia/jade) next. Jade is the template engine written by TJHollowaychuck, who wrote express. It has almost the same relationship to express that phptemplate had to Drupal. I was actually kind of hesitant about it, as I am not really too fond of meta-languages.

What I discovered though is that it is an absolute pleasure to work with, and I was able to do a quick port most of the existing templates in such a way that it is put together a hell of a lot more simply and cleanly. Even though I have only implemented Jade in my tests so far, I am impressed enough with it that I recommend we switch over FEBP, even if it is just to reduce complexity.

__edit:__ I forgot to add , the following image is an in-progress screenshot with some of the styles from the main project applied. The images are obviously not available, but I managed to get very close to the existing markup in less than a day's work, but more importantly __several thousand lines of code less__

![progress](https://img.skitch.com/20110223-m57se9y4yss8p58twpkq2d79iy.jpg)


#### My issue with handlebars.

In my opinion, handlebars suffers from some crippling design issues, which is actually the reason why the display module has evolved in the way it has.  The rub is that it seems to be incapable of iterating over objects, but more importantly, when it loops it doesn't provide you with the key you are iterating over.

Now to illustrate why this is a problem, look at the following code examples :

    var thisIsYourData = {
        someProperty: 'value',
        otherProperty: { key: 'value' }
    }

    var thisIsYourDataOnHandlebars = [
      { key: 'someProperty', value: 'value' }
      { key: 'otherProperty', value: [
        { key: 'key', value: 'value' } 
      ]
    ]

So to be able to render your objects, you need iterate over your data and generate yet another
data structure.

I suspect one of the reasons for this is that javascript object key order isn't completely predictable although there are best practices we can follow to make it more consistent. The irony of this situation is that we are busy iterating over a hash to generate the template variables in the first place, which renders the entire point of using arrays moot.

Jade has none of this by the way, it is expressive and powerful enough that i can just throw the data directly from the
db at it, without having to do any intricate transforms and recursions. This means that Jade is already winning simply because it requires far less support code.

#### What the display module is

The display module fulfills the role of a wrapper to try and work around the limitations of handlebars. But even more so, it exists because we have the ingrained assumption that we need something similar to drupal's theme_table or the views render
layer.

The following code satisfied everything we had been using the display module for, but did in a fraction of the time or effort and 

    table
      thead 
        - for (var key in schema.properties)
          th(id: 'field-' + key)= schema.properties[key].name
        - for (var key in records)
          tr
            - for (var field in schema.properties)
              != partial('indicator', [records[key][field]])
        tr
          - for (var field in schema.properties)
            != partial('diff', [calculateDiff(field, records)])

You can see the [partials we include to do the cell level rendering here](https://github.com/Vertice/template-test/blob/master/views/partials/indicator.jade). Oh, and to pivot the table you just iterate through it differently.

Now I understand we try to generalize things, but at some point we need to consider the cost and the utility. Imagine for a moment the amount of work needed for something simple as setting classes from the code. You need a place to put them, you need the rules to iterate through them, you need to make sure you apply them correctly.

To add a class to a specific table i just change : table to table.classname. To add a class w/ the display module and handlebars as it currently is, involves iterating through the objects several times and just hoping i collect enough context to be able to set them.

#### Drupalisms could be the death of us.

We do not now, nor will we in the near future have to confront our applications having to be 'themeable' in the classic drupal sense. We also are not fall for the myth that your templates are written by someone who is not capable of understanding real conditionals.

Building huge arrays in memory and then iterating through them is a very very drupal thing to do. What you end up doing is generating another data structure wrapped around your actual data, and then you have that level of indirection. It gives you a big box full of buttons to push, and you just need to figure out the exact combination of things to do to get the results you want.

But what gets to me is that it is so unnecessary. We built those arrays in drupal because PHP didnt have useful things such as anonymous functions. We needed to a way to trigger functions when certain conditions are met, whereas now we can just pass it directly.

What I would like to see us do, is instead of building out huge structures, just try writing what you MEAN first. We're still finding our feet, and the fewer levels of indirection between us and our goals is going to make our lives a whole lot easier.

I mean, does anyone really want to be in a situation where we are just learning to work around a new set of assumptions.


