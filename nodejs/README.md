#NPM:

```
1. Install NPM
2. add user
3. json package -- npm init
4. git init
5. npm install --> for modules
5. npm install --save --> adding them to the package json
6. npm publish 
7. npm dist-tag add @ang/workspace@1.0.1 test --> test  = tag
8. npm dist-tag rm @ang/workspace test/latest
9. npm outdated
10. npm update [-g] [<name> [<name> ...]]
10 npm update @linclark/pkg ---> @linclark/pkg:Package Name
```

**"Enter the `npm rm` command (aka `npm uninstall` if you prefer to
type things out long-hand).

Remove all the deps!  But, make sure that you don't keep depending on them.

Just like you can use `--save` on installing packages, you can also
use `--save` when removing packages, to also remove them from your
package.json file."**

```
11. npm rm how-to-npm --save
12. Splitting your app up into multiple modules

13. Sharing private code with teammates using scoped modules

14. Other fun npm commands, like `edit` and `bugs` and `explore`!
```

#NodeJs: 

####Event Driven
####Non-Blocking
####Two-way connection
####Real-time application

**Callback: anonymous function**

1. Write a program that accepts one or more numbers as command-line arguments and prints the sum of those numbers to the console (stdout). 
```
//Given Solution
var result = 0
    
    
for (var i = 2; i < process.argv.length; i++)
      
result += Number(process.argv[i])
    
    
console.log(result)
```

```
//My Solution
var sum=0;

process.argv.forEach(function(val, index, array) {
  
//console.log(index + ': ' + val);
  
if(Number(val))
  
sum+=Number(val);
  
//console.log(sum);
});

console.log(sum);
```

2.Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l.

The full path to the file to read will be provided as the first command-line argument. You do not need to make your own test file.

```
var fs = require('fs');
console.log((fs.readFileSync(process.argv[2])).toString().split('\n').length-1)
```

3.Write a program that uses a single asynchronous filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running cat file | wc -l.

The full path to the file to read will be provided as the first command-line argument.

```
var fs = require('fs');

fs.readFile((process.argv[2]), function (err, data) {
  
if (err) throw err;
  
console.log(data.toString().split('\n').length-1);

});
 
```

4.Create a program that prints a list of files in a given directory, filtered by the extension of the files. You will be provided a directory name as the first argument to your program (e.g. '/path/to/dir/') and a file extension to filter by as the second argument.

```
var fs = require('fs');

fs.readdir((process.argv[2]), function (err, files) {
  
if (err) throw err;
 files.map(function(file){
      
if(file.match("."+process.argv[3]))
      
console.log(file) ;
  
;});
});
```

Official Solution:
```
var fs = require('fs')
    
var path = require('path')
    
    
fs.readdir(process.argv[2], function (err, list) {
      
list.forEach(function (file) {
        
if (path.extname(file) === '.' + process.argv[3])
          
console.log(file)
      
})
    })
```

5.This problem is the same as the previous but introduces the concept of modules. You will need to create two files to solve this.

Create a program that prints a list of files in a given directory, filtered by the extension of the files. The first argument is the directory name and the second argument is the extension filter. Print the list of files (one file per line) to the console. You must use asynchronous I/O.

You must write a module file to do most of the work. The module must export a single function that takes three arguments: the directory name, the filename extension string and a callback function, in that order. The filename extension argument must be the same as what was passed to your program. Don't turn it into a RegExp or prefix with "." or do anything except pass it to your module where you can do what you need to make your filter work.

The callback function must be called using the idiomatic node(err, data) convention. This convention stipulates that unless there's an error, the first argument passed to the callback will be null, and the second will be your data. In this exercise, the data will be your filtered list of files, as an Array. If you receive an error, e.g. from your call to  fs.readdir(), the callback must be called with the error, and only the error, as the first argument.

You must not print directly to the console from your module file, only from your original program.

In the case of an error bubbling up to your original program file, simply check for it and print an informative message to the console.

These four things are the contract that your module must follow.

  * Export a single function that takes exactly the arguments described.
  * Call the callback exactly once with an error or some data as described.
  * Don't change anything else, like global variables or stdout.
  * Handle all the errors that may occur and pass them to the callback.

The benefit of having a contract is that your module can be used by anyone who expects this contract. So your module could be used by anyone else who does learnyounode, or the verifier, and just work.

```
\\module.js
var fs = require('fs')
var path = require('path')
module.exports = function (fileName, Ext, callback) {

  fs.readdir(fileName, function (err, list) {
    if (err)
      return callback(err)

    list = list.filter(function (file) {
      return path.extname(file) === '.' + Ext
    })

    callback(null, list)
  })
}
```

```
\\program.js
var module = require('./module.js')
var fileName = process.argv[2]
var Ext = process.argv[3]

module(fileName, Ext, function (err, list) {
  if (err)
    return console.error('There was an error:', err)

  list.map(function (file) {
    console.log(file)
  })
})
```

6.Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each "data" event from the response to a new line on the console (stdout).

```
\\my solution
var http = require('http');
http.get(process.argv[2], function(response){
	response.setEncoding('utf8');
	response.on('data', function (data) {
    console.log(data);
  });
	response.on('error', function (error) {
    console.log(error);
  });
	
})
```

```
\\official solution
var http = require('http')
    
    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    })
```

7.Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Collect all data from the server (not just the first "data" event) and then write two lines to the console (stdout).

The first line you write should just be an integer representing the number of characters received from the server. The second line should contain the complete String of characters sent by the server.

```
var concat = require('concat-stream'); // var bl = require('bl')
var http = require('http');
http.get(process.argv[2], function (response) {
  response.pipe(concat(function (err, data) { //replace concat with bl
    if (err)
      return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))  
})
```

8.This problem is the same as the previous problem (HTTP COLLECT) in that you need to use http.get(). However, this time you will be provided with three URLs as the first three command-line arguments.

You must collect the complete content provided to you by each of the URLs and print it to the console (stdout). You don't need to print out the length, just the data as a String; one line per URL. The catch is that you must print them out in the same order as the URLs are provided to you as command-line arguments.

```
var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++

      if (count == 3)
        printResults()
    }))
  })
}

for (var i = 0; i < 3; i++)
  httpGet(i)
```

9. Write a TCP time server!

Your server should listen to TCP connections on the port provided by the first argument to your program. For each connection you must write the current date & 24 hour time in the format:

    "YYYY-MM-DD hh:mm"

followed by a newline character. Month, day, hour and minute must be zero-filled to 2 integers. For example:

    "2013-07-06 17:42"
	
```
var net = require('net')

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}

function date () {
  var d = new Date()
  return d.getFullYear() + '-'
    + zeroFill(d.getMonth()) + '-'
    + zeroFill(d.getDate()) + ' '
    + zeroFill(d.getHours()) + ':'
    + zeroFill(d.getMinutes())
}

var server = net.createServer(function (socket) {
  socket.end(date() + '\n')
})

server.listen(Number(process.argv[2]))
```

9. 
Write an HTTP server that serves the same text file for each request it receives.

Your server should listen on the port provided by the first argument to your program.

You will be provided with the location of the file to serve as the second command-line argument. You must use the fs.createReadStream() method to stream the file contents to the response

```
var http = require('http')
var fs = require('fs')
var server = http.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'}); //200 is the Http Status message like 404 for error
	 fs.createReadStream(process.argv[3]).pipe(res);//The Readable stream interface is the abstraction for a source of data that you are 
													//reading from. In other words, data comes out of a Readable stream.
    })
    server.listen(Number(process.argv[2]));
```

10. Write an HTTP server that receives only POST requests and converts incoming POST body characters to upper-case and returns it to the client.
Your server should listen on the port provided by the first argument to your program.

```
var http = require('http')
 var map = require('through2-map')
 
	var server = http.createServer(function(req, res)
	{
		if(req.method!='POST')
			return res.end('send POST request');
		req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
	})
    server.listen(Number(process.argv[2]))
```

11. Write an HTTP server that serves JSON data when it receives a GET request to the path '/api/parsetime'. Expect the request to contain a query string with a key 'iso' and an ISO-format time as the value.

For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

The JSON response should contain only 'hour', 'minute' and 'second' properties. For example:

    {
      "hour": 14,
      "minute": 23,
      "second": 15
    }

Add second endpoint for the path '/api/unixtime' which accepts the same query string but returns UNIX epoch time in milliseconds (the number of milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'. For example:

    { "unixtime": 1376136615474 }

Your server should listen on the port provided by the first argument to your program.


```
var http = require('http');
var url = require('url');
var server = http.createServer(function (request, response) {
    if (request.method=='GET') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        var parsedURL = url.parse(request.url, true);
        var date = new Date(parsedURL.query.iso);
        if (parsedURL.pathname == "/api/parsetime") {
            date = '{"hour":'+ date.getHours() +',"minute":'+ date.getMinutes() +',"second":'+ date.getSeconds() +'}';
        } else if (parsedURL.pathname == "/api/unixtime") {                                     
            date = '{"unixtime":'+ Date.parse(date.toISOString()) +'}';
        }
        response.end(date);
    }
})
server.listen(process.argv[2]);
```

