/** @jsx React.DOM */
var searchBox = React.createClass({
   getInitialState: function(){
     return {
         results: []
     }
   },
   componentDidMount: function(){
       var defaultBounds = new google.maps.LatLngBounds(
           new google.maps.LatLng(-33.8902, 151.1759),
           new google.maps.LatLng(-33.8474, 151.2631));

       var input =  this.refs.autocomplete.getDOMNode();

       var options = {
           bounds: defaultBounds,
           types: ['establishment']
       };

       autocomplete = new google.maps.places.Autocomplete(input, options);
   },
   render: function(){

       return (
        <div className="searchBox">
            <input type="text/area" val="Search" ref="autocomplete"></input>
        </div>
       );
   }
});