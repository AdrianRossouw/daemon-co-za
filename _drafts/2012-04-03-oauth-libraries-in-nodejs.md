---
title: Oauth Libraries for Node.JS
category: post
original_date: "2011-11-27"
---
While the office was closed last week, I was tasked with [evaluating the oauth situation](https://atrium.developmentseed.org/dsi/node/38519) and building some demo applications with what I have learnt. While I completed the [consumer side](https://github.com/Vertice/oauth-test/tree/master/client) fairly easily, the provider situation turned out to be a different beast altogether.

__oauth consumers__ 

On the client side there are several different libraries available for authenticating against oauth 1.0 servers, some of which have experimental support for oauth 2.0 as well. One of the more troubling aspects of these libraries is that they are all tailored specifically for services like twitter/facebook/etc. Implementing a client to connect to your own oauth provider is often not as straight forward as it should be and I get the sense that this is not a node-specific thing either. We might need to provide extra support and documentation to the people trying to connect to our provider.

A lot of these authentication libraries seem to take the kitchen sink approach packaging as much as humanly possible into a single package, and make a lot of assumptions that may conflict with our existing implementations. One of the primary assumptions being that they would have access to and be responsible for managing the session store, which meant that the oauth approach is completely incompatible with our existing bones-auth library.

__bones-auth issues__

Aside from it's iron grip on the session store, bones-auth is also very oriented around username/password pairs, resetting passwords with tokens being emailed and all kinds of functionality that clashes with these libraries. I also discovered is that asynchronous login does not fly with oauth, as the security model requires that the user be redirected to the provider domain, and then cleanly redirected back. 

__passport__

The client auth library that finally won me over was [passport](https://github.com/jaredhanson/passport). I found that it had a reasonably short list of dependencies, provided adequate tests, was reasonably actively maintained, but perhaps more importantly was not trying to do too much. It does not register router callbacks or do many things of it's own volition, but still making these things easy to implement on your own terms in a way which works for your application.

It makes use of different authentication strategies, which are in themselves modules that can be swapped (code changes required) or used in unison. I mostly worked with [passport-twitter](https://github.com/jaredhanson/passport-twitter), but it is really just an extension of the base [passport-oauth](https://github.com/jaredhanson/passport-oauth) module with the default twitter settings.

I also liked that passport provided a [passport-local](https://github.com/jaredhanson/passport-local) strategy which is the same old username/password auth we are used to. I think we should rethink bones-auth and instead have a bones-user that can work with any of these pluggable auth strategies.

__the rest__

I should mention some of the runners-up though, because they are interesting in their own right:

[EveryAuth](https://github.com/bnoguchi/everyauth) actually looks fairly easy to use, but I was concerned about how well we would be able to integrate this into bones. It registers all the request handlers for you, and you have very little say other than being able to configure a different URL for them. 

[connect-auth](https://github.com/ciaranj/connect-auth) is interesting because it is written by the author of [node-oauth](https://github.com/ciaranj/node-oauth), which is the utility library that most of the other libraries also make use of. I had trouble getting some of the examples to run (especially the provider stuff), and they also had not been touched in over a year. It does contain some very useful code, but I feel this might be less than 10% of the codebase, and we dont need/want the rest. This is the only library that has another layer of abstraction down in the form of [easy-oauth](https://github.com/robrighter/easy-oauth) to make it friendlier.

__providers__

The provider situation is dire. The only one of the client libraries that also provides the ability to use it as a server (somewhat) is connect-auth. The [provider implementation](https://github.com/ciaranj/connect-auth/tree/master/lib/auth.strategies/oauth) should actually be fairly easy to separate into it's own module, as it is very different in nature to the rest of the code. It also doesnt seem that well maintained in it's current location.

The running theme with the provider side of the fence is the very large assumptions some of these implementations make about what is available. I ran into a [server written by our old friends AF83](https://github.com/AF83/auth_server) which has a laundry list of dependencies but above that also expects you to be running mongodb. It is not the only one to make this assumption.

__big job__

Building a sensible provider has a lot of requirements beyond just being able to authenticate using oauth. You need user management and authentication, consumer management so that you are able to hand out and authenticate consumer keys / consumer secrets. You also need to have reliable data storage to keep the tokens, and be able to disable them when needed. I also suspect it will require us to adapt bones-auth a fair amount of we decide to use that as our user store. This is the reason why a lot of the server implementations have all these requirements.
 
__and the best provider library is?__

I'm not sure yet. The provider code in connect-auth was useful, but i think it is too encumbered by the consumer side of it, and I wouldnt want to have to use both passport and connect-auth for slightly different things. [node-oauth2-provider](https://github.com/ammmir/node-oauth2-provider) seems nice and simple, and the closest to what we would like to see, but I have not yet fully evaluated it. [oauth-server](https://github.com/selead/oauth-server) i have concerns about how well it is maintained, even though it is conceptually simple.

I will probably have a more concrete answer later today, when i have braved the waters of the undocumented poorly tested and unmaintained code some more. And to throw a spanner in the works [just because we build it, doesnt mean the consumers can use it](http://realitytechnician.posterous.com/too-many-compromises-thoughts-on-oauth-2)

I also had some adventures in json-schema validaton that will be the topic for another devlog

