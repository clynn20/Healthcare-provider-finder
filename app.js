// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express ();            // We need to instantiate an express object to interact with the server in our code
PORT = 9550;                      // Set a port number at the top so it's easy to change in the future
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
 
    res.status(200).render('alldoctor');
});

/*
app.get('/doctor', function(req,res){
    res.render('doctor');
});


app.get('/eyedoctor', function(req,res){
    res.render('eyedoctor');
});

app.get('/therapist', function(req,res){
    res.render('therapist');
});

app.get('/dentist', function(req,res){
    res.render('dentist');
});
*/

app.get('/alldoctor', function(req, res){  
    res.status(200).render('alldoctor');
 });


app.get('/pharmacy', function(req, res){  
    res.status(200).render('pharmacy');
 });

 app.get('/hospital', function(req,res){
    res.status(200).render('hospital');
});


app.get('/faq', function(req,res){
    res.status(200).render('faq');
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
                res.status(200).json(rows);
            }
        });
    }
    if(req.body.act == 'Cityinput'&& req.body.dist!=0){
        let query2 = `Select * from Hospitals WHERE city = "${req.body.city}";`;
        db.pool.query(query2, function(error, rows, fileds){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                // no such city in our database so return []
                if(rows.length == 0){
                    res.status(200).json(rows);
                }
                else{
                    let query3 = `Select * from Hospitals;`;
                    db.pool.query(query3, function(error, rows, fields){
                    if(error){
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else{
                        //console.log(rows)
                        // send response back to client 
                        res.status(200).json(rows);
                    }
                    });

                }
            }
        });
    }
    // handle client autocomplete request 
    if(req.body.act == 'req-source'){
        //console.log("search: " + req.body.search)
        let query4 = `SELECT cityName from City WHERE cityName Like "%${req.body.search}%";`;
        db.pool.query(query4, function(error,rows,fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.status(200).json(rows);
            }
        })
    }
});


app.post('/pharmacy', function(req, res){
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
                res.status(200).json(rows);
            }
        });
    }
    if(req.body.act == 'Cityinput'&& req.body.dist!=0){
        let query2 = `Select * from Pharmacies WHERE city = "${req.body.city}";`;
        db.pool.query(query2, function(error, rows, fileds){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                // no such city in our database so return []
                if(rows.length == 0){
                    res.status(200).json(rows);
                }
                else{
                    let query3 = `Select * from Pharmacies;`;
                    db.pool.query(query3, function(error, rows, fields){
                    if(error){
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else{
                        //console.log(rows)
                        // send response back to client 
                        res.status(200).json(rows);
                    }
                    });
                }
            }
        });
    }
    // handle client autocomplete request 
    if(req.body.act == 'req-source'){
        //console.log("search: " + req.body.search)
        let query4 = `SELECT cityName from City WHERE cityName Like "%${req.body.search}%";`;
        db.pool.query(query4, function(error,rows,fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.status(200).json(rows);
            }
        })
    }
});

app.post('/alldoctor', function(req,res){
    if(req.body.act == 'Cityinput'&& req.body.dist == 0 && req.body.type == 1){
        let query1 = `Select * from Doctors WHERE City = "${req.body.city}";`;
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.status(200).json(rows);
            }
        });
    };
    if(req.body.act == 'Cityinput' && req.body.dist!=0 && req.body.type == 1){
        let query2 = `Select * from Doctors WHERE city = "${req.body.city}";`;
        db.pool.query(query2, function(error, rows, fileds){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                // no such city in our database so return []
                if(rows.length == 0){
                    res.status(200).json(rows);
                }
                else{
                    let query3 = `Select * from Doctors;`;
                    db.pool.query(query3, function(error, rows, fields){
                    if(error){
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else{
                        //console.log(rows)
                        // send response back to client 
                        res.status(200).json(rows);
                    }
                    });
                }
            }
        });
    };
    if(req.body.act == 'Cityinput'&& req.body.dist == 0 && req.body.type == 2){
        let query4 = `Select * from Dentist WHERE City = "${req.body.city}";`;
        db.pool.query(query4, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.status(200).json(rows);
            }
        });
    };
    if(req.body.act == 'Cityinput'&& req.body.dist != 0 && req.body.type == 2){
        let query5 = `Select * from Dentist WHERE city = "${req.body.city}";`;
        db.pool.query(query5, function(error, rows, fileds){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                // no such city in our database so return []
                if(rows.length == 0){
                    res.status(200).json(rows);
                }
                else{
                    let query6 = `Select * from Dentist;`;
                    db.pool.query(query6, function(error, rows, fields){
                    if(error){
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else{
                        //console.log(rows)
                        // send response back to client 
                        res.status(200).json(rows);
                    }
                    });
                }
            }
        });
    };
    if(req.body.act == 'Cityinput'&& req.body.dist == 0 && req.body.type == 3){
        let query7 = `Select * from EyeDoctor WHERE City = "${req.body.city}";`;
        db.pool.query(query7, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.status(200).json(rows);
            }
        });
    };
    if(req.body.act == 'Cityinput'&& req.body.dist != 0 && req.body.type == 3){
        let query8 = `Select * from EyeDoctor WHERE city = "${req.body.city}";`;
        db.pool.query(query8, function(error, rows, fileds){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                // no such city in our database so return []
                if(rows.length == 0){
                    res.status(200).json(rows);
                }
                else{
                    let query9 = `Select * from EyeDoctor;`;
                    db.pool.query(query9, function(error, rows, fields){
                    if(error){
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else{
                        //console.log(rows)
                        // send response back to client 
                        res.status(200).json(rows);
                    }
                    });
                }
            }
        });
        
    };
    if(req.body.act == 'Cityinput'&& req.body.dist == 0 && req.body.type == 4){
        let query10 = `Select * from Mental WHERE City = "${req.body.city}";`;
        db.pool.query(query10, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                // send response back to client
                res.status(200).json(rows);
            }
        });
    };
    if(req.body.act == 'Cityinput'&& req.body.dist != 0 && req.body.type == 4){
        let query11 = `Select * from Mental WHERE city = "${req.body.city}";`;
        db.pool.query(query11, function(error, rows, fileds){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                // no such city in our database so return []
                if(rows.length == 0){
                    res.status(200).json(rows);
                }
                else{
                    let query12 = `Select * from Mental;`;
                    db.pool.query(query12, function(error, rows, fields){
                    if(error){
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else{
                        //console.log(rows)
                        // send response back to client 
                        res.status(200).json(rows);
                    }
                    });
                }
            }
        });
    };
    
    // handle client autocomplete request 
    if(req.body.act == 'req-source'){
        //console.log("search: " + req.body.search)
        let query13 = `SELECT cityName from City WHERE cityName Like "%${req.body.search}%";`;
        db.pool.query(query13, function(error,rows,fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                //console.log(rows)
                //send response back to client
                res.status(200).json(rows);
            }
        })
    }
});

app.use('*', function(req, res, next){
    res.status(404).send({
        err: `requested url doesn't exist: ${req.originalUrl}`
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flipX.engr.oregonstate.edu:' + PORT + '; X is the # of which flip server you currently in, press Ctrl-C to terminate.')
});


