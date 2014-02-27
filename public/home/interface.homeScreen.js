/** @jsx React.DOM */
var homeScreen = React.createClass({
   handleClick: function(e){

//       $.ajax({
//           url: "/createBox",
//           data: { name: $('.box-name').val() }
//       });

       homePageRouter.navigate("/createBox", {trigger: true });
   },
   findBox: function(){
       homePageRouter.navigate("/findBox", {trigger: true });
   },
   render: function(){
       return(
            <div className="vertical-center">
                <button className="center width-80 common-vertical-space" onClick={this.handleClick}>Create Box</button>
                <button className="center width-80" onClick={this.findBox}>Find Box</button>
            </div>
       );
   }
});

