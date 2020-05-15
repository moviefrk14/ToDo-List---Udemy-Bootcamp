// jshint esversion:6

const express = require("express");
const bodyParser  = require("body-parser");

const app = express();
let items = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
// Use the public directory for static things like CSS stylesheets and javascript pages.

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){

  let today = new Date();
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list" ,{kindOfDay: day, newListItems: items});

});

app.post("/", function(req, res){

  // newItem is related to name of the input you want. Has to be exact.
  let item = req.body.newItem;
  items.push(item);

  res.redirect("/");
});




app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
