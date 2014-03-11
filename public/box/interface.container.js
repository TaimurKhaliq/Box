/** @jsx React.DOM */
var container = React.createClass({

    render: function() {
        return(
            <div className="box-container black-border">
                <ul>
                    {this.props.items.map(function(item, i) {
                        return (
                            <div>{item}</div>
                        );
                    }, this)}
                </ul>
            </div>
        );
    }
});
