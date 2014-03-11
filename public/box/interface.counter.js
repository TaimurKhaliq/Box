/** @jsx React.DOM */
var counter = React.createClass({
   getInitialState: function(){
       return {
           timeLeft: 10
       }
   },
   componentDidMount: function(){
     var self = this;
     setInterval(function(){
        var newTime = self.state.timeLeft - 1;
        self.setState({
            timeLeft: newTime
        });
     }, 1000);
   },
   render: function(){
       return (
         <div className="counter">{this.state.timeLeft}</div>
       );
   }
});
