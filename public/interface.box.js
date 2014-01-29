/** @jsx React.DOM */
var box = React.createClass({
    render: function() {
        return(
            <div className="box-content">
                <container />
                <inputBox />
            </div>
        );
    }
});

React.renderComponent(<box/>,document.getElementById("box"));
