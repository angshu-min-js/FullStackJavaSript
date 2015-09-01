#Homework 4.3
###Making the Blog fast

To get started, please download hw4-3.zip from the Download Handout link and unpack file to your computer. This assignment requires Mongo 2.2 or above.
```
# from the mongo shell
use blog
db.posts.drop()
# from the a mac or PC terminal window
mongoimport -d blog -c posts < posts.json
```
To check whether you have added the right index on the posts collection, run
```
    cd validate
    npm install
    node hw4-3_validate.js
```
You don't need to have the blog running for validate to succeed. You might want to look at the blog code to see what queries it does to the posts collection. they need to be fast. Need to import posts.json.
```
> db.system.indexes.find()
> db.posts.ensureIndex({date:-1, permalink:1})
> db.posts.ensureIndex({permalink:1})
> db.posts.ensureIndex({tags:1})
```
