var ServerActions = require('./actions/ServerActions.jsx');

var API = {
  getAllDoctors() {
    $.ajax({
      type: 'GET',
      url:'/doctors',
      success: function(rawDoctors) {
        ServerActions.receivedDoctors(rawDoctors);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
};

module.exports = API;
