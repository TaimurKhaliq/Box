/** @jsx React.DOM */
var eventItem = React.createClass({
    render: function() {
        return (
            <li className="box-item" key={this.props.event.event_id}>
                <span>{this.props.event.summary}</span>
            </li>
        );
    }
});
