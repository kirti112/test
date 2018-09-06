const express = require('express')
var http = require('http');
//var request = require('request').debug = true;
var request = require('request');
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override');
const app = express()
var routes = require('./routes.js')
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// configuration ===============================================================
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/vtest', { useNewUrlParser: true });
mongoose.connection.on('open', function (ref) {
    //console.log('Connected to mongo server._____________________________________________');
});
mongoose.connection.on('error', function (err) {
    // console.log('Could not connect to mongo server!._____________________________________________');
    // console.log(err);
});


app.get('/',routes.index );
app.post('/hours/save/',routes.Save);
app.post('/hours/update/',routes.Update);
app.get('/hours/all',routes.All);

app.listen(3000, () => console.log('Example app listening on port 3000!'))