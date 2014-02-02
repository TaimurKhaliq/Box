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
            <div className="box-input">
                <textarea onKeyPress={this.handleKeyPress}></textarea>
                <span onClick={this.openCommentMenu}>+ arrow</span>
            </div>
        );
    }
});
