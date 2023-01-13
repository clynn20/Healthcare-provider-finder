// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express ();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
PORT = 9527;                      // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector')
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');
app.use(express.static('public'));

/*
    ROUTES
*/
app.get('/', function(req,res){
    res.render('doctor');
});

app.get('/pharmacy.hbs', function(req, res){             
    res.render('pharmacy');  
});

app.get('/doctor.hbs', function(req,res){
    res.render('doctor');
});

app.get('/faq.hbs', function(req,res){
    res.render('faq');
});

app.get('/hospital.hbs', function(req,res){
    res.render('hospital');
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flipX.engr.oregonstate.edu:' + PORT + '; X is the # of which flip server you currently in, press Ctrl-C to terminate.')
});