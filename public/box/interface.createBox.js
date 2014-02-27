/** @jsx React.DOM */
var createBox = React.createClass({
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

    handleClick: function() {
        homePageRouter.navigate("/openBox", {trigger: true});
        var node = this.refs.boxName.getDomNode().val();
    },

    componentWillUnmount: function() {
        $(document).unbind("commentAdded");
    },

    render: function() {
        return(
            <div className="box-content">
                <div className="name-input"><p>Box Name</p><input type="text" ref="boxName"></input></div>
                <div className="name-input"><p>Tags</p><input type="text"></input></div>
                <button className="center full-width" onClick={this.handleClick}>Launch</button>
            </div>
        );
    }
});

