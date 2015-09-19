module.exports = function (app){
  //404s
  app.use(function(req, res, next){
    res.status(404);
    if(req.accepts('html')){
      return res.send("<h2>Errrrorrrrr, Couldn't find that paaaaage");
    }
    if(req.accepts('json')){
      return res.json({error: 'Not found'});
    }
    //default response type
    req.type('txt');
    res.send("Errrrorrrrr, Couldn't find that paaaaage");
  })


  //500
  app.use(function(err, req, res, next){
    console.error('error at %s\n', req.url, err.stack);
    res.send(500,"Oppppppps :C");
  })
}
