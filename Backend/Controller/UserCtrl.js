const express = require("express");
const app = express();
const pool = require("../config/db");
var bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var mysql = require("mysql");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
     //const newFilename = `${req.body.description}${path.extname(file.originalname)}`;
     const newFilename = `${req.body.description}`;
      cb(null, newFilename);
    }
  });

  const upload = multer({ storage });
    
app.use(bodyParser.json());
var properties=[];

app.post("/login",function(req,res){
    const user = {
    email:req.body.email,
     password:req.body.password
    }
    const selectQueryString = "select * from user_signup where email = '"+user.email+"' && password = '"+user.password+"';";
    console.log(req.body);
    pool.getConnection(function(err,con){
        if(err){console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(selectQueryString, function (error, results, fields) {
        
        console.log(results.length === 0);
        
        if (results.length === 0){
       console.log('Please Enter the correct information');
       res.status(401).send('Sorry, we cannot find that!');
       return;
      } else { let name = results[0].name.split(" ");
      let type=results[0].type;
      
      let displayName = name[0] + " " + name[1].substring(0,1) + ".";
        // console.log('The solution is: ', results);
        res.cookie('cookie',displayName,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('cookie2',type,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('cookie3',user.email,{maxAge: 900000, httpOnly: false, path : '/'});
        console.log(type);
        
                    req.session.user = results;
                        
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
    res.end(user.email);
      }
    });
}   
});
});

app.post("/register",function(req,res){
   
    const selectQueryString = "select * from user_signup where email = ?";
    console.log(req.body);
    pool.getConnection(function(err,con){
        if(err){console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(selectQueryString,req.body.email,function (error, results, fields){
        if(error){
            //throw error;
        }
        if(results.length > 0){
            
            res.status(300).send("User Exists");
            console.log("User exists");
        }
        else {
            const userName = req.body.firstname + " " + req.body.lastname;
            const insertQueryString = "INSERT INTO user_signup(name,email,password,type) values ('" + userName+ "'" + ",'" + 
                req.body.email + "'," + "'" + req.body.password + "'," +"'" +req.body.type +"');"; 
             con.query(insertQueryString,function (error, results, fields) {
                    if(error){
                        //throw error;
                        console.log(error);
                        const output = {
                            status : "300",
                            msg: "Server Error"
                        }
                    }
                    const output = {
                        status : "200",
                        msg: "Data inserted"
                    } 
                    console.log("User Created")  ;
                    res.send(output);
            });
        }
    });
}
    });
     
});


app.post("/home",function(req,res){
    const selectSearchString = "SELECT * FROM property WHERE location = '"+ req.body.location+"' AND datein<='"+req.body.startdate+"' AND dateout>='"+req.body.enddate+"' AND guests>='"+req.body.guests+"';"
    console.log(req.body);
    console.log(selectSearchString);
    pool.getConnection(function(err,con){
        if(err){console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(selectSearchString,function(err,results,fields){
        console.log(results.length);
                  //console.log("No of Properties Found : ",result.length)
                  properties=[]; //Nullifying the value of Properties array
                  if(results.length){
                    for(var i = 0; i<results.length; i++ ){     
                                    properties[i]=(results[i]); //Inserting values from result to Properties array
                        }
                        //res.end("200")
                        res.redirect('/results');
                        
                    }else{
                        res.end("400")
                    }
                });
            }
        });
    
      }   
);


app.post("/check",function(req,res){
    const selectSearchString = "update user_signup set type = " + mysql.escape("owner") + "where email = " + mysql.escape(req.body.email);
    
    console.log(selectSearchString);
    pool.getConnection(function(err, con) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could Not Get Connection Object");
        } else {
          con.query(selectSearchString, function(err, result) {
            if (err) {
              res.writeHead(500, {
                "Content-Type": "text/plain"
              });
              res.end("An error occured");
            } else {
              res.clearCookie("cookie2");
              var sql2 =
                "SELECT *  FROM user_signup WHERE email = " + mysql.escape(req.body.email);
              console.log(sql2);
              con.query(sql2, function(err, result) {
                if (err) {
                  res.writeHead(350, {
                    "Content-Type": "text/plain"
                  });
                  console.log(err);
                  res.end("Server error");
                } else {
                  var type = result[0].type;
                  res.cookie("cookie2", type, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.writeHead(200, {
                    "Content-Type": "text/plain"
                  });
                  console.log("Solution is", result);
     
                  res.end("Data inserted successfully");
                }
              });
            }
          });
        }
      });
    
      }   
);

app.post('/userupdate',function(req,res){
    console.log("Inside User Update Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
        const user = {
            name : req.body.firstname +" "+ req.body.lastname,
            //img : req.body.img
        }
        console.log(user.name);
        var sql = "UPDATE user_signup SET About = " +mysql.escape(req.body.about)+", City = "+mysql.escape(req.body.city)+
        ", Company ="+mysql.escape(req.body.company)+", School ="+mysql.escape(req.body.school)+", Hometown ="
        +mysql.escape(req.body.hometown)+ ", Languages ="+mysql.escape(req.body.languages)+", Gender ="+mysql.escape(req.body.gender)+
        "where name ="+(mysql.escape(user.name)); //search query
        console.log(sql);
        
        pool.getConnection(function(err, con) {
            if (err) {
              res.writeHead(400, {
                "Content-Type": "text/plain"
              });
              res.end("Could Not Get Connection Object");
            } else {
                con.query(sql, function (err, result) {
                  if (err) throw err;
 
                  res.writeHead(200,{
                    'Content-Type' : 'application/json'
                });
                console.log(err);
                console.log(result);
                console.log("User type updated to owner");
                res.end(JSON.stringify(result))
 
                });
 
                //------------------------------------------------------------------
 }})
});

 app.post('/userdisplay',function(req,res){
    console.log("Inside User Display Post Request");
    console.log("Req Body : ",req.body);
        const user = {
            email : req.body.email,
            //img : req.body.img
        }
    var sql = "SELECT * FROM user_signup WHERE email='"+user.email+"';"; //search query
    //console.log("Req Body : ", username + "password : ",password);
    console.log(sql);
    pool.getConnection(function(err, con) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could Not Get Connection Object");
        } else{
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("No of Properties Found : ",result.length)
      //User=[]  //Nullifying the value of Properties array
        res.writeHead(200,{
        'Content-Type' : 'application/json'
            });
            console.log(result)
            res.end(JSON.stringify(result))
      //console.log(User);
 
    });
}
                //------------------------------------------------------------------
 })
});


app.get('/results', function(req,res){    console.log("Results found");  
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(properties))
})


app.post('/displayprop',function(req,res){
    console.log("Inside Property Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
        const user = {
            propertyname : req.body.propertyname,
            img : req.body.img
        }
        var sql = "SELECT * FROM property WHERE name='"+user.propertyname+"';"; //search query
        console.log(sql);
        pool.getConnection(function(err,con){
            if(err){console.log(err);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Could Not Get Connection Object");
            }else{
                con.query(sql, function (err, result) {
                  if (err) throw err;
                  res.writeHead (200, {
                      'Content-type' :'application/json'
                  });
                  //console.log("No of Properties Found : ",result.length)
                 
                        res.end(JSON.stringify(result));
                    
                 // console.log("Results are :",result);
                  //console.log(JSON.stringify(result));
                });
            }
                  
                });
            
           
});


app.post('/listproperty',function(req,res){
    console.log("Inside List your property");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
        const user = {
            name : req.body.name,
            owner:req.body.owner,
            location : req.body.location,
            checkin : req.body.checkin,
            checkout : req.body.checkout,
            guests : req.body.guests,
            description : req.body.description,
            type:req.body.type,
            descriptionprop:req.body.descriptionprop,
            bedrooms:req.body.bedrooms,
            bathrooms:req.body.bathrooms,
            amenities: req.body.amenities,
            price : req.body.price
        }
        console.log(user.description);
        var sql = "INSERT INTO property (name, owner, location, datein, dateout,guests,description,bednumber,bathrooms,amenities,price,type,message,img) VALUES ( '"+ user.name+ "','"+user.owner+"','"+ user.location + "','" + user.checkin + "','" +user.checkout +"','"+user.guests+"','"+user.descriptionprop+"','"+user.bedrooms+"','"+user.bathrooms+"','"+user.amenities+"','"+user.price+"','"+user.type+"','"+user.description+"','"+user.description+"');";
        console.log("sql query :",sql);
        pool.getConnection(function(err,con){
            if(err){console.log(err);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Could Not Get Connection Object");
            }else{
                con.query(sql, function (err, result) {
                    console.log("result :",result)  
                  if (err){
                    //throw err;
                    console.log("error message :",err.sqlMessage)
                    res.end("400")
                  } 
                  else{
                    console.log("Property Added");
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("200");
                  }
                });
            }
                });     
});

app.post('/booking',function(req,res){
    console.log("Inside Booking Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
        const user = {
            customer:req.body.customername,
            name : req.body.propertyname,
            checkin : req.body.startdate,
            checkout : req.body.enddate,
            guests : req.body.guests,
            price: req.body.totalprice
        }
        console.log(user.description);
        var sql = "INSERT INTO Booking (Customer,name, price,checkin, checkout,guests) VALUES ( '"+ user.customer+ "','" + user.name + "','" +user.price+ "','" + user.checkin + "','" +user.checkout +"','"+user.guests+"');";
        console.log("sql query :",sql);
        pool.getConnection(function(err,con){
            if(err){console.log(err);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Could Not Get Connection Object");
            }else{
                con.query(sql, function (err, result) {
                    console.log("result :",result)  
                  if (err){
                    //throw err;
                    console.log("error message :",err.sqlMessage)
                    res.end("400")
                  } 
                  else{
                    console.log("Property Booked and added to booking table");
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("200");
                  }
                });
            }
                });     
});

app.post('/dashboard',function(req,res){
    console.log("Inside Dashboard Display Post Request");
    console.log("Req Body : ",req.body);
        const user = {
            username : req.body.username,
            //img : req.body.img
        }
    var sql0 = "SELECT type FROM user_signup WHERE email='"+user.username+"';"; //search query    
    var sql = "SELECT Property.Location,Booking.name,Property.img  FROM Booking inner join Property  WHERE customer='"+user.username+"' and Booking.name = Property.Name  limit 3;"; //search query
    var sql1 = "SELECT Location,img,Name as name FROM Property WHERE owner='"+user.username+"' limit 3;"; //search query
    //console.log("Req Body : ", username + "password : ",password);
    console.log(sql0);
    console.log(sql);
    console.log(sql1);
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql0, function (err, result0) {
        console.log(result0[0].type)
        
        if(result0[0].type==="traveler"){
            console.log("traveler"+result0)
            con.query(sql, function (err, result) {
                if (err) throw err;
                //console.log("No of Properties Found : ",result.length)
                //User=[]  //Nullifying the value of Properties array
                  res.writeHead(200,{
                  'Content-Type' : 'application/json'
                      });
                      console.log(result)
                      res.end(JSON.stringify(result))
                //console.log(User);
                
              });
        }else if(result0[0].type==="owner"){
            console.log("owner")
            con.query(sql1, function (err, result1) {
                if (err) throw err;
                //console.log("No of Properties Found : ",result.length)
                //User=[]  //Nullifying the value of Properties array
                  res.writeHead(200,{
                  'Content-Type' : 'application/json'
                      });
                      console.log(result1)
                      res.end(JSON.stringify(result1))
                //console.log(User);
                
              });  
        }
    })
}
});
    
                //------------------------------------------------------------------          
});

 

app.post('/upload', upload.array('selectedFile',4), (req, res) => {
    //console.log("Req : ",req);
    console.log("Res : Darryl",res.file);
    res.send();
});

module.exports = app;