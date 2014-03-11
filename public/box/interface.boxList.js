/** @jsx React.DOM */
var boxList = React.createClass({
    navItems: [
        {
            name:'Home',
            callback: function(){
                Box.trigger("navBarClose");
                homePageRouter.navigate("/", {trigger: true });
            }
        },
        {
            name:'Box Item Two'
        },
        {
            name:'Box Item Three'
        }
    ],

    contextItems: [
        {
            name: 'Filter'
        }
    ],

    getInitialState: function(){
        return {
            longitude: '',
            latitude: '',
            places: []
        }
    },

    componentWillMount: function(){
        Box.trigger("navBarChange", {
            screenName: "Box List" ,
            items: this.navItems,
            contextItems: this.contextItems,
            subNav: true
        });
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