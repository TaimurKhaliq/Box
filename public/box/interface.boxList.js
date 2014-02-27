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
        var items = this.state.places.map(function(item){
            console.log(item);
            var photoUrl = "";
            if (item.photos && item.photos.length > 0) {
                photoUrl = item.photos[0].getUrl({
                    'maxWidth': 75,
                    'maxHeight': 50
                });
            }
            return (
                <li className="box-item" key={item.id} onClick={this.openNetwork}>
                    <img src={photoUrl} />
                    <span>{item.name}</span>
                </li>
            );
        });

        return (
            <div>
                <button className="searchBoxButton" onClick={this.findNearByPlaces}>Find Nearby Places</button>
                <ul className="box-list">
                    {items}
                </ul>
                <div id="google-places">
                </div>
            </div>
        );
    }
});