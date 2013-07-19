---
title: Async VS Step
category: post
original_date: "2012-01-17"
---
While researching all the various manner of flow control to resolve some caching / performance / concurrency issues, I re-discovered and fell in love with the [async.js](http://github.com/caolan/async) module.

Back when we (DevelopmentSeed) were just starting out in node, we had chosen async for flow control. At the time, I was not that fond of it because I had run into it being used to paralel-ize something which did not strictly need to be, and at the time my poor little Drupal-addled php programmer brain just couldn't wrap my head around it all.
<!--more-->

After [Tom Macwright](http://macwright.org) made an impassioned plea about his concerns with the module, we switched to using [Step](http://github.com/creationix/step) and that has been present in almost all our builds in some form or other. It hasn't been all sunshine and roses though. The ideosyncracies of Step has inspired rage amongst some of the other developers, and I myself had taken to find as many ways as possible to [avoid using it entirely](/2012/04/simple-async-with-only-underscore). 

There's an old adage around the kitchen that says that the best knife is the one you use the most. After mucking around with async for a few days, i think i'm about ready to consider async alongside underscore and __maybe__ jquery as an essential part of my toolkit.

__Less talk more code__

This is the recursive file deletion function from tilemill's `fsutils.js`, rewritten using async.js:

    function rmTree(filepath, next) {
        function _joinPath(f) { return path.join(filepath, f); }
   
        var recurseFns = [
            async.apply(fs.readdir, filepath),
            function(files, next) { next(null, _(files).toArray()); },
            function(files, next) { next(null, _(files).map(_joinPath)); },
            function(files, next) { async.forEachSeries(files, rmTree, next); }, 
            async.apply(fs.rmdir, filepath)
        ];
    
        async.waterfall([
            async.apply(fs.lstat, filepath),
            function(stat, next) {
                if (stat.isFile() || stat.isSymbolicLink()) return fs.unlink(filepath, next);
                if (!stat.isDirectory()) return next(new Error('Unrecognized file.'));
                async.waterfall(recurseFns, next);
            }
        ], next);
    }
    
And this is what the original looks like : 
    
    function rm(filepath, callback) {
        var killswitch = false;
        fs.lstat(filepath, function(err, stat) {
            if (err) return callback(err);
            if (stat.isFile() || stat.isSymbolicLink()) return fs.unlink(filepath, callback);
            if (!stat.isDirectory()) return callback(new Error('Unrecognized file.'));
            Step(function() {
                fs.readdir(filepath, this);
            },
            function(err, files) {
                if (err) throw err;
                if (files.length === 0) return this(null, []);
                var group = this.group();
                _(files).each(function(file) {
                    rm(path.join(filepath, file), group());
                });
            },
            function(err) {
                if (err) return callback(err);
                fs.rmdir(filepath, callback);
            });
        });
    };

The most striking feature to me was the complete lack of `if (err) throw err` in all the callbacks. Async does this by pretty strictly following the node.js standard of the first argument when calling the callback being the error, and any others are results. When an error happens in async, the 'done' callback is passed the error and execution ends. 

The last argument is always the next callback, and the library does not in any way try to overload the `this` objects semantics. I felt dirty every time I used `this` as a callback in Step, and that doesn't even begin to cover how I felt about `this.paralel`, `this.group` and friends. Having to do the `var that = this;` switcharoo just to make async functions work right also struck me as a bad sign.

Because of those two differences, my absolute favorite thing about async is that you can use most of the node-style functions directly without needing to create a function for it. As explained in the [documentation for async.apply](http://github.com/caolan/async#apply)

    // using apply
    async.parallel([
        async.apply(fs.writeFile, 'testfile1', 'test1'),
        async.apply(fs.writeFile, 'testfile2', 'test2'),
    ]);
        
    // the same process without using apply
    async.parallel([
        function(callback){
            fs.writeFile('testfile1', 'test1', callback);
        },
        function(callback){
            fs.writeFile('testfile2', 'test2', callback);
        },
    ]);
    
__What changed ?__

For one thing, I have grown more comfortable and used to async programming, which in turn has informed my decision to recommend async. I can think of dozen's of occasions where it would have made my life easier,
and the code I was working on cleaner and easier to debug.

Async itself has seen it's documentation improve significantly, and some of the features added since we switched away from it actually tackle some of our use cases. The [async.waterfall](https://github.com/caolan/async#waterfall) function specifically is a friendlier/simpler version of what we primarily use Step for. I wish I had the [async.queue](https://github.com/caolan/async#queue) implementation around when we were doing febp.

I also became very comfortable with underscore, and one of the nice things about async is that it provides a mostly complete library of underscore methods that have been modified to work asynchronously (with a callback). Even there, it goes above and beyond with functions like [async.forEachLimit](https://github.com/caolan/async#forEachLimit) that will process tasks in parallel, working through them in batches.

Async has also clearly 'won' the popular opinion vote. According to NPM it is depended on by 209 packages (Step: 50 packages).  It has 1509 watchers on github, where Step has 544. It works in the browser now, and is a 1.7k download once minified and gzipped.

I think this package should definitely be re-evaluated, and become part of bones proper. I dont think that switch to this from step is going to solve any major architectural problems, but I do feel that having it available will result in cleaner more consistent code for a lot of things.

Properly using Promises/Futures in backbone however, will solve a lot of crazy problems we have run into in the past. That's a post for another day though =)

