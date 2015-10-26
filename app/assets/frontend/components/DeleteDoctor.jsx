var React = require('react');
var DoctorActions = require('../actions/DoctorActions.jsx');

var DeleteDoctor = React.createClass({
  handleDelete: function(e) {
    e.preventDefault();
    var doctorId = this.props.id;
    DoctorActions.deleteDoc(doctorId);
  },
  render: function() {
    return (
      <a href="" onClick={this.handleDelete}>Delete</a>
    )
  }
});

module.exports = DeleteDoctor;
