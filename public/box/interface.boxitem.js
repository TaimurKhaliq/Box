/** @jsx React.DOM */
var boxITEM = React.createClass({
    openNetwork: function(){
        homePageRouter.navigate("/openNetwork", {trigger: true });
        $(document).trigger("showBoxDetails", [this.props.item]);
    },

    render: function() {
        var photoUrl = "";
        if (this.props.item.photos && this.props.item.photos.length > 0) {
            photoUrl = this.props.item.photos[0].getUrl({
                'maxWidth': 75,
                'maxHeight': 75
            });
        }

        return (
            <li className="box-item" key={this.props.item.id} onClick={this.openNetwork}>
                <img src={photoUrl} />
                <span>{this.props.item.name}</span>
            </li>
        );
    }
});
