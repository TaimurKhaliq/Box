/** @jsx React.DOM */
var inputBox = React.createClass({
    addComment: function () {

    },
    render: function() {
        return(
            <div className="box-input">
                <textarea>Please fill an input</textarea>
                <button onClick={this.addComment}>Enter</button>
            </div>
        );
    }
});
