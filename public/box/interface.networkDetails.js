/** @jsx React.DOM */
var networkDetails = React.createClass({
   addEvent: function(){
       var reference = this.props.item.reference;
       var summary = "This is just a test event";
       var url = 'https://maps.googleapis.com/maps/api/place/' +
           'event/add/json?sensor=false' +
           '&key=AIzaSyCTe-g_b5LuoztqQUwandQg_MzInChHtqI';

       var data =  {
           summary: "This is a test event",
           reference: reference,
           duration: 1500,
           language: "EN-CA"
       };

       $.ajax({
           type: "POST",
           url: '/createEvent',
           data: data,
           success: function(result){
               console.log("result of post request is");
               console.log(result);
           }
       });
   },
   updateState: function(event, data){
       console.log("The network details for");
       this.props.item = data;
       console.log(data);
   },
   componentWillMount: function(){
     $(document).on("showBoxDetails", this.updateState);
   },
   componentWillUnmount: function(){
     $(document).unbind("showBoxDetails");
   },
   render: function(){
       return(
         <div>
             <div>Network Details</div>
             <button onClick={this.addEvent}>Add Event</button>
         </div>
       );
   }
});