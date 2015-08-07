#MongoDB is document oriented.


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
