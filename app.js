// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express ();            // We need to instantiate an express object to interact with the server in our code
PORT = 9536;                      // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector');
var hbs = require('hbs');
var exphbs = require('express-handlebars');
const { response } = require('express');
app.engine('hbs', exphbs.engine({defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname,"js")));


/*
    ROUTES
*/
app.get('/', function(req,res){
 
    res.render('doctor');
});

app.get('/pharmacy', function(req, res){  
   res.render('pharmacy');
    
});

app.get('/doctor', function(req,res){
    res.render('doctor');
});

app.get('/faq', function(req,res){
    res.render('faq');
});

app.get('/hospital', function(req,res){
    res.render('hospital');
});


app.post('/hospital', function(req,res){
    if(req.body.act == 'Cityinput'&& req.body.dist == 0){
        let query1 = `Select * from Hospitals WHERE city = "${req.body.city}";`;
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.json(rows);
            }
        });
    }
    if(req.body.act == 'Cityinput'&& req.body.dist!=0){
        let query2 = `Select * from Hospitals;`;
        db.pool.query(query2, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client 
                
                res.json(rows);
            }
        });
    }
    // handle client autocomplete request 
    if(req.body.act == 'req-source'){
        //console.log("search: " + req.body.search)
        let query3 = `SELECT cityName from City WHERE cityName Like "%${req.body.search}%";`;
        db.pool.query(query3, function(error,rows,fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.json(rows);
            }
        })
    }
});


app.post('/pharmacy', function(req, res){
    //var data = req.body;
    // handle client submit request 
    if(req.body.act == 'Cityinput'&& req.body.dist == 0){
        let query1 = `Select * from Pharmacies WHERE city = "${req.body.city}";`;
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.json(rows);
            }
        });
    }
    if(req.body.act == 'Cityinput'&& req.body.dist!=0){
        let query2 = `Select * from Pharmacies;`;
        db.pool.query(query2, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client 
                
                res.json(rows);
            }
        });
    }
    // handle client autocomplete request 
    if(req.body.act == 'req-source'){
        //console.log("search: " + req.body.search)
        let query3 = `SELECT cityName from City WHERE cityName Like "%${req.body.search}%";`;
        db.pool.query(query3, function(error,rows,fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.json(rows);
            }
        })
    }
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flipX.engr.oregonstate.edu:' + PORT + '; X is the # of which flip server you currently in, press Ctrl-C to terminate.')
});


