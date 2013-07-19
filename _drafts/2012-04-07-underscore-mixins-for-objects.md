---
title: Object mixins for Underscore.js
category: post
original_date: "2011-08-25"
---
One of the things I complain about (often) is the fact that underscore is very much oriented around working with arrays. But Adrian, I hear you say, FP is all about arrays, and objects dont really occur in real world data and so forth. 

I don't know which real world these purists are living in, but in the days of being able to store javascript OBJECT notation directly in the database i will choose the practical objects/hashes over the theoretically optimal array method any day of the week.

    // using objects
    var obj = {  
        values: { 
            1994: 1.1, 
            1995: 1.2,  
            /* snip */  
            2010: 1.1, 
            2011: 1.5 
        }
    };
    // print 2010 value 
    console.log(obj.values[2010]);  
    
    // how we are 'supposed' to do it.
    var obj = { 
        values: [ 
            {year: 1994, value: 1.1},
            {year: 1995, value: 1.2},
            /* snip */
            {year: 2010, value: 1.1},
            {year: 2011, value: 1.5}
        ]
    };
    // print 2010 value 
    console.log(_(obj.values).detect(function(val) { 
        return val.year == 2010; 
    }).value);

### Where underscore lets me down.

Most underscore functions are wired around the latter, which make them tricky to work with. As a simple
example, say I wanted to double each value in a list.

    var list = [ 1 , 2, 3, 4 ];
    _(list).map(function(val) { return val * 2; });
    // returns [2, 4, 6, 8];
    
If I were to try the same on an object instead, it would simply throw away the keys and transform it into
an array.

    var list = { a: 1, b: 2, c: 3, d: 4 };
    _(list).map(function(val) { return val * 2; });
    // returns [2, 4, 6, 8];

To work around this, I would have to fall back to using the reduce function, every time.

    var list = { a: 1, b: 2, c: 3, d: 4 };
    _(list).reduce(function(memo, val, key) { 
        memo[key] = val * 2;
        return memo;
    }, {});
    // returns {a:2, b:4, c:6, d:8}

### So what if you can't use map, you can use reduce right ?

The issue is that it's all of the functions that have this limitation. You can't generate an object containing only the years that pass a certain threshold for their value, or perhaps use map to apply a formatting function to each one. You can't use compact to get rid of years that have no data and so forth.

Underscore is so supremely useful, it just bugs me that I run into this limitation so often, and every time I come across it I just grumble and roll my eyes and follow the reduce pattern above, even if the result could have been a lot cleaner.

### Underscore mixins.

Something we dont actually make use of yet, but probably should start, is the fact that you can [extend underscore with your own methods](https://github.com/documentcloud/underscore/wiki/Mixin-Catalog). I decided to put my money where my mouth is and actually write [some object safe versions of the existing methods](https://gist.github.com/2c6fdd7b96a2d7ff1a9f). For example :

    var list = { a: 1, b: 2, c: 3, d: 4 };
    _(list).mapHash(function(val) { return val * 2; });
    // returns {a:2, b:4, c:6, d:8}

It's just a gist for now, but I think we can really get a lot of bang for our buck by extending underscore for some of our basic functionality. Alongside possibly using [underscore.string](https://github.com/edtsech/underscore.string), the bones.utils look like [ideal candidates for being turned into mixins](https://github.com/developmentseed/bones/blob/master/shared/utils.js).

I'm not using this code anywhere yet, but it finally bugged me enough to sit down and figure out a solution.
