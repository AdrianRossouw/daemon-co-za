---
title: Dynamic Form Generation with JSON Schema.
category: post
layout: post
original_date: "2010-12-05"
breakWords: 248
---
{% include dateDisclaimer.html %}

{% capture foreword %}
<h3>Foreword <small>Added on {{page.date | date:"%d %B %Y"}}</small></h3>

This is one of the earliest posts I wrote while learning to use [Node.JS](http://nodejs.org). It was written during a phase where I was still trying to turn Node into Drupal. It is also one of the first times I realized that trying to do so was a mistake.

You simply do not need to have a system that automagically generates forms based on a declaritive control structures.
In my [Drupal](http://drupal.org) days, one of my largest contributions was the [Drupal Forms API](http://drupal.org/node/751826) that worked on similar principles, so this was a very difficult lesson for me to learn.

While I dont think what I was trying to accomplish in this article is the correct approach, the technology I was researching to help me solve it is actually really powerful and useful.

Other people have also realized that schemas could be used to generate forms:

* [JSON Editor](http://exavolt.github.com/onde/#?schema_url=schemas/jquery-package.json) - Generates input forms for JSON Schemas.
* [JSON Schema Editor](http://www.jsonschema.net/) - Generates dynamically editable schemas from JSON objects.

Whenever you find yourself having to come up with a format to declare anything in JSON Schema, wether it be how a config file is structured or some other problem, I urge you to take a look to see if there isn't already an agreed upon way to express this as a JSON schema.
{% endcapture %}

{{ foreword | markdownify }}

<!--more-->

<hr class='soften' />

### Dynamic Form Generation

One of the things that came up with my research of what the [form system](http://github.com/developmentseed/forms) is supposed to look at, was the extended detour I made into researching MVC patterns and data validation. When I wrote my first post on node.js and forms, I ended with an open question about whether we were simply re-inventing the wheel.

Especially w.r.t to the [Document module](http://github.com/developmentseed/document), I felt that we were taking the wrong direction in implementing all the data validation directly into the form layer. The example I used to illustrate what this misstep would mean, is the completely unacceptable requirement Drupal has of building the node form when attempting to node_save(). The validation needs to happen on the properties of the Data object, not the fields on the form.

One of the biggest inspirations I had was from my research into Django's form API. Specifically the way they allow you to [build forms from data models](http://docs.djangoproject.com/en/dev/topics/forms/modelforms/). At the same time, I didnt feel that we wanted to go 'whole hog' and implement an entire model component or even possibly an entirely new MVC framework.

### Enter JSON Schema

My research led me to a new, upcoming IETF standard called [JSON-schema](http://json-schema.org). Unlike trying to write an XML DTD, json-schema is actually a fairly straight forward way of writing a JSON object, that describes another json object.

Useful to keep in mind is that this is already something we are doing now. Declaratively defying content types is simply in our _(developmentseed's)_ DNA. Take a gander at this chunk of code from our stock settings.js, shown here edited for brevity:

{% highlight javascript %}
var documentTypes = {        
  'basic': {            
    'name': 'Basic',            
    'description': 'A simple document with a title and a body. Basic documents can be arranged in a hierarchical structure.',
    'fields': [
        { id: 'title', label: 'Title' },
        { id: 'body', label: 'Body',default: '' },
        { id: 'weight', label: 'Menu weight', default: 0}
    ]}
};
{% endhighlight %}

The same object implemented in the [json-schema 0.3 spec](http://tools.ietf.org/html/draft-zyp-json-schema-03) would be written as :

{% highlight javascript %}
var documentTypes = {        
  'basic': {
    id: 'basic'
    title: 'Basic',            
    description: 'A simple document with a title and a body. Basic documents can be arranged in a hierarchical structure.',
    properties: {
        title: { type: 'string', description: 'Title' },
        body: { type: 'string', description: 'Body', default: '' },
        weight: { type: 'integer', description: 'Menu weight', default: 0}
    ]}
};
{% endhighlight %}

As you can see, this isn't drastically different to how we were defining document types before, but standardising on json-schema allows us to do so very much more. JSON schema provides us a very rich vocabulary for describing the actual data constraints of the represented object.

As a very simple example, if we wanted to ensure that weights conform to the -20 to 20 bounds we are used to in Drupal, we can simply modify the property definition to be :

{% highlight javascript %}
{
  properties: {
    weight: {
      type: 'integer',
      description: 'Menuweight',
      default: 0,
      minimum: -20,
      maximum: 20
    }
  }
}
{% endhighlight %}

### Re-usability


In the intro to this project I mentioned that my primary concern with the forms API was to ensure that we do not make the same mistakes again. In a lot of cases we should not be validating the form itself, but instead the objects the form manipulates. This is even more important to us when taken from the perspective of NoSQL.

Using this standard vocabulary to define constraints on our data model, on a level below even the forms input validation allows us to more cleanly structure our applications and avoid duplication. When we are importing data from external sources, we can rely on the schema validation instead of needing to use the forms, and it allows us a lot more flexibility in our choices of inputs and exports.

<div class='alert alert-info'><strong>Note:</strong> This was from before we discovered <a href='http//backbonejs.org'>Backbone.js</a> and my issues here are now resolved by using schemas on the models for validation.</div>

### JSV

The best library I have found for validating these schemas is [Gary court's JSV](https://github.com/garycourt/JSV), which is very actively developed and is a tool that I believe should be made part of our base toolset. While I have shared some of [my previous experiments with this library](https://gist.github.com/608c415da3de129ab83c) in chats, I will summarize how we would be able to use it here :

The library is structured so that you construct an environment object, which will act as a container for schemas you want to validate against. Once the schemas have been loaded nto the environment, you can just pass it a json object and instruct it to validate against a known or new schema. If it fails it will give you a very detailed set of instructions about how or why it failed.

In a very real sense, I believe that proper use of this library could not only significantly improve data consistency, but also save us from writing any of the basic validation criteria that any mature development environment should provide for you.

### Testability

Not only will this allow us to validate our data, but because the schemas themselves are JSON objects too, the JSV library allows us to validate our schemas too!. The JSON-schema spec even allows the ability to extend itself, so 
if we decide to add additional properties for our own use, these could be validated for us too!

So while there is a not-insignificant learning curve for us as a team, it would allow us to head in a direction where we can easily bootstrap validation of everything from our data structures, to our custom declarative form definitions and so forth.

### Lessons from Django

I spoke earlier about Django's modelforms, which allow you construct forms from data models. One of the thing that scared me about MVC was the baggage that tends to come with the model component. We dont really want or need a database layer or ORM with all it's associated baked in assumptions cluttering up the way we define our 'content types' for lack of a better word.

JSON schema would give us just enough context about what the form is representing to be able to make some very useful guesses about how to represent it on a form. In some psuedocode i have running through my head :

{% highlight javascript %}
// assumes you have a valid schema defined already
var documentForm = forms.schema.createForm(documentSchema);
// form creates a new object
documentForm.prototype.action = 'create';
// fields to show on form, in that order.
documentForm.prototype.visible = [ '_id', 'title' , 'body' ];
 // override defaults
documentForm.prototype.widgets = [ 'body' : 'textarea' ]
{% endhighlight %}

You could also override specific generated fields or all fields or so forth. We could still decide to extend the json-schema definition to add a way to provide some overrides in the data definition itself.

Forms generated from schemas will have some sensible events called on the schema / data object. So a form creating a new object will attempt to fire the 'create' event on it associated schema instance. This would allow us to very easily and cleanly plug in whatever data layer we want.

### The View Layer?

This may also have implications for the [Display module](http://github.com/developmentseed/display), which is already starting to use very similar concepts with the entire 'entity' system. In the same way we could embed custom defaults for form elements, you could specify that this field needs to be run through markdown before display, and so forth.

I look forward to getting more input from you guys about this, because I am fairly confident that investing some time in these ideas will help us move beyond a loose collection of tools, and towards having a preferred environment for our node work.

<div class='alert alert-info'><strong>Note:</strong> The display module ended up being another huge mistake.<br />
It was a mistake for the same reasons that building a dynamic form creation system was a mistake, and it also set of a lifelong hatred for handlebars/mustache templates. More to come on this subject soon...</div>
