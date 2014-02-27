/** @jsx React.DOM */
var homePageRouter = Backbone.Router.extend({

   routes: {
    "": "home",
    "createBox": "createBox",
    "openBox": "openBox",
    "findBox": "findBox"
   },

   home: function() {
       React.renderComponent(<homeScreen />, document.getElementById("appContent"));
   },

   createBox: function() {
       React.renderComponent(<createBox />, document.getElementById("appContent"));
   },

   findBox: function(id) {
       React.renderComponent(<boxList />, document.getElementById("appContent"));
   },

   openBox: function(data){
       React.renderComponent(<box />, document.getElementById("appContent"), function(){
           $(document).trigger("openBox", {data: node});
       });
   }
});

var homePageRouter = new homePageRouter();
Backbone.history.start();
homePageRouter.navigate("/home", {trigger: true});


