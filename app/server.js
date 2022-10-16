const express = require("express");
require("dotenv").config();
const hbs = require("hbs");
const path = require("path");


// use app express
const app = express();
app.use(express.urlencoded({extended:true}));
app.set("view engine","hbs");
app.set("views" , path.join(__dirname,"../frontend/views"));
hbs.registerPartials(path.join(__dirname,"../frontend/layouts"))
app.use(express.static(path.join(__dirname,"../frontend/public")));

// use userRoutes 
const taskRoutes = require("./routes/user.routes");
app.use(taskRoutes)
app.all("*", (req,res)=> res.render("error404" , {pageTitle:"page not Found"}));


module.exports = app;