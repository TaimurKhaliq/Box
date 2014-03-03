/** @jsx React.DOM */
var boxList = React.createClass({
    getInitialState: function(){
        return {
            longitude: '',
            latitude: '',
            places: []
        }
    },

    componentDidMount: function(){
        var self = this;
        if (navigator.geolocation)
        {
            var position = navigator.geolocation.getCurrentPosition(function(position){
                self.setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    places: []
                });
                self.findNearByPlaces();

            });
        }
    },

    updateState: function(data) {
      this.setState({places: data});
    },
    openNetwork: function(){
        homePageRouter.navigate("/openNetwork", {trigger: true });
    },

    findNearByPlaces: function(){
        var pyrmont = new google.maps.LatLng(this.state.latitude,this.state.longitude);

        var request = {
            location: pyrmont,
            radius: '500',
            types: ['store']
        };

        var service = new google.maps.places.PlacesService(document.getElementById('google-places'));
        service.nearbySearch(request, this.updateState);
    },

    render: function(){
        if (this.state.places.length > 0) {
            var items = this.state.places.map(function(item){
                return (<boxITEM item={item} />);
            });
        }

        return (
            <div>
                <ul className="box-list">
                {items}
                </ul>
            </div>
        );
    }
});