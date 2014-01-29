/** @jsx React.DOM */
var navbar = React.createClass({
    render: function() {
        var boxTitle = "Test title";
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

React.renderComponent(<navbar/>, document.getElementById("navbar"));
