/** @jsx React.DOM */
var card = React.createClass({

    render: function(){
        return(
            <div className="card">
                <div className="card-image-container">
                    <img />
                </div>
                <div className="card-description">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                    <span>{this.props.price}</p>
                </div>
            </div>
        );
    }
});
