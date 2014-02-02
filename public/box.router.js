/** @jsx React.DOM */
var router = Backbone.Router.extend({

   routes: {
    "": "home",
    "createBox": "createBox",
    "box/:id": "box"
   },

   home: function() {
    alert("You are on the home page");
   },

   createBox: function() {
       React.renderComponent(<box />,document.getElementById("box"));
   },

   box: function(id) {
     alert("You are trying to view a box");
   }
});

var approuter = new router();

Backbone.history.start({pushState: true});
