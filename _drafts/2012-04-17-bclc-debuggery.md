---
title: bclc debuggery
category: post
original_date: "2011-12-15"
---
My week has been largely dominated by a critical issue that BCLC reported late last week, and that ended up being ridiculously hard to nail down conclusively ... all though in retrospect I did see it coming.

__a series of tubes__

Emily contacted us because she was having trouble getting initial emails sent to new users she created, and in my first attempt to reproduce the issue I logged in and created several users myself, with no problem. I confirmed that emails had gone out to the clients they mentioned in the mail logs, and there were no errors reported on that level, so instructed the client to have their users check their local and webmail spam folders to see if we somehow triggered a bayesian filter somewhere. We then received more information from the client which included an error dialog stating simply "[Object object]" when they attempted to create the user, and then they would simply retry until it worked .. sometimes several dozen times. 

__logger heads__

I went through the log files, all of them, to try and piece together what was happening. I immediately ran into an issue that all bones apps suffer from, specifically that the error handling is frustratingly imprecise and generic, to the point where we dont even print out a timestamp with log messages. I was however able to piece together that there was definitely something going on, because the entries in the couchdb log show records being created and there was no mention of them in the mail logs.

__blame microsoft__

More prodding eventually made it clear that they were using the welcome message field we had added to the user creation dialog to embed an entire form mail that they customize for each new user by hand .. __that they copied directly from WORD__. This is like someone using the personalized text field on the facebook add friend dialog to send out a newsletter. It took about a day's worth of back and forth to get them to try and create a user without doing this, and they were finally able to create the users they wanted.

__how do we fix this__

This has been a deeply frustrating experience because it is practically impossible to debug without getting the entire microsoft office setup up and running, and even then the error messages we generate are not very useful to track down the exact reason why this is failing in the way it is.

Without being able to debug the problem on that level in a reasonable amount of time, I also have to take into account that what the user is trying to do is not what we designed the functionality for in the first place, and that the best fix in this likelihood is one of documentation and managing expectations. The system shouldn't die on unexpected input, but it also shouldn't accept this input in the first place.

To that end I am changing the dialog to clearly state what the field is for, and adding a character limit to keep it concise. I have also offered to update the templates for the emails so that they do not feel tempted to embed
essays in the notification emails by hand.
