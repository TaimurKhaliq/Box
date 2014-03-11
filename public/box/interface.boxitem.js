/** @jsx React.DOM */
var boxITEM = React.createClass({
    openNetwork: function(){
        homePageRouter.navigate("/openNetwork", {trigger: true });
        $(document).trigger("showBoxDetails", [this.props.item]);
        // send notification to admin server with
        var self = this;
        FB.api(
            "/me",
            function (response) {
                if (response && !response.error) {
                    console.log("You are this guy");
                    console.log(response);
                    /* handle the result */
                    var data = {
                        response: response,
                        item: self.props.item
                    };

                    $.ajax({
                        type: 'POST',
                        url: '/sendNotification',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(data)
                    });
                }
            }
        );
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
                    <div className="image-container">
                        <img src={photoUrl} />
                    </div>
                    <div className="metadata">
                        <span>{this.props.item.name}</span>
                        <div className="sub-info">Events 3</div>
                        <div className="sub-info">Customers 6</div>
                        <div className="sub-info">Deals 4</div>
                        <div className="blueBar"></div>
                        <div className="redBar"></div>
                        <div className="bar"></div>
                    </div>
            </li>
        );
    }
});
