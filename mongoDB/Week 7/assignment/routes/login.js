var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function (app) {

  app.get('/signup', function (req, res) {
    res.render('signup.jade');
  });

  // create new account
  app.post('/signup', function (req, res, next) {
    var email = cleanString(req.param('email')); // In the middleware there is the express body parser
    var pass = cleanString(req.param('pass')); //that stores the data internally on req object and is exposed by the param method
    if (!(email && pass)) {
      return invalid();
    }
//if the user exists; finding from the db
    User.findById(email, function (err, user) { //User is the User model collecttion
      if (err) return next(err);  //findById is the helper method of mongoose just like User.find()

      if (user) {
        return res.render('signup.jade', { exists: true });
      }

//if the user doesn't exits we're creating one
      crypto.randomBytes(16, function (err, bytes) { //crypto module is a built-in module in nodejs
        if (err) return next(err);

        var user = { _id: email };
        user.salt = bytes.toString('utf8');
        user.hash = hash(pass, user.salt); //pass + salt, hashing them together

        User.create(user, function (err, newUser) { //casting before saving in the db
          if (err) {
            if (err instanceof mongoose.Error.ValidationError) { //validation error
              return invalid();
            }
            return next(err); // different error passed to error handler
          }

          // user created successfully
          req.session.isLoggedIn = true;
          req.session.user = email;
          console.log('created user: %s', email);
          return res.redirect('/');
        })
      })
    })

    function invalid () {
      return res.render('signup.jade', { invalid: true });
    }
  });


  app.get('/login', function (req, res) {
    res.render('login.jade');
  })

  app.post('/login', function (req, res, next) {
    // validate input
    var email = cleanString(req.param('email'));
    var pass = cleanString(req.param('pass'));
    if (!(email && pass)) {
      return invalid();
    }

    // user friendly
    email = email.toLowerCase();

    // query mongodb
    User.findById(email, function (err, user) {
      if (err) return next(err);

      if (!user) {
        return invalid();
      }

      // check pass
      if (user.hash != hash(pass, user.salt)) {
        return invalid();
      }
      //if logged in
      req.session.isLoggedIn = true;
      req.session.user = email;
      res.redirect('/');
    })

    function invalid () {
      return res.render('login.jade', { invalid: true });
    }
  })

  app.get('/logout', function (req, res) {
    req.session.isLoggedIn = false;
    req.session.user = null;
    res.redirect('/');
  })
}
