var React = require('react');
var Upvote = require('./Upvote.jsx')
var DeleteDoctor = require('./DeleteDoctor.jsx')

var DoctorDetails = React.createClass({
  toggleEditForm: function() {
    var doctorId = this.props.id,
        doctorDetailsId = "#details-"+ doctorId,
        editDoctorFormId = "#edit-" + doctorId;
    $(doctorDetailsId).removeClass('shown').addClass('hidden');
    setTimeout(function(){
      $(editDoctorFormId).addClass('shown');
    }, 300);
  },
  render: function() {
    var detailsId = "details-"+this.props.id;
    var editId = "edit-"+this.props.id;
    var rawWebsite = this.props.website;
    var websiteUrl = rawWebsite.includes('http://') || rawWebsite.includes('https://') ? rawWebsite : "http://"+rawWebsite;

    return (
      <div className="doctor-details-card col s12 hidden" id={detailsId}>
        <div className="col s6">
          <h5 className="name">{this.props.first_name} {this.props.last_name}</h5>
          <h6 className="practice">{this.props.practice_name}</h6>
          <h6 className="specialty">{this.props.specialty}</h6>
          <a href={websiteUrl} target="_blank"><h6 className="website">{rawWebsite}</h6></a>
          <h6 className="phone">{this.props.phone}</h6>
          <h6 className="address">{this.props.address}</h6>
          <Upvote upvotes={this.props.upvotes} id={this.props.id} />
        </div>
        <div className="col s6">
          <p className="notes">Notes: {this.props.notes}</p>
          <div className="edit-toggle" onClick={this.toggleEditForm}>Edit</div>
          <DeleteDoctor id={this.props.id}/>
        </div>
      </div>
    )
  }
});

module.exports = DoctorDetails;
