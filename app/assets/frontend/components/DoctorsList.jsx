var React = require('react');
var Doctor = require('./Doctor.jsx');
var DoctorMap = require('./DoctorMap.jsx');

var DoctorsList = React.createClass({
  render: function() {
    var doctors = this.props.doctors.map(function(doctor){
      return <Doctor key={doctor.id} {...doctor}/>
    });
    return (
      <div className="row">
        <div className="col s6">
          <div className="">
            <h4>List of Doctors</h4>
            <div className="row">
              {doctors}
            </div>
          </div>
        </div>
        <div className="col s6 doctor-map">
          <DoctorMap doctors={this.props.doctors} />
        </div>
      </div>
    )
  }
});

module.exports = DoctorsList;
