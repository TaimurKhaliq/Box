/** @jsx React.DOM */
var networkDetails = React.createClass({
   getInitialState: function(){
       return {
           events : []
       }
   },
   addEvent: function(){
       var reference = this.props.item.reference;
       var summaryNode =  this.refs.summary.getDOMNode();
       var summary = $(summaryNode).val();
       if (summary === "") {
           summary = "there is no summary";
       }

       var data =  {
           summary: summary,
           reference: reference,
           duration: 3000,
           language: "EN-CA"
       };

       this.sendAddEventRequest(data).done(this.handleResponse);
   },
   componentDidMount: function() {
       $(document).on("showBoxDetails", this.updateState);
   },
   sendAddEventRequest: function(data) {
       return $.ajax({
           type: "GET",
           url: '/createEvent',
           data: data
       });
   },
   getDetails: function(reference){
       var ref = reference;
       return $.ajax({
           type: "GET",
           url: '/getDetails',
           data: {
               reference: ref
           }
       });
   },

   handleResponse: function(response) {
       if (response && response.result.events && response.result.events.length > 0) {
           this.setState({
               events: response.result.events
           });
       }
   },

   updateState: function(event, data){
       var reference = data.reference;
       this.props.item = data;
       this.getDetails(reference).done(this.handleResponse);
   },

   componentWillUnmount: function(){
     $(document).unbind("showBoxDetails");
   },
   render: function(){
       if (this.state.events.length > 0){
           var events = this.state.events.map(function(event){
               return (<eventItem event={event} />);
           });
       }
       return(
         <div>
             <ul>
                {events}
             </ul>
             <input type="text" className="summary" ref="summary"></input>
             <button onClick={this.addEvent}>Add Event</button>
         </div>
       );
   }
});