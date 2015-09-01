#MongoDB is document oriented & Schema-less
(http://proserge.kh.ua/coding/index.php/post/88/Mysql+To+MongoDB+statements+table)
(http://docs.mongodb.org/manual/)


```
$ mkdir data && echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod && chmod a+x mongod && ./mongod

```

We also sometimes use the term 'dynamic schema.' The point is that, unlike in a relational database, you are not constrained to follow any particular schema. If you wish to change your schema, you are free to do any of the following:

*Begin inserting documents with the new schema.
*Perform a bulk update on the existing documents.
*Begin updating old documents to the new schema one by one at an appropriate event (such as getting read from or written to), as coded in the application.
*Contrast this with what happens in a relational database, where the table must typically be taken offline in order to add columns.

*As for the other two answers, MongoDB does not support joins as a design decision because they do not scale horizontally, and it does not support SQL because that query language was built around joins and transactions, and tends to assume table structure rather than the flexible document orientation that MongoDB provides.*


```
//html
<h1>Hello, {{name}}!</h1>

//script
var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db('course');

app.get('/', function(req, res){

    // Find one document in our collection
    db.collection('hello_mongo_express').findOne({}, function(err, doc) {

        if(err) throw err;

        res.render('hello', doc);
    });
});

app.get('*', function(req, res){
    res.send('Page Not Found', 404);
});

mongoclient.open(function(err, mongoclient) {

    if(err) throw err;

    app.listen(8080);
    console.log('Express server started on port 8080');
});
```

##JSON:JavaScript Object Notation

There are two types of data structures:

*Arrays: List of things, []
*Dictionaries: Associated Maps, {}
(http://json.org/)
```
Example: 
{"fruit": ["apple", "pear", "peach"] }
		   {"address":  {"street_address":"23 Elm Drive",
              "city": "Palo Alto",
              "state": "California",
              "zipcode": "94305"}
              }
```             

```
show dbs
use <dbs>
show collections
db.<collection>.find();
mongorestore <data dump>
```

##CRUD and mongo shell

- Operations: MongoDB: SQLDB
- Create: Insert: Insert
- Read: Find: Select
- Update: Update: Update
- Delete: Remove: Delete

* MongoDB's CRUD operations exits as method/functions in programming language APIs, not as a separate language.
* It as a wired protocol

####BSON: Binary JSON, superset of JSON used by JavaScript

**findOne**
>>Use findOne on the collection users to find one document where the key username is "dwight", and retrieve only the key named email.

```
db.users.findOne({"username": "dwight"},{"email": true, "_id": false})
```

**find**
>>how would you find all documents with type: essay and score: 50 and only retrieve the student field?

```
db.scores.find({type:"essay", "score":50}, {student: true, _id: false})
```

**query operators**

```
db.scores.find({ score : { $gte : 50 , $lte : 60 } } ); // >=50 && <=60
```

- $gt, $gte, $lt, $lte
- $exits: true - db.scores.find({ score : {$exits: true } } ); //or false
- $type : 2 // 2 = string, look at the BSON documentation 
- $regex : '<>' // ^ - start, $ - end

```
db.users.find({name : {$regex: "q"}, email : {$exists: true}});
```
- $or: How would you find all documents in the scores collection where the score is less than 50 or greater than 90?
```
db.scores.find({
$or: [{score :  {$lt : 50 }}, {score: {$gt : 90 }}] 
})
```
- $and
- $all, $in
```
db.users.find( { friends : { $all : [ "Joe" , "Bob" ] }, favorites : { $in : [ "running" , "pickles" ] } } )
//output
{ name : "Cliff" , friends : [ "Pete" , "Joe" , "Tom" , "Bob" ] , favorites : [ "pickles", "cycling" ] }
```

- dot notation
Suppose a simple e-commerce product catalog called catalog with documents that look like this:
```
{ product : "Super Duper-o-phonic", 
  price : 100000000000,
  reviews : [ { user : "fred", comment : "Great!" , rating : 5 },
              { user : "tom" , comment : "I agree with Fred, somewhat!" , rating : 4 } ],
  ... }
```
Write a query that finds all products that cost more than 10,000 and that have a rating of 5 or better.
```
db.catalog.find({
'price': {'$gt' : 10000},
'reviews.rating': {'$gte': 5} //dot for embedded document
})
```

**Cursors:**

- cursor.next - next element
- cursor.hasNext - returns boolean if has next

```
   cursor = grades.find({}); null; //null to avoid the print
    cursor.skip(1);  
    cursor.limit(4); 
    cursor.sort('grade', 1);
```
Cursor can be changed at any point before the first document is called and before you've checked to see if it is empty.

- count :How would you count the documents in the scores collection where the type was "essay" and the score was greater than 90?
```
db.scores.count({type: 'essay' ,score:{$gt: 90}})
```

- update
```
db.foo.update({_id:"Texas"},{population:30000000})
```
- $set, $inc: increment

```
db.users.update({"_id" : "myrnarackham"}, {$set: {"country" : "RU"}})
```
- $unset
```
db.users.update({"_id":"jimmy"},{$unset:{"interests":1}})
```

- $push, $pop, $pull, $pushAll, $pullAll, $addToSet
```
db.friends.update( { _id : "Mike" }, { $push : { interests : "skydiving" } } );
db.friends.update( { _id : "Mike" }, { $pop : { interests : -1 } } );
db.friends.update( { _id : "Mike" }, { $addToSet : { interests : "skydiving" } } );
db.friends.update( { _id : "Mike" }, { $pushAll: { interests : [ "skydiving" , "skiing" ] } } );
```
-  upsert: true
```
db.foo.update( { username : 'bar' }, { '$set' : { 'interests': [ 'cat' , 'dog' ] } } , { upsert : true } );
```

- multipe update: {multi: true}
```
db.scores.update({'score':{$lt:70}}, {$inc:{'score':20}},{multi:true})
```
- remove
```
db.scores.remove({'score':{$lt:60}})
```

###NodeJS Driver and CRUD

- find

```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };

    db.collection('grades').find(query).toArray(function(err, docs) {
        if(err) throw err;

        console.dir(docs);

        db.close();
    });
});
```

- findOne

```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };

    db.collection('grades').findOne(query, function(err, doc) {
        if(err) throw err;

        console.dir(doc);

        db.close();
    });
});
```

- cursor: its a object to describe the data
```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };

    var cursor = db.collection('grades').find(query);

    cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        console.dir(doc.student + " got a good grade!");
    });
});

```
- projection
```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };

    var projection = { 'student' : 1, '_id' : 0 };

    db.collection('grades').find(query, projection).toArray(function(err, docs) {
        if(err) throw err;

        docs.forEach(function (doc) {
            console.dir(doc);
            console.dir(doc.student + " got a good grade!");
        });

        db.close();
    });
});
```
- gt lt

```
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : { '$gt' : 69, '$lt' : 80 } };
    db.collection('grades').find(query).each(function(err, doc){
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        console.dir(doc);
    });
}); 
```

**Importing the Reddit JSON**
```
var MongoClient = require('mongodb').MongoClient
  , request = require('request');

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    request('http://www.reddit.com/r/technology/.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            var stories = obj.data.children.map(function (story) { return story.data; });

            db.collection('reddit').insert(stories, function (err, data) {
                    if(err) throw err;

                    console.dir(data);

                    db.close();
            });
        }
    });
});
```
- regex
```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'title' : { '$regex' : 'Microsoft' } };

    var projection = { 'title' : 1, '_id' : 0 };

    db.collection('reddit').find(query, projection).each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        console.dir(doc.title);
    });
});
```
- sort, skip, limit
```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var grades = db.collection('grades');

    var cursor = grades.find({});
    cursor.skip(1);
    cursor.limit(4);
    cursor.sort('grade', 1);
    //cursor.sort([['grade', 1], ['student', -1]]);

    //var options = { 'skip' : 1,
    //                'limit' : 4,
    //                'sort' : [['grade', 1], ['student', -1]] };
    //var cursor = grades.find({}, {}, options);

    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        console.dir(doc);
    });
});
```
- insert
```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var doc = { '_id' : 'calvin', 'age' : 6 };

    db.collection('students').insert(doc, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted: " + JSON.stringify(inserted));

        return db.close();
    });
});
```
- findAndModify: atomically finds modify's and returns the document
```
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'name' : 'comments' };
    var sort = [];
    var operator = { '$inc' : { 'counter' : 1 } };
    var options = { 'new' : true };

    db.collection('counters').findAndModify(query, sort, operator, options, function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.log("No counter found for comments.");
        }
        else {
            console.log("Number of comments: " + doc.counter);
        }

        return db.close();
    });
});
```

- Mongo csv import

```
$ mongoimport --type csv --headerline weather_data.csv -d weather -c data
$ mongo
> use weather
> db.data.find().count()
> 2963
> db.data.find({"Wind Direction":{"$gte":180, "$lte": 360}}).sort({"Temperature"
: -1}).limit(1).pretty()
```
db.data.find({}).sort({"State": 1},{"Temperature": 1})

##Schema Design

- Rich Documents
- Pre Join/ Embedded Data
- MongoDB doesn't have 'join'
- no constraints
- atomic operation, no transactions 
- no declared schema
- always try to embed/pre-join the documents not like SQL DBs

**Normalization involves decomposing a table into less redundant (and smaller) tables but without losing information; defining foreign keys in the old table referencing the primary keys of the new ones. The objective is to isolate data so that additions, deletions, and modifications of an attribute can be made in just one table and then propagated through the rest of the database using the defined foreign keys.**

- LIVING WITHOUT CONSTRAINTS: Keeping your data consistent even though MongoDB lacks foreign key constraints
- Lack of transactions can be overcomed by:
* restructuring the code to work in one document and take advantage of atomic operations
* implement in SW
* tolerate (adjust)

- Benefits of embedding 
* Improved read performance
* one round trip to the DB

**Assignment3:**
```
$ mongoimport -d school -c students < students.json
$ mongo
> use school
> db.students.count() 
200
> db.students.find( { _id : 137 } ).pretty( )
{
	"_id" : 137,
	"name" : "Tamika Schildgen",
	"scores" : [
		{
			"type" : "exam",
			"score" : 4.433956226109692
		},
		{
			"type" : "quiz",
			"score" : 65.50313785402548
		},
		{
			"type" : "homework",
			"score" : 89.5950384993947
		}
	]
}
```

## Indexing

### Storage Engine: Its a interface between persistent database like the disk and the mongoDB server. Its plugable storage engine in mongodb
- MMAP:  its by default
- Wired Tiger
 It determines:
 - format of indexes
 - the data file format
 
- MMAPv1 automatically allocates power-of-two-sized documents when new documents are inserted
 * This is handled by the storage engine.
- MMAPv1 is built on top of the mmap system call that maps files into memory
 * This is the basic idea behind why we call it MMAPv1.
- MMAPv1 offers collection level locking.
- The operating system manages the memory used by each mapped file, deciding which parts to swap to disk.

- Wired Tiger:
 * Document level concurrency
 * Compression: of data and of index
(http://www.slideshare.net/wiredtiger/)
```
mongod --storageEngine wiredTiger
db.name.stats()
```

** Index is a ordered list of things. Indexing slows down your writes and increases your reads **
```
db.student.createIndex({student_id:1});
db.students.createIndex( { "class" : 1, "student_name" : 1 } )
db.students.getIndexes();
```

** Creating an index takes time **

#### Multi Index:
```
db.foo.createIndex( { a:1, b:1 } )
db.foo.insert( { a : "grapes", b : [ 8, 9, 10 ] } )
db.foo.insert( { a : "grapes", b : "oranges" } )
db.foo.insert( { a : ["apples", "oranges" ], b : "grapes" } )
```
* A can be an array and B a scalar or vice versa but both can be an array for a Multi Index *
```
{
	"_id" : ObjectId("551458821b87e1799edbebc4"),
	"name" : "Eliot Horowitz",
	"work_history" : [
		{
			"company" : "DoubleClick",
			"position" : "Software Engineer"
		},
		{
			"company" : "ShopWiki",
			"position" : "Founder & CTO"
		},
		{
			"company" : "MongoDB",
			"position" : "Founder & CTO"
		}
	]
}

> db.people.createIndex({'work_history.company':-1})
```
- Unique
```
db.students.createIndex({'student_id':1,'class_id':1},{'unique': true})
```
- Sparse: For duplicate/null unique
```
db.students.createIndex({'student_id':1,'class_id':1},{'unique': true, 'sparse':true})
```
 * You can gain greater flexibility with creating Unique indexes.
 * The index will be smaller than it would if it were not sparse.
 * Sorting not possible  by using indexes
 
 - Index creation
    * Foreground: Faster, blocks writes and reads in the database
	* Background: slower, don't block
	```
	db.students.createIndex({'student_id':1},{'background': true})
	```
- Explain
* query planner mode: dy default	
* execution stats mode: db.example.explain("executionStats")
* all plans execution: "allPlansExecution"

- Covered Queries: 
```
db.example.find( { name : { $in : [ "Bart", "Homer" ] } }, {_id : 0, dob : 1, name : 1} )
```
Shows name and dob but supresses _id

-  The index size can be considerably smaller (at the cost of some CPU space) in WiredTiger with --wiredTigerIndexPrefixCompression enabled.
- Index is more important to fit into memory
- The cost of moving documents, in terms of updating index entries only exists in the MMAPv1 storage engine. In the WiredTiger storage engine, index entries don't contain pointers to actual disk locations. Instead, in WiredTiger, the indexes contain _id values. As _id is immutable, the indexes don't change for document moves, although document moves do require updating the index that translates between _id values an disk locations.

- Geospatial Index
```
location:[x,y]
db.stores.ensureIndex({location:'2d', type:1})
db.stores.find({location:{$near:[50,50]}})
```
- Geospatial Spherical
 * GeoJson
```
db.stores.ensureIndex({'location':'2dsphere'})
db.stores.find({ loc:{ $near:{ $geometry: { type: "Point", coordinates: [-130, 39]}, $maxDistance:1000000 } } })
```
- Text Index
```
db.sentences.ensureIndex({'words':'text'})
db.sentences.find('{$text:{$search:'dog cat'}}) //this is a logical or
db.sentences.find('{$text:{$search:'dog'}}.{score:{$meta:'textScore'}}).sort({score:{$meta:'textScore'}}) //for sorting according to the score
```
Efficiency of Index Use
```
db.students.find({student_id:{$gt:500000}, class_id:54}).sort({student_id:1}).hint({class_id:1}).explain("executionstats")
```
Selectivity is the primary factor that determines how efficiently an index can be used. Ideally, the index enables us to select only those records required to complete the result set, without the need to scan a substantially larger number of index keys (or documents) in order to complete the query. Selectivity determines how many records any subsequent operations must work with. Fewer records means less execution time.
- Logging and Profiling
 * Default logging: In the mongod shell
(http://docs.mongodb.org/manual/reference/database-profiler/?_ga=1.206914768.2128372322.1439362268)
```
#collection for all queries that took longer than one second, ordered by timestamp descending
db.system.profile.find({millis:{$gt:1000}}).sort({ts:-1})
```
- Mongotop: Similar to unix top
- mongostat: Similar to unix iostat 
- Sharding: Splitting the data in different servers
```
Servers(mongoD, replica set) ---> Mongos ---> Application
```