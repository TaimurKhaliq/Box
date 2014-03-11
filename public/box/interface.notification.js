/** @jsx React.DOM */
var notification = React.createClass({
    getInitialState: function(){
      return {
          notifications: 0
      }
    },

    componentDidMount: function(){
        var self = this;
        socket.on('notificationReceived', function(data){
            console.log(data);
            self.addNotification();
        });
    },

    clearNotification: function(){
        this.setState({
            notifications: 0
        });
    },

    showNotifications: function() {
//        $()
//        homePageRouter.navigate("/showNotificationList", {trigger: true });
    },

    addNotification: function() {
        var notificationCount = this.state.notifications + 1;

        this.setState({
            notifications: notificationCount
        })
    },

    render: function() {
    return(
        <div className="notificationBox">
            <span onClick={this.clearNotification}>{this.state.notifications}</span>
        </div>
        );
}
});
