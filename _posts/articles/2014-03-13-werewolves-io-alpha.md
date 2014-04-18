---
title: Werewolves.io - WebRTC based multiplayer game
category: post
layout: post
---
{% capture preface %}
### Alpha Version
[Werewolves.io](http://werewolves.io) is feature complete in this alpha state, but the following bugs are known to exist :

1. Only Chrome (and maybe firefox) is supported. The flash fallback for safari seems to be broken.
1. We are missing about 1/5 of the audio files still, and for now there is a text2speech bot reading the script for the missing files.
{% endcapture %}

[Werewolves.io](http://werewolves.io) is a VOIP-based multiplayer game for 7-16 players.

While the first iteration of this application was built in 48 hours as our entry into the 2013 [Node Knockout Hackathon](http://nodeknockout.com), we were not able to complete it in that time.

I subsequently revisited the project and completely refactored the code, wrote hundreds of units tests and even bots to allow me to test it more easily.

<!--more-->

<div class='img-wrapper'>
   <a href='https://werewolves.io'><img alt='werewolves.io' src='/img/portfolio/werewolves.lobby.png' /></a>
</div>

<div class='bs-callout-info bs-callout'>
 {{preface || markdownify}}
</div>

The team consisted of:

<dl class='dl-horizontal'>
<dt><a href='http://daemon.co.za'>Adrian Rossouw</a></dt>
<dd>Game Designer, Lead Developer, Backend Development</dd>
<dt><a href='https://twitter.com/__leroux'>Le Roux Bodenstein</a></dt>
<dd>Front End Development</dd>
<dt><a href='https://gist.github.com/uberEllis/5547621'>Andre "Uber" Ellis</a></dt>
<dd>Design, Illustration, Markup</dd>
<dt>Sean McDonald</dt>
<dd>Narrator, Audio Design, Humor</dd>
</dl>

We recorded many hours of narration, which is stored on the VOIP service provider's servers, so that we can we dynamically play these
recordings to the players in the same way that you would play hold music on a PABX system.

Each player is connected to a teleconferencing system that the application controls by selectively shifting the players
between different conference rooms, and controlling whether they can hear or speak to other players based on the shared game state. 

The experience is akin to being part of an interactive audio drama.
  
This game leverages [WebRTC](http://www.webrtc.org/) to work directly in a browser window without requiring any additional plugins. We make use of [Tropo](http://tropo.com) for the audio conferencing, and [Phono](http://phono.com) to provide the client side capabilities.
