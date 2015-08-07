#Cloud9 setup for heroku

```
$ wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
$ npm install grunt-contrib-imagemin --save-dev && npm install --save-dev && heroku login.
$ yo angular-fullstack:heroku
$ cd ~/workspace/dist && heroku config:set NODE_ENV=production && heroku addons:add mongolab
$ git commit -am "your commit message" //for github
$ git push origin master, and to Heroku by running grunt --force && grunt buildcontrol:heroku
```