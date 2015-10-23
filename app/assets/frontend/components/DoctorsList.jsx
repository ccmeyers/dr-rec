var React = require('react');
var Doctor = require('./Doctor.jsx');
var DoctorMap = require('./DoctorMap.jsx');
var DoctorDetails = require('./DoctorDetails.jsx');
var EditDoctor = require('./EditDoctor.jsx')

var DoctorsList = React.createClass({
  render: function() {
    var doctorDetails = this.props.doctors.map(function(doctor){
      return <DoctorDetails key={doctor.id} {...doctor}/>
    });
    var editDoctor = this.props.doctors.map(function(doctor){
      return <EditDoctor key={doctor.id} {...doctor}/>
    });
    var doctors = this.props.doctors.map(function(doctor){
      return <Doctor key={doctor.id} {...doctor}/>
    });
    return (
      <div className="">
        <div className="doctors-details row">
          {doctorDetails}
        </div>
        <div className="edit-form row">
          {editDoctor}
        </div>
        <div className="doctors-list row">
          <div className="col s6">
            <div className="">
              <div className="row">
                {doctors}
              </div>
            </div>
          </div>
          <div className="col s6 doctor-map">
            <DoctorMap doctors={this.props.doctors} />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = DoctorsList;
