---
title: Curls of wisdom
original_date: "2012-02-23"
category: post
---
Today did not really go as planned. Instead of getting to work on atlas client application like I had intended, I was stuck trying to figure out a bunch of externally generated issues.

### Atlas

Because we just really don't have the data synching workflow on this project down yet, every now and then I need to manually go run the scripts and push the data to our server. We were asked to do this yesterday, but had somehow glossed over it due to other more pressing concerns.

So i ran the scripts and pulled the levers and what not, but a short while later Proof came back complaining that we were still using a very old version of the data. A bit flustered, me and nate managed to piece together that they had changed the server location where we needed to fetch the dumps. This wasn't really communicated clearly from their end though, as it was a random line in the middle of a much larger thread about a whole bunch of other data related things.

Now that I knew that the application was still configured to use the old credentials, I immediately began experiencing problems because they had switched from publishing it on FTP to SFTP. It's pretty late in the project to be changing protocols in this way, but luckily we anticipated the need for some flexibility in the export locations by making use of [curl](http://curl.haxx.se/).

Curl does officially support SFTP as one of it's formats, but I discovered that very few of the binaries easily available are compiled with support for it. There are long standing issues outstanding with [ubuntu and debian](https://bugs.launchpad.net/ubuntu/+source/curl/+bug/311029) around this, without a clean resolution. 

__side note:__ we have similar problems in [millstone](http://github.com/mapbox/millstone), where we make use of node as an http client directly. We can't even get it to support gzip-encoded streams because the support for that was only added in node.js 0.6.x. This might cause pain down the road.

Our options to resolve this problem are : 

* __Recompiling the binaries.__
    This turns out to be a [pretty complex manual task](http://iamnearlythere.com/add-sftp-capabilities-to-curl) that I feel introduces a lot of complexity to server maintenance is best avoided.
* __Don't use CURL.__   We would be sacrificing a lot of flexibility by switching to another tool that is probably not nearly as easily scriptable. We would also have to lose an existing feature which makes use of a flag in curl to check the file modification time on the remote server against the local copy of the file, to avoid re-downloading the upstream file unnecessarily. I would like to avoid that if possible.
* __Don't use SFTP.__    I do agree with the move from FTP, which is an incredibly insecure and antiquated protocol. For this specific use case, having write access to the server is actually undesirable.

What we ended up suggesting was that the export location be changed to HTTPS, which is just secure as SFTP, but gives us a lot more flexibility in the tools we use to integrate into our scripts.


### BCLC

So I was looking at my dashboard when this ticket popped up: 

> This is Jeff Lundy, the new Research Manager at BCLC in charge of the mapping work. I'm checking in because I've not been able to log into the B4G map using either IE 8 or Firefox 10. Whenever I submit any form, there is a ~30 second delay, and then a red "[object Object]" box that appears in the upper right corner. This seems to be part of a larger set of issues with browser compatability (I noticed a similar case was opened in December, regarding a new user). Currently, only Laura Horton's personal laptop (a macbook running Safari 5) has admin access to the site. If we can figure out what's causing the issues, it would be a great help in transitioning me into managing the site.
    
I decided to check it out in case it was something simple, because my momentum was already screwed over by the issues on atlas during the day. I am also __so__ tired of bclc at this point, that i don't want it coming back from the dead and biting me in the ass later.

I lost several days in the last few months tracking down ridiculous errors in the BCLC project. To give you an idea: They were causing the server to crash by pasting large word documents, that they customized by hand for every client they added, into the tiny little 'welcome message' box on the user form. Turns out microsoft has their own [non-standard version of ASCII](http://stackoverflow.com/questions/4332707/paste-from-ms-word-into-textarea) that have all these non-printing control characters that exist only to inflict pain on developers like me.

That experience caused me to add __extensive__ logging when I was working on phase 2 and it's a good thing too, because it helped me track down a [critical issue in bones-auth](https://github.com/developmentseed/bones-auth/commit/c3c5d5fdf6be3edc7448506c632e436d1d953125) pretty quickly.

The rub is that when you use connect-couchdb to store your sessions, certain edge cases caused [this error to pop up](https://gist.github.com/ddcd8836d098322db01b), which results in the server crashing. This is a [known problem in express](https://github.com/visionmedia/express/issues/751), but there isn't really a consensus wether the current behavior is wrong. Mapbox/Tilestream-pro is also affected by this bug, but it seems to not affect us as badly there.

I figured since I got this far I might as well put it to bed, so i tagged a new release of bones-auth and deployed it on the server. I followed this up by checking out the diffs from the closure linter manually for any trailing commas or other similar issues. I couldn't see anything that is possibly a cross browser issue. I wrote a response to them, and hopefully that is the end of it for now.

I'm hoping I get to do more work on my backlog tomorrow instead of dealing with things as they come up.
