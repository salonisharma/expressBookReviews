const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const promise_routes = require('./router/asyncPromiseCalls.js').asyncPromiseCalls;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
//getting auth obj which is stored in the session
if(req.session.authorization) { 
    //retrieving the token from auth obj
        let token = req.session.authorization['accessToken']; 
         //verfy token
        jwt.verify(token, "access",(err,user)=>{
            if(!err){
                req.user = user;
                next(); //go to next middleware
            }
            else{
                return res.status(403).json({message: "User not authenticated"})
            }
         });
     } else {
         return res.status(403).json({message: "User not logged in"})
     }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);
app.use("/promise", promise_routes);

app.listen(PORT,()=>console.log("Server is running"));
