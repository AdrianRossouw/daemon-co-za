---
title: Getting my feet wet with maps.
category: post
original_date: "2011-11-10"
---
Due to a lull in scheduling I was asked to take some time to get properly acquainted with tilemill and friends, so that I could help determine the practicality/constraints of live layers, that aren't already baked into and just streamed directly. The irony is that every project I have worked on that has a mapping component is built using live layers already, so I've never really been acquainted with the 'bake it and ship it' methodology we can get away with a lot of the time.

<a href='http://tiles.mapbox.com/upload/map/l50apx4k'><img src='https://img.skitch.com/20111109-q7i8my8hnw237iusg3hww5gct4.jpg' /></a>

So I built a map showing murders per police station overlayed with the electoral wardens and who won those areas. While I initially only built it for cape town I expanded to do all of south africa, and abused the available color
math to generate a pleasant map based on whatever color you choose (the land color is a complement of
the background, and most other colors are derived from that).

The crime figures themselves were so large they made google docs break up with me, as it was a column for each category of crime * 8 years time series, so there were several hundred columns and thousands and thousands of rows. I ended up installing google refine, and learning how to drive it to be able to clean up data. Since the records were just for police station, i figured out how to use the google geocoding api to determine lat/lon for each of my records.

The [electoral demarcation information](http://demarcation.org.za) was also not in a very friendly format, shipping in 52 different shapefiles that had to be manually downloaded... so of course I turned to wget. I then installed QGIS to wrap my head around merging the separate shapefiles into a single layer that I could make use of in my map.

Once I had done all the data processing I spent a lot of time getting used to carto and built the map so it is presentable all the way from zoom level 1 through 15. Carto is the same and different to CSS, as a lot of things that could be problems such as margins affecting layout, don't really occur. What does cause me some problems is z-indexing though. Getting to certain zoom levels where more detail kicks in makes the order of rendering a bit obtuse. I think it's just something I would get used to, but being able to hide layers in tilemill would have made things a bit easier.

What I am still curious about is being able to do stuff like aggregate values or count points inside a shapefile (how many murders in a province in total). For this, the correct tool is apparently postGIS or sqlite, which I will probably move on to figuring out soon.

You guys have done an outstanding job with tilemill, and the hosted maps are a great feature. I think having free anonymous hosting of maps for 7 days is the killer feature here, as it removes all of the deterrents to choosing mapbox as a host. The one niggle I had is that the mac app doesnt allow you to browse for files, so I had to type out absolute paths the whole time.
