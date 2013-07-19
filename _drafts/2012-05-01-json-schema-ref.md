##### JSON is declarative, Javascript is imperative.

They are not the same thing. When you are dealing with declaring JSON Object, specifically
something that could be considered your data (ie: from CSV import), the schema 
(ie: how to validate said data) and possibly even the metadata, you are not in fact writing
javascript.

You shout not use anonymous functions or make use of object constructors such as: 
New Date(), that we [currently make use of in our settings.js files](https://github.com/developmentseed/TileMill/blob/master/settings.js#L10), yet consider the 
data structure declarative'.

##### Reading/Writing, Import/ Export.

The major issue we have with imperative code is that it needs to either be written by a
human on a case by case basis, in which case it is very difficult to generalize successfully, 
OR it needs to be generated using a code generator routine.

What makes imperative code difficult is that once generated, we practically need to teach
the system that consumes this data object to parse native javascript to attempt to make sense of it.

Hence, if we generate imperative code we still need to ship the parameters for the generator that made
that code in the first place, to be able to reproduce the results and edit it.

#### Business Objects versus data/metadata

We also need to be clear in our mind about the distinction between a standard json chuck of data,
either from CSV/Couch/Whatever, and a 'Business Object'. Business objects are data that have associated
behaviour. 

Metadata can be used to simplifiy the development of business objects from the dump of data,
by describing it in such a way that we can attempt to fill in the blanks.

As an example of the version we have with FEBP, we have a single dimensional hash table containing an
indicator/period for each column for each record. This is our 'data'. Aside from this, we put together
a 'json-schema' which declaritively describes the data we expect to see, so we can validate on import.

Another level up, we have the State business object metadata. This describes exactly which indicators
are contained for each of the state data records, including descriptions and lots of other useful info.

Each of these indicators refer to specific keys in the data array for their values. Now the one way
we could do this is to have to write a method or function for every time we want to do a specific
type of lookup from another property.

This would involve having to generate and populate an accessor method with the correct context available
to do said lookup. 

#### JSON-ref instead of methods

But i prefer the following: [I ported the Dojo JSON-ref implementation to node](https://gist.github.com/54dba4cfb15eb3b3c7f3).

This allows us to leave standard placeholders for other locations in the array, 
that can be resolved easily through the api.


   var stateInstance = {
       data: {
           state4read05: 0.3,
           state4read06: 0.5,
           state4read07: 0.4,
           state4read08: 0.4,
           state4read09: 0.6,
       },
       indicator: {
           state4math: {
               type: 'series',
               granularity: 'year',
               display: 'percent',
               label: '4th Grade Reading NCLB',
               source: 'State NCLB Report Cards and Departments of Education 2005, 2006, 2007, 2008 & 2009',
               description: 'State Defined Proficiency Level in Math and Reading for 4th Grade, 8th Grade and High School',
               2005: {'$ref': '#data.state4read05'},
               2006: {'$ref': '#data.state4read06'},
               2007: {'$ref': '#data.state4read07'},
               2008: {'$ref': '#data.state4read08'},
               2009: {'$ref': '#data.state4read09'},
          },
       }
   }

   console.log(export.resolveJson(stateInstance));

results in :

   { data: 
      { state4read05: 0.3
      , state4read06: 0.5
      , state4read07: 0.4
      , state4read08: 0.4
      , state4read09: 0.6
      , __parent: [Circular]
      }
   , indicator: 
      { state4math: 
         { '2005': 0.3
         , '2006': 0.5
         , '2007': 0.4
         , '2008': 0.4
         , '2009': 0.6
         , type: 'series'
         , granularity: 'year'
         , display: 'percent'
         , label: '4th Grade Reading NCLB'
         , source: 'State NCLB Report Cards and Departments of Education 2005, 2006, 2007, 2008 & 2009'
         , description: 'State Defined Proficiency Level in Math and Reading for 4th Grade, 8th Grade and High School'
         , __parent: [Circular]
         }
      , __parent: [Circular]
      }
   }

This gives us a generic way to make references to different parts of the schema, and reduces the amount of custom code we need to write for each type of object.


#### Runtime versus instantiation-time

I'm not going to lie, a general method like this may become slow if we overuse it too much, but I also think we need to
consider how we intend to use the reference functionality. Is it really necessary for us to hit couchdb on every request?

Especially on objects that dont change as often. I almost think that leaving these lookups in place as getters is the most efficient way you could go. So you could populate some prototype objects based on the metadata, and during instantiation (ie: when you load the data from the database), you can populate the relative parts of the business object, and the lookups will just remain working.

#### Weaving together json-schemas

One of the benefits of sticking to declarative, is that json-shema is completely declarative.
it gives us an exceptional vocabularly for defining our data objects, and the constraints on them,
but even more interestingly it allows you to easily extend json-schema.

For example, it took but a few minutes to put together a json-schema which would validate whether
our business objects were correct (w.r.t. indicators).

We can further very easily specify that one of the properties of our business object refers to an
object conforming to the data schema, making the entire final result easily verifiable and testable.

#### Once you can build forms from schemas, you can build forms FOR schemas.

Being able to build a form from a JSON-schema defintion, implies being able to build forms
FOR JSON-schema definitions, and because it's all simple JSON objects that can be easily 
manipulated, validated and stored, it really makes a hell of a lot of sense to try and stick with it.

As i've mentioned before, the design i like a lot is [the django modelforms system](http://docs.djangoproject.com/en/dev/topics/forms/modelforms/). Which takes a model (or data schema) as input, and puts together a basic form from it, which can then be extended and modified.

#### DRY - don't repeat yourself.

We can have the exact same functionality with the code that generates our business objects / displays / etc.

JSON-schema also has excellent support for re-usability through it's reference mechanisms. You can
define a new type of object and then in a later object define 'has one or more' relationship to your
predefined type.

Once we can bootstrap business objects from schemas (and by no means everything can be captured 
in the schema), we will be in a far more efficient place, where  we simply need to extend what is already
represented in a generic portable manner.

#### Events versus callbacks.

Another thing I want to mention is that all of the ASYNC code around this I have worked
with seems to me FAR more understandable when using the event / binding mechanisms, rather than
passing callbacks down the chains.

This is already one of the big reasons in my mind that backbone.js is getting such a following,
and they are a order of magnitude more understandable than drupal's hook system.

As Steven Wittens put it.. 'They are like hooks, but they actually COME from somewhere'. 

[Lexical this issues](http://is.gd/sHoMHD) aside, i think that the model of generic json that gets turned into a business object prototype through a constructor, which also turns the business object into an event emitter,
is something that excites me.
