/** @jsx React.DOM */
var box = React.createClass({
   getInitialState: function(){
        return {
            box: ""
        }
   },

   componentDidMount: function(){
     var self = this;
     $(document).on("openBox", function(event, param){
        var boxData = param;
         console.log(param);
        self.setState({box: param.data});
     });
   },

   componentWillUnmount: function(){
     $(document).unbind("openBox");
   },

   render: function(){
       return (
           <div>
               <h1> {this.state.box} </h1>
               <inputBox />
           </div>
       );
   }
});