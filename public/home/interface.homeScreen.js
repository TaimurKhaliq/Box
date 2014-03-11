/** @jsx React.DOM */
var homeScreen = React.createClass({
   componentWillMount: function(){
       Box.trigger("navBarChange", { screenName: "Home" , items: [] });
   },
   handleClick: function(e){
       homePageRouter.navigate("/createBox", {trigger: true });
   },
   findBox: function(){
       homePageRouter.navigate("/findBox", {trigger: true });
   },
   render: function(){
       return(
            <div>
                <div className="vertical-center">
                    <button className="center width-80 homeButton" onClick={this.findBox}>Find Box</button>
                </div>
            </div>
       );
   }
});

