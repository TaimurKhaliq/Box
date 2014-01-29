/** @jsx React.DOM */
var container = React.createClass({
    comments : ["test", "test2", "test3"],

    render: function() {
        return(
            <div className="box-container black-border">
                <ul>
                    {this.comments.map(function(item, i) {
                        return (
                            <div>{item}</div>
                        );
                    }, this)}
                </ul>
            </div>
        );
    }
});
