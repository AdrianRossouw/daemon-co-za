---
title: What does "Full-Stack" mean?
layout: post
category: post
header: "/img/header/full-stack-dolls.jpg"
headerClass: "normal"
---
Last week we had the introduction to my series on the [Full-Stack Fundamentals](/2014/04/introduction-fullstack-fundamentals), but I left some in my target audience confused as to why they needed to be pay attention. This is completely understandable because, for an industry that requires precision, we use a lot of terminology that is actually quite ill-defined.  

After some research I've concluded that being a "Full-Stack Engineer" has a range of meanings, and it's probably best if I show you the bigger picture.

<!--more-->

<div class='figure-wrapper'>
    <a href='/img/fullstack.venn.jpg'><img alt='fullstack venn diagram' src='/img/fullstack.venn.jpg' /></a>
</div>

<div class='bs-callout bs-callout-warning'>This diagram isn't the literal truth, merely a representation of one aspect of it.</div>

## Disciplines

Almost every position in our industry involves a combination of the following.  

<dl>
<dt>Empathy</dt>
<dd>Communication, leadership and other "Soft-Skills".<br />Ability to see from someone's point-of-view.</dd>
<dt>Design</dt>
<dd>Creativity and planning.<br />Not just visual; also interaction design, etc.</dd>
<dt>Code</dt>
<dd>Actual building of software.<br />Includes debugging, version control, unit tests, etc.</dd>
<dt>Systems</dt>
<dd>Networking, databases and operations.<br />Data: how to store, access and transfer it.</dd>
</dl>

DevOps is on the intersection of Code + Systems.  
Interface Design is on the intersection of Code + Empathy + Design.  
Let's explore where "Full-Stack Engineers" fall on it.

<div class='img-wrapper'>
    <img src='/img/header/web-stack.jpg' />
</div>

## The Minimum and Lesser-Spotted Definition

Mostly when people call themselves full-stack, they mean in this way; the narrowest definition of the term. This is almost indistinguishable from what we know as "web developers", which dilutes the original meaning.

I think it is a valid definition, because it really depends on what you consider "the stack" to be. In this case it means the front-end, the back-end and some form of database.

### Defining Feature
You can build the front-end and back-end of a site on your own. You can set up and manage the servers, configure and maintain the database.

### Required Skills

You will need to know at least one programming language for the front-end, and one programming language for the back-end. Since the front-end has to be JavaScript, choosing JavaScript for the back-end means you are done.

You don't need to be the world's best programmer, but there is a lot of domain knowledge that you will need to gain.

You don't need to be the world's best designer, but you need to able to visualize an outcome and then be able to express it in code. To be able to implement your designs, you are going to need more than a glancing familiarity with foundations of the browser environment.

You need just enough database and network experience to be the full package, but mostly this kind of developer knows just enough to be dangerous. 

### The Difference

The only real difference between these is your starting point. Are you coming from the code or design disciplines? A designer learning enough about code and systems is a much rarer animal than a developer learning enough about design.

They have contrasting mechanisms for improvement too. The computer will tell you when your code is wrong, but you have to trust
your instincts on whether your design works. You probably need some level of talent to improve your design skills much,
but programming mostly involves practice and determination. 

I don't think the distinction between the front-end and the back-end is as important as people make it out
to be, but you will need to have solid footing in both.

<div class='img-wrapper'>
    <img src='/img/header/stone-stack.jpg' />
</div>

## The Classical Definition

This is the point where things become a bit enterprisey, or dare I say it, web-scale.

The term was popularized about 5 years ago in a [pretty informative post from Facebook's engineering department](https://www.facebook.com/notes/facebook-engineering/the-full-stack-part-i/461505383919). The context here is vastly different from just building a web-app, and relies on a much wider set of skills.

From this perspective, you are looking as the "stack" as being the entire distributed system. The front-end, back-end, datastores, message queues, networks, data centers .. everything.

### Definining Feature

<blockquote><p>"The ability to quickly discard bad solutions, without actually building them, is a lot of what good systems programming is. Some of that is instinct, some experience, but a lot of it is algebra."</p>
  <footer>Keith Adams</footer>
</blockquote>

### Required Skills

You need to have a solid level of experience in a few different languages (you shouldnt just be a "all i know is java so i do everything in java" programmer). Industry best practices such as version control, testing and backups, and various development metholodogies will be second nature to you at this point.

You will need to understand the shape of data, and how it flows through the network. How does it need to be accessed, and changed? There is a really deep level of knowledge needed to understand performance implications in distributed systems, so you will know how best to structure your system to avoid these bottlenecks.

At the _bare minimum_ you will need to know at least one NoSQL database, and one relational database. You don't need to know both of them equally well, but you need to be able to
understand that they have different strengths and weaknesses, trying to jam every type of data into the same container is only going to lead to problems in the long term.

It's unlikely that you will get away just using your favorite tools all the time, so you will need to understand how to evaluate other data stores, what kind of performance
you can expect and what kind of data you should use them with.

Deep understanding of operating systems and virtualization will be a necessity, and you need to be able to build and manage servers, write deployment scripts and manage releases.

You need to be able to quickly diagnose problems that occur in complex systems, and figure out how to resolve them. 
At this level it is very unlikely you will be working alone, so you have to be able to clearly communicate with team members to aid the decision making process.

<div class='img-wrapper'>
    <img src='/img/header/unicorn.jpg' />
</div>

## Unicorns and other mythical beasts 

Many of the definitions have points that have no relation to programming at all, because empathy is a critical skill for effective communication.

The scope here is to consider all of the things that happen on the technical level as just part of a separate tech stack. You now have to be able to consider
the environment in which these decisions need to be made.


### Defining Feature

Being able to see past the details, and figure out what the user actually needs. Using your
knowledge of the entire tech stack to make decisions that can actually be accomplished. Knowing the
capabilities of the business to deliver on any promises you make. Being able to motivate and manage
others to help you reach that goal.  

### Required skills

<blockquote>
<dl>
<dt>em·pa·thy, ˈempəTHē/</dt>
<dd><strong>1. the ability to understand and share the feelings of another.</strong></dd>
</dl>
</blockquote>

This isnt something I care to write a great deal about, but I needed to include it because this is probably the thing that actually drives
the value for business.

You need to know how to ask the right questions, and what the right questions are to ask. If we implement this feature, does it further
our goals as a company or make the lives of our users easier? That kind of thing.

You need to be able to understand what matters to your collaborators, and avoid triggering a defensive reaction to new views that are shared.
Nobody likes being told they are wrong, and nobody likes admitting that they are.

All of your know-how isn't going to make any difference to a project if you aren't able to share what you know in a way
that your team will be able to make us of it. This goes beyond just logically arguing a point, and requires you to strike the right
tone and share the right message.

You will also need to be able to swallow your pride, and just do what needs to be done. You need to acknowledge that you can't know everything
about everything, but know enough about those things to be able to recieve help from others graciously.

<div class='img-wrapper'>
    <img src='/img/header/stack-rope.jpg' />
</div>

So yes, it is impossible to nail down a single meaning; I think it still seems to have allowed people to communicate some very abstract ideas, which they would have needed to invent terminology for anyway.

There is probably a deeper philosophic principle at play here, about the point where any term becomes so vague that it ceases to have any meaning, or so specific that it doesn't allow people with different perspectives to communicate about complex subjects.

Being full stack is not a destination you can ever really reach. It is a constant process of expanding your knowledge of how things work,
how the parts fit together, and the reasons for things working that way. Whatever your "stack" is, it's probably a tiny speck in a much
larger one.

This is not a new idea either. There is a much older term called ["T-Shaped Skills"](http://en.wikipedia.org/wiki/T-shaped_skills), that are defined as having a deep specialization in one
area but having a broad working knowledge in many other related areas. Way before that, people who aimed for this were called renaissance men.

Everything old is new again.

[Discussion on the /r/FullStack subreddit](http://www.reddit.com/r/FullStack/comments/24534d/what_does_fullstack_mean/)
