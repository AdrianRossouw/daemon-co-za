---
title: Werewolves.io 
link: https://werewolves.io
category: project
images:
  - 
    src: img/portfolio/werewolves.lobby.png
  - 
    src: img/portfolio/werewolves.voting.png
  - 
    src: img/portfolio/werewolves.join.png

tags:
  - voip
  - tropo
  - socket-io
  - webrtc
  - xmpp
  - sip
  - node-js
  - coffeescript
  - mocha-js
  - jade
  - state-js
  - backbone-js
  - marionette-js
  - grunt-js
  - browserify
  - phantom-js
  - socket-io
---
VOIP-based multiplayer game for 7-16 players. Leverages WebRTC to work directly in a browser window without requiring any additional plugins. 

We recorded many hours of narration, which is stored on the VOIP service provider's servers, so that we can we dynamically play these
recordings to the players in the same way that you would play hold music on a PABX system.

Each player is connected to a teleconferencing system that the application controls by selectively shifting the players
between different conference rooms, and controlling whether they can hear or speak to other players based on the shared game state. 

The experience is akin to being part of an interactive audio drama.

<!--more-->

While the first iteration of this application was built in 48 hours as our entry into the 2013 [Node Knockout Hackathon](http://nodeknockout.com), we were not able to complete it in that time.

I subsequently revisited the project and completely refactored the code, wrote hundreds of units tests and even bots to allow me to test it more easily.

We're just waiting on the final parts of the narration to be recorded before we can officially launch the application.


TODO: writeup of werewolves.
