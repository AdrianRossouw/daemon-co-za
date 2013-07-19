---
title: Protecting a Rest end-point with middleware.
category: post
original_date: "2011-06-22"
---
Over the course of the BCLC project we have implemented a number of different permission checks that need to operate on the server level. While I have taken the time to write tests to ensure we dont make regressions on any of these, we have ended up with at least 3 different implementations of an access check system on the project.

__ACL-like declaritive permissions__
:    Based on the auth implementation in tilestream-pro, this involved defining a control array that gets consulted on requests by the Auth server (which is mounted by bones-auth in the middleware stack). Can be consulted client-side,

__Imperative access hook on models__
:    Added by Alex to define some of the project permissions. Overrides the Route server's 'loadModel' method to inject an access check that gets passed the request object. Needed to do checks like 'does the model being edited belong to the logged in user', without having to load the model multiple times. Only protects the model.url paths and is server-side only. It is currently 'polluting' the client side model with methods that can never be run there (unless we try to fake express and node on the client).

__Imperative asynchronous middleware on the auth server__
:    Added by myself whenever a check needs to be done that requires additional database loading or lookups. An example being the check to see whether an email address is unique, by checking against the other users. Completely server side, but also divorced from the models.

As you can see, each of these different techniques has been used because of specific limitations in the other options, and no single method will currently work for all the requirements. I've been spending some a few eggrolls over the last 2 weeks to try and untangle this mess and put together a more consistent approach.

#### Access control via middleware

The approach I've started to favor for this is to allow for models to have an additional method that allows them to mount additional routes to certain paths. The Route server then gets modified to include an additional call as such :

        this.models.forEach(function(m) {
            m.serverRoutes && m.serverRoutes.call(self, app);
        });

Then each model, will be able to add an additional method that will allow them to register new middleware, such as : 
   
        models.Project.serverRoutes = function(app) {
                this.get('/api/Project/:id', 
                        testModel('published'), 
                        requireSession,
                        requireGroup('admin'),
                        testUser('author'));
            
                this.delete('/api/Project/:id',
                        requireSession,
                        requireGroup('admin'));
                
                this.put('/api/Project/:id',
                        requireSession,
                        requireGroup('admin'),
                        testUser('author'));
        });
        
This would allow the models to provide additional checks on any paths, that could be asynchronous if need be, and would only be mounted on server creation. Modules could provide some standard checks that could be customized as need be.

These methods could be placed in the Model.server.bones, stopping it from being sent out to the client, but still form part of the models. 

#### Composing middleware

For simpler tests that dont need to be asynchronous, i came up with a helper method that can be wrapped with, such as : 


    function check(test) {
        return function(req, res, next) {
            if (test(req, res)) {
                return next();
            }
            else {
                return next(new Error.HTTP(403));
            }
        }
    }

    // most checks now take only a few lines to implement, and can be re-used.
    var requireSession = _.wrap(function(req) {
        return req.session && req.session.user && req.session.user.id;
    }, check);

#### The snake in the grass: early returns.

One thing that the second method allowed was the ability to return early from an access check. Take the following code :

    access: {
        'GET': function(req) {
            if (this.get('published')) return true;
            if (!req.session || !req.session.user) return false;
            if (req.session.user.hasGroup('admin')) return true;
            if (this.get('author') == req.session.user.id) return true;
            return false;
        }
    // snip

It purports that if the model has been published, it should allow access and not even consider the rest of the results. If you were to rewrite this in more traditional code it would look like this :

    if (this.get('published') 
              || (req.session && req.session.user && req.session.user.hasGroup('admin'))
              || (this.get('author') == req.session.user.id) {
          return true;
    } else {
        return false;
    }
    
The logical 'or' relationship turns out to be very difficult to model using middleware. Infact, the middleware stacks are almost implicitly considered as an "and" operation. If any one of them fails, the entire request ends.


#### next('route') as an option.

After spending some time reading the express and connect code, i came across this small mention in the documentation :

<blockquote>There are times when we may want to “skip” passed remaining route middleware, but continue matching subsequent routes. To do this we invoke next() with the string “route” next('route'). If no remaining routes match the request url then Express will respond with 404 Not Found.</blockquote>

This is a bit obtuse, but what it actually means is the following :

    function pass(req, res, next) { console.log("pass"); return next(); }   
    function skip(req, res, next) { console.log("skip"); return next('route'); }
    function fail(req, res, next) { console.log("fail"); return next(new Error()); }
    function end(req, res, next) { console.log('end'); res.send('end'); }
    
    app.get('/', pass, skip, fail);
    app.get('/', pass, end);
    
    output: 
        pass
        skip
        pass
        end

So the rest of the stack of middleware is bypassed and the next is consulted. This can be used to do the early return functionality that was done before, but I was having trouble putting it together in an expressive and clear manner.

#### Where I am now

I've put a halt to this work again to actually get some bugs fixed for the release, but I just wanted to share the progress I made and hopefully get some comments on what I've learnt. Our current inconsistent approach definitely needs to be solidified into a re-usable solution, because permissions are too important a topic to just dick around with.

As ever, tests are very useful to ensure that the permissions dont drift in ways we dont intend them to.

