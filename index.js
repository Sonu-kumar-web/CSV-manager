const express = require("express");
const app = express();
const expressLayouts= require("express-ejs-layouts");
const port = 8000;
const db = require("./config/mongoose");

//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(expressLayouts);

// body parser for req.body
app.use(express.urlencoded({extended: true}));

//use assets folder
app.use(express.static('./assets'));

//make the uploads path avail to browser
app.use('/uploads', express.static(__dirname+'/uploads'));

//extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

//Server Listner
app.listen(port, function(err) {
  if (err) {
    console.log("Error Running the Server", err);
  }
  console.log("Server Running on Port: ", port);
});