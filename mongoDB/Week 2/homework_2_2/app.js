var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    db.collection('data').find().sort({"State" : 1, "Temperature" : -1}).toArray(function(err, docs) {
        if(err) throw err;

        var previous_state = "";
        var query = {};
        docs.forEach(function (doc) {
            if(previous_state != doc.State) {
                previous_state = doc.State;
                query['_id'] = doc['_id'];
                var operator = { '$set' : { 'month_high' : true } };
                db.collection('data').update(query, operator, function(err, updated) {
                    if(err) throw err;
                    console.dir("Successfully updated " + updated + " document!");
                    return db.close();
                });   
            }
        });
        db.close();
    });
});