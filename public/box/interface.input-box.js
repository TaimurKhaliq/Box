/** @jsx React.DOM */
var inputBox = React.createClass({
    value: "",
    handleKeyPress: function(e) {
        var code = e.keyCode || e.which;
        if(code === 13) { //Enter keycode
            $(document).trigger("commentAdded", [e.target.value ]);
        }
    },
    openCommentMenu: function() {
        $(document).trigger("openCommentMenu");
    },
    render: function() {
        return(
            <div>
                <button className="width-20 input-tab">+</button>
                <input type="text" className="width-80 text-input" onKeyPress={this.handleKeyPress}></input>
            </div>
        );
    }
});
