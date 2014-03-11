/** @jsx React.DOM */

var navbar = React.createClass({

    getInitialState: function(){
      return {
        screenSize: '',
        screenName: "Home",
        subNav: false,
        subNavItems: [],
        appFlyout: true,
        contextFlyout: false,
        searchAvailable: true,
        notificationVisible: true,
        items: [],
        contextItems: []
      }
    },

    setScreenSize: function(){
        var smallScreenTest = window.matchMedia("screen and (min-width: 320px)");
        var mediumScreenTest = window.matchMedia("screen and (min-width: 768px)");
        var largeScreenTest = window.matchMedia("screen and (min-width: 1224px");
        var screenSize = "";

        if (smallScreenTest.matches){
            screenSize = "small";
        } else if (mediumScreenTest.matches) {
            screenSize = "medium";
        } else if (largeScreenTest.matches) {
            screenSize = "large";
        } else {
            screenSize = "small";
        }

        this.setState({
            screenSize: screenSize
        });
    },

    handleStateSwitch: function(obj){
        this.setState({
            screenName: obj.screenName,
            items: obj.items,
            contextItems: obj.contextItems
        })
    },

    componentWillMount: function(){
       this.setScreenSize();
       Box.on('navBarChange', this.handleStateSwitch);
       Box.on('navBarClose', this.toggleFlyout);
    },

    toggleFlyout: function() {
        var flyOut =  this.refs.appFlyout.getDOMNode();
        var body = $(flyOut);
        if(body.hasClass("flyout")){
            body.removeClass('flyout');
            body.addClass('flyin');
        } else if (body.hasClass('flyin')) {
            body.removeClass('flyin');
            body.addClass('flyout');
        } else {
            body.addClass('flyout');
        }
    },

    toggleContextFlyout: function(){
        var flyOut =  $(this.refs.contextFlyout.getDOMNode());
        if(flyOut.hasClass("ctx-flyout")){
            flyOut.removeClass('ctx-flyout');
            flyOut.addClass('ctx-flyin');
        } else if (flyOut.hasClass('ctx-flyin')) {
            flyOut.removeClass('ctx-flyin');
            flyOut.addClass('ctx-flyout');
        } else {
            flyOut.addClass('ctx-flyout');
        }
    },

    render: function() {
        var cx = React.addons.classSet;

        var classes = cx({
            'flyOutTrigger': this.state.appFlyout,
            'hidden' : !this.state.appFlyout,
            'navBar': true
        });

        var items = this.state.items.map(function(item){
            return (
            <li className="navbar-item" onClick={item.callback}>
                <div className="blueBarMenu"></div>
                <div className="redBarMenu"></div>
                <div className="greenBarMenu"></div>
                <span>{item.name}</span>
            </li>);
        });


        //
        // The context items are components
        //
        var contextItems = this.state.contextItems.map(function(item){
           return(
             <li className="navbar-item" onClick={item.callback}>
                 <div className="blueBarMenu"></div>
                 <div className="redBarMenu"></div>
                 <div className="greenBarMenu"></div>
                 {item.name}
             </li>
           );
        });

        return(
            <div className="navbar">
                <div className="MainBar">
                <button className={classes} onClick={this.toggleFlyout}></button>
                <ul className="flyOutList" ref="appFlyout">
                    {items}
                </ul>
                <span className="screen-title">{this.state.screenName}</span>
                <button className="flyOutTrigger rightContext" onClick={this.toggleContextFlyout}></button>
                <ul className="rightContextFlyoutList" ref="contextFlyout">
                    {contextItems}
                </ul>
                </div>
                <div className="subNav">
                <searchBox />
                </div>
            </div>
        );
    }
});

React.renderComponent(<navbar />, document.getElementById("navbar"));
