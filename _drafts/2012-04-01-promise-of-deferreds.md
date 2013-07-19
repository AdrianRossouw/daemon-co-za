---
title: The Promise of Deferreds
category: post
original_date: "2012-01-25"
---

One of the things I ran into when revisiting BCLC over the last few weeks, is that we didn't have very good mechanisms for handling asynchronous IO, especially from within backbone. This is especially problematic when we have random access to related objects.

### What are promises?

Before I set to write this article, I happened to find two incredibly well written articles that explained deferreds and promises more clearly than I would ever be able to.

1. [Creating Responsive Applications Using jQuery Deferred and Promises](http://msdn.microsoft.com/en-us/scriptjunkie/gg723713)
1. [Asynchronous Control Flow with Promises](http://howtonode.org/promises)

I should also note that recent versions of [backbone.js explicitly return promises for most of it's sync related functions](https://github.com/documentcloud/backbone/pull/289), and I specifically updated the bones 2.x branch to allow us to make use of the following functionality. The functionality is there, it's being widely used, all we have to do is understand and benefit from it.

### Example

_Bones.User has bugged me for the whole time I've been aware of it. This example is built around another technique for this, but it's not the point of the example._

Given a standard App.router.
    
    /** Set up some application wide variables. */
    router.prototype.initialize = function(options) {
      Backbone.Router.prototype.initialize.call(this, options);
    
      // fetch the user model asynchronously as soon as routing starts
      this.user = models.User.fetch();
    
      // fetch the tweets too
      this.tweets = models.Tweets.fetch();
    
      // when they are done loading, render them.
      this.tweets.then(function(tweets) {
        // this kind of assumes the element the tweets attach to
        // is in the initial delivery
        new views.Tweets({collection: tweets}).render();
      });
    };

Now for some different patterns in the routing functions, handling different pages.
    
    /**
    * This view doesn't need any models to be loaded.
    */
    router.prototype.home = function() {
      new views.Home().render();
    };
    
    /**
    * fire as soon as the user model is fetched.
    * if the model has already been fetched (the promise resolved) it will fire immediately.
    */
    router.prototype.profile = function() {
      this.user.then(function(user) {
        new views.Profile({model: user}).render();
      });
    };

The last example is very important because it is something we run into over and over again. It is a pattern so common that we have coined our own 'technique' that we can find in all our projects, where the [following code has been copied practically verbatim](https://github.com/developmentseed/bones/blob/master/shared/utils.js#L15-31). I think (for this purpose) the 'fetcher' is an anti-pattern, and it has caused me significant pain in the recent past.

    /**
     * Instance a new view once more than one model has been loaded.
     * These might already be cached, or be straight objects, or whatever.
     */
    router.prototype.projects: function(uid) {
      $.when(
        new models.User({id: uid}).fetch(), 
        new models.Projects({ uid: uid}).fetch()
      ).then(function(user, projects) {
        new views.Projects({ collection: projects, model: user}).render();
      })
    };

### Caching, Concurrency and Asynchronicity 

In BCLC  we retrieved a list of projects, and in absence of joins, needed to do another separate query to load the relevant company objects. We embedded this into the ProjectSearch model and because we hadn't wrapped our heads around how backbone works, we ended up doing straight http requests against the couchdb _all_docs view, specifying a list of ID's.

Our solution worked well enough until it came to generating the map pages, where each tile is a separate request which meant re-doing the search and the related lookups, regardless of the fact that they had already been loaded into memory. We hacked up a caching solution using eventEmitters that kept track of what has already been loaded with incredibly arbitrary time / item limits.

The experience in trying to improve the performance led me to do a lot of research about what the generally recommended way to do this is in backbone is. My goal was to figure out a way to build a lazy loading cached model collection. I knew that I couldn't reasonably fix it in BCLC, but I did not want to see us falling back on this.

### State of denial

The asynchronous login situation really made this painful too. When the application starts it fetches the auth status, but every tab running the application has it's own stale state. The way the application is structured made it really difficult to have it fetch the latest login state, because it would trigger all sorts of side effects.

In my experiments I even got as far as setting up a couchstream listener, so that it would invalidate objects from the cache as changes happen. With the addition of socket.io, or another realtime communication stream, we could build more powerful real time systems that don't have the crazy state issues we experience at the moment.


