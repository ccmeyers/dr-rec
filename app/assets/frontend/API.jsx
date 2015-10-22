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
  },
  createDoctor(drObj) {
    $.ajax({
      type: 'POST',
      url:'/doctors',
      data: drObj,
      success: function(rawDoctor) {
        ServerActions.receivedOneDoctor(rawDoctor);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteDoctor(doctorId) {
    console.log('doctorId inside API', doctorId);
    $.ajax({
      type: 'DELETE',
      url: '/doctors/'+ doctorId,
      data: doctorId,
      success: function(doctorId) {
        ServerActions.deletedOneDoctor(doctorId);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
};

module.exports = API;
