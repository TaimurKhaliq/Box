/** @jsx React.DOM */
var box = React.createClass({
    getInitialState: function() {
        return {
            items : []
        };
    },

    componentDidMount: function() {
        var self = this;
        $(document).on('commentAdded', function(event, param){
            self.state.items.push(param); // adding the new text to events
            socket.emit('commentAdded', param);
            self.setState({items: self.state.items});
        });
    },

    componentWillUnmount: function() {
        $(document).unbind("commentAdded");
    },

    render: function() {
        return(
            <div className="box-content">
                <container items={this.state.items} />
                <inputBox />
            </div>
        );
    }
});

