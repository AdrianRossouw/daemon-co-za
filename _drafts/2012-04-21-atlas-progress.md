---
title: atlas progress
category: post
original_date: "2011-12-15"
---
__I'm off tomorrow, so i just wanted to leave some proper notes for you guys__

While waiting for responses from the bclc about [their user creation problems](https://atrium.developmentseed.org/dsi/node/38808) I have been toiling on the client side application for the atlas project. This has presented some interesting challenges that we might be able to learn from.

__authentication and bootstrapping__

I finished with the authentication work last week, at least as far as we need to be at this point in the project, and one of the things that I quite liked from that is how I avoided the asynchronous login (/api/auth end point) we relied on in bones-auth, and instead bootstrap the Bones.user in the initial page load, with the expectation that logging in will always involve a full page refresh and a new delivery. 

The backbone documentation itself recommends not using fetch on page load, and instead [bootstrapping required models](http://documentcloud.github.com/backbone/#FAQ-bootstrap). This may also allow us to present different resources to different users, such as not sending admin level views to users who should not be seeing them.

The pain here is that with passport, the server level code sees `this.req.user` or just `req.user`, and the client level code sees `Bones.user`. We don't really have a context storage mechanism that gets instanced for each request that could allow us to centralize that.

__consuming unreliable resources__

The data team has been actively working on building the map generation infrastructure, while I have been pretty independently working on the application that needs to display them. Because the maps and their related metadata are so actively changing it means that the client side app has frequently been broken because of outside changes. 

__fun fact:__ we actually had an honest-to-god [Y2K bug introduced into the system](https://github.com/developmentseed/atlas-project/blob/master/models/Maps.bones#L15-27)

The first time this happened was one of the times they changed on of the keys on the map metadata.
I had a bit of a freak out because I couldnt figure out how I had broken the application without changing anything, but I realized that we actually have a bigger problem with resiliency in this application. When the maps are updated, it is not an all or nothing change, instead the JSON feed is littered with records that follow different schemas.

If I fixed the key to work for the new records, it would break for the old records still present and vice versa. We also had nothing like a validation layer in the application yet, which means that errors were getting caught very late and often right before trying to render. So changes upstream would cause random errors all over the application and you could never be guaranteed to fix them all, leading to endless debugging if you just chose to tackle the specific bugs.

__this sounds like a job for JSON SCHEMA!__

I know not everybody likes JSV, but it allowed me to write a JSON schema for the data we expect to see from the feed, and then filter out any invalid records in the map collection so that they dont even get fed into the application to begin with. I generate the environment and schema instances once, on load and re-use them thoroughly.

I also chose not to abide by backbone's convention of trying to validate each of the changed attributes separately instead of evaluating the whole object and we don't have anywhere to actually display error messages to the user, nor do I feel they would be relevant. I ended up with this simple little function : [link](https://github.com/developmentseed/atlas-project/blob/master/models/Map.bones#L98-105).

__collections are a bit of a mystery__

I had an interesting time actually getting the validation to work, because it seems like backbone doesnt like validating when you fetch collections, but it will validate when you fetch individual models. You can pass `add: true` to the fetch options, but it results in a bunch of other behavior.

It has left me wanting to explore collections and how they work in more depth, because I feel like there's a lot of problems we seem to come across which could be solved more elegantly with them. A good example
is filtered lists like the above.

Say we have a collection containing countries of the world, that is bootstrapped once. Is it not possible or even desirable to be able to instance a subclassed availableCountries collection that contains a filtered list of those same countries? And how about selectedCountries collection under that ?

__I like things DRY__

I also took an interest in the above because of some of the fallout I had to deal with from the key changes. All over the system we were doing a check on something called 'atlas_level' against the currently selected state, to determine map validity for a number of different things. I took a fair amount of time to [unify all of these different cases and get the correct behavior](https://github.com/developmentseed/atlas-project/blob/master/models/Maps.bones#L15-27) because of the subtle different expectations I encountered.

One of my next tasks is going to be introducing permissions checking into this routine too, so it's the kind of thing that should be captured centrally, and I am starting to expect that we should be using collections for these kind of situations.

__staging__

I deployed what I had on [atlas.devseed.com](http://atlas.devseed.com) yesterday, with the usual HTTP password and authentication via twitter API. Hopefully it will stay up even if the data fed into it changes now.

when i get back next week I will also be in a better place to actually add features because of the groundwork I laid this week.
