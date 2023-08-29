const express = require("express");
const mongoose = require('mongoose');
const router = require("./routes/users");
const parser = require('body-parser');
const app = express();
const port = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/registDb",{useNewUrlParser:true},{useUnifiedTopology:true}).then(()=>{
    console.log('Connection is successful')
}).catch((err)=>{
    console.log(err);
})


app.set("view-engine","ejs");
app.set("views","./views")
// Middleware should come before importing routes
// Middleware
app.use(parser.json());
// to encode data we use this middleware
app.use(parser.urlencoded({
    extended: true
}))
// import routes
app.use('/',router);


app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`Server is running on ${port}`);
})