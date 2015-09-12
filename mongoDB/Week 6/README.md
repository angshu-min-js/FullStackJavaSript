#Homework 6.1
###Which of the following statements are true about replication in MongoDB? Check all that apply.
- The minimum sensible number of voting nodes to a replica set is three.
- MongoDB replication is synchronous.
- By default, using the new MongoClient connection class, w=1 and j=1.
- The oplog utilizes a capped collection.

####Response:
- The minimum sensible number of voting nodes to a replica set is three.
- The oplog utilizes a capped collection.
####Note:
- MongoDB replication is asynchronous.
- By default, using the new MongoClient connection class, w=1 and j=0.

#Homework 6.2
###Let's suppose you have a five member replica set and want to assure that writes are committed to the journal and are acknowledged by at least 3 nodes before you proceed forward. What would be the appropriate settings for w and j?
- w=1, j=1
- w="majority", j=1
- w=3, j=0
- w=5, j=1
- w=1,j=3
####Response:
- w="majority", j=1

#Homework 6.3
###Which of the following statements are true about choosing and using a shard key?
- You can change the shard key on a collection if you desire.
- There must be a index on the collection that starts with the shard key.
- MongoDB can not enforce unique indexes on a sharded collection other than the shard key itself, or indexes prefixed by the shard key.
- Any update that does not contain the shard key will be sent to all shards.
The shard key must be unique
####Response:
- There must be a index on the collection that starts with the shard key.
- MongoDB can not enforce unique indexes on a sharded collection other than the shard key itself, or indexes prefixed by the shard key.
- Any update that does not contain the shard key will be sent to all shards.

#Homework 6.4
###You have a sharded system with three shards and have sharded the collections "students" in the "school" database across those shards. The output of sh.status() when connected to mongos looks like this:
```
mongos> sh.status()
--- Sharding Status --- 
  sharding version: {
	"_id" : 1,
	"minCompatibleVersion" : 5,
	"currentVersion" : 6,
	"clusterId" : ObjectId("5531512ac723271f602db407")
}
  shards:
	{  "_id" : "s0",  "host" : "s0/localhost:37017,localhost:37018,localhost:37019" }
	{  "_id" : "s1",  "host" : "s1/localhost:47017,localhost:47018,localhost:47019" }
	{  "_id" : "s2",  "host" : "s2/localhost:57017,localhost:57018,localhost:57019" }
  balancer:
	Currently enabled:  yes
	Currently running:  yes
		Balancer lock taken at Fri Apr 17 2015 14:32:02 GMT-0400 (EDT) by education-iMac-2.local:27017:1429295401:16807:Balancer:1622650073
	Collections with active migrations: 
		school.students started at Fri Apr 17 2015 14:32:03 GMT-0400 (EDT)
	Failed balancer rounds in last 5 attempts:  0
	Migration Results for the last 24 hours: 
		2 : Success
		1 : Failed with error 'migration already in progress', from s0 to s1
  databases:
	{  "_id" : "admin",  "partitioned" : false,  "primary" : "config" }
	{  "_id" : "school",  "partitioned" : true,  "primary" : "s0" }
		school.students
			shard key: { "student_id" : 1 }
			chunks:
				s0	1
				s1	3
				s2	1
			{ "student_id" : { "$minKey" : 1 } } -->> { "student_id" : 0 } on : s2 Timestamp(3, 0) 
			{ "student_id" : 0 } -->> { "student_id" : 2 } on : s0 Timestamp(3, 1) 
			{ "student_id" : 2 } -->> { "student_id" : 3497 } on : s1 Timestamp(3, 2) 
			{ "student_id" : 3497 } -->> { "student_id" : 7778 } on : s1 Timestamp(3, 3) 
			{ "student_id" : 7778 } -->> { "student_id" : { "$maxKey" : 1 } } on : s1 Timestamp(3, 4)
```
If you ran the query
```
use school
db.students.find({'student_id':2000})
```
####Response: s1

#Homework 6.5
In this homework you will build a small replica set on your own computer. We will check that it works with validate.js, which you should download from the Download Handout link. 

Create three directories for the three mongod processes. 

On unix or mac, this could be done as follows:
```
mkdir -p /data/rs1 /data/rs2 /data/rs3
```
Now start three mongo instances as follows. Note that are three commands. The browser is probably wrapping them visually.
```
mongod --replSet m101 --logpath "1.log" --dbpath /data/rs1 --port 27017 --smallfiles --oplogSize 64 --fork 
mongod --replSet m101 --logpath "2.log" --dbpath /data/rs2 --port 27018 --smallfiles --oplogSize 64 --fork
mongod --replSet m101 --logpath "3.log" --dbpath /data/rs3 --port 27019 --smallfiles --oplogSize 64 --fork
```
Windows users: Omit -p from mkdir. Also omit --fork and use start mongod with Windows compatible paths (i.e. back slashes "\") for the --dbpath argument (e.g; C:\data\rs1). 

Now connect to a mongo shell and make sure it comes up
```
mongo --port 27017
```
Now you will create the replica set. Type the following commands into the mongo shell:
```
config = { _id: "m101", members:[
          { _id : 0, host : "localhost:27017"},
          { _id : 1, host : "localhost:27018"},
          { _id : 2, host : "localhost:27019"} ]
         };
rs.initiate(config);
```
At this point, the replica set should be coming up. You can type
```
rs.status()
```
to see the state of replication. 

Now install and run validate.js to confirm that it works.
```
npm install
node validate.js
```


