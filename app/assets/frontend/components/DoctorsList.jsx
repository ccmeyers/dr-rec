var React = require('react');
var Doctor = require('./Doctor.jsx');

var DoctorsList = React.createClass({
  render: function() {
    var doctors = this.props.doctors.map(function(doctor){
      return <Doctor key={doctor.id} {...doctor}/>
    });
    return (
      <div className="container">
        <h4>List of Doctors</h4>
        <div className="row">
          {doctors}
        </div>
      </div>
    )
  }
});

module.exports = DoctorsList;
