#Express: Fast, unopinionated, minimalist web framework for Node.js

```
$ npm install express --save
[http://expressjs.com/guide/routing.html]
```

1. Create an Express.js app that outputs "Hello World!" when somebody goes to /home.

The port number will be provided to you by expressworks as the first argument of
the application, ie. process.argv[2].

**Solution:**

```
var express = require('express')
    var app = express()
    app.get('/home', function(req, res) {
      res.end('Hello World!')
    })
    app.listen(process.argv[2])
```

2.Apply static middleware to serve index.html file without any routes.

Your solution must listen on the port number supplied by process.argv[2].

The index.html file is provided and usable via the path supplied by
process.argv[3]. However, you can use your own file with this content:
```
    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>
```

**Solution:**

```
var express = require('express')
var path = require('path')
    var app = express()
    app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
    app.listen(process.argv[2] || 8000)
```	

3. Create an Express.js app with a home page rendered by Jade template engine.

The homepage should respond to /home.

The view should show the current date using toDateString.

```
/**
h1 Hello World
    p Today is #{date}. **/
```

Reference: [http://expressjs.com/guide/using-template-engines.html]

**Solution:**

```
var express = require('express')
var app = express()
app.set('view engine', 'jade')
app.set('views', process.argv[3]) //app.set('views', path.join(__dirname, 'templates'))
app.get('/home', function(req, res) {
  res.render('index', {date: new Date().toDateString()})
})
app.listen(process.argv[2])
```

4. Write a route ('/form') that processes HTML form input
(<form><input name="str"/></form>) and prints backwards the str value.

 $ npm install body-parser
 
To parse x-www-form-urlencoded request bodies Express.js can use urlencoded()
middleware from the body-parser module.

**Solution:**
 
 ```
var express = require('express')
var app = express()
var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false})) //The bodyParser object exposes various factories to create middlewares. All middlewares
//will populate the req.body property with the parsed body or provide an error to the callback
app.post('/form', function(req, res){
res.send(req.body.str.split('').reverse().join(''))
})
app.listen(process.argv[2])
```

5. Style your HTML from previous example with some Stylus middleware.

Your solution must listen on the port number supplied by process.argv[2].

The path containing the HTML and Stylus files is provided in process.argv[3]
(they are in the same directory). You can create your own folder and use these:

The main.styl file:

    p
      color red

The index.html file:
```
    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>
```
	
	$ npm install stylus
	
**Solution:**
	
```
var express = require('express')
var app = express()
app.use(require('stylus').middleware(process.argv[3]))
app.use(express.static(process.argv[3])); 
app.listen(process.argv[2])
```

6. Create an Express.js server that processes PUT '/message/:id' requests.

For instance:

    PUT /message/526aa677a8ceb64569c9d4fb

As a response to these requests, return the SHA1 hash of the current date
plus the sent ID:
```
    require('crypto')
      .createHash('sha1')
      .update(new Date().toDateString() + id)
      .digest('hex')
```
	  
/**
SHA1 is a cryptographic hash function. It's result is usually expressed as a 160 bit hex number. SHA1 was developed by the NSA. SHA1 is widely considered the successor to MD5. If you want to learn all about SHA1, look here.**/

**Solution:**
```
var express = require('express')
var app = express()
app.put('/message/:id', function(req, res){
var id = req.params.id
var sha= require('crypto')
      .createHash('sha1')
      .update(new Date().toDateString() + id)
      .digest('hex')
res.send(sha);
});
app.listen(process.argv[2])
```

7. Write a route that extracts data from query string in the GET '/search' URL
route, e.g. ?results=recent&include_tabs=true and then outputs it back to
the user in JSON format.

**Solution:**
```
var express = require('express')
var app = express()
app.get('/search', function(req, res) {
 var search = req.query
  res.send(search);
});
app.listen(process.argv[2])
```

8. Write a server that reads a file, parses it to JSON and outputs the content
to the user.

The port is passed in process.argv[2].  The file name is passed in process.argv[3].

Respond with:

    res.json(object)

Everything should match the '/books' resource path.

**Solution:**

```
var fs = require('fs')
var express = require('express')
var app = express()
app.get('/books', function(req, res){
fs.readFile(process.argv[3], function (err, data) {
  if (err) throw err;
  var books = JSON.parse(data)
  res.json(books);
 })
})
app.listen(process.argv[2])
```

```
//Given Solution
var express = require('express')
    var app = express()
    var fs = require('fs')
    
    app.get('/books', function(req, res){
      var filename = process.argv[3]
      fs.readFile(filename, function(e, data) {
        if (e) return res.send(500)
        try {
          books = JSON.parse(data)
        } catch (e) {
          res.send(500)
        }
        res.json(books)
      })
    })
    
    app.listen(process.argv[2])
```

9. Use  of get, post

**Solution:**

```
var express = require('express')
  , app = express()
  , cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router);

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function(req, res, next) {
    res.render('fruitPicker', { 'fruits' : [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next(Error('Please choose a fruit!'));
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.listen(3000);
console.log('Express server listening on port 3000');

```