/** @jsx React.DOM */
var navbar = React.createClass({
    render: function() {
        var boxTitle = "";
        return(
            <div>
                <span className="nav-title">
                    {boxTitle}
                </span>
                <span className="nav-menu-button">
                    Menu
                </span>
            </div>
        );
    }
});
