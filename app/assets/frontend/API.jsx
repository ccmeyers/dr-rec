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
  getAllUpvotes() {
    $.ajax({
      type: 'GET',
      url:'/upvotes',
      success: function(rawUpvotes) {
        ServerActions.receivedUpvotes(rawUpvotes);
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
  updateDoctor(drObjEdited) {
    $.ajax({
      type: 'PUT',
      url:'/doctors/'+ drObjEdited.id,
      data: drObjEdited,
      success: function(rawDoctor) {
        ServerActions.editedOneDoctor(rawDoctor);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  upvote(newVote) {
    $.ajax({
      type: 'PUT',
      url:'/doctors/'+ newVote.id,
      data: newVote,
      success: function(rawDoctor) {
        ServerActions.editedOneDoctor(rawDoctor);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteDoctor(doctorId) {
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
