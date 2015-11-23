var React = require('react');
var Upvote = require('./Upvote.jsx')
var DeleteDoctor = require('./DeleteDoctor.jsx')

var DoctorDetails = React.createClass({
  componentDidMount: function() {
    var medical = this.refs.medical.getDOMNode();
    var dentalppo = this.refs.dentalppo.getDOMNode();
    var dentaldhmo = this.refs.dentaldhmo.getDOMNode();
    var vision = this.refs.vision.getDOMNode();

    if (this.props.specialty_slug === 'dentist') {
      $(medical).hide();
      $(vision).hide();
    } else if (this.props.specialty_slug === 'eye-doctor') {
      $(medical).hide();
      $(dentalppo).hide();
      $(dentaldhmo).hide();
    } else {
      $(dentalppo).hide();
      $(dentaldhmo).hide();
      $(vision).hide();
    }
  },
  toggleEditForm: function() {
    var doctorId = this.props.id,
        doctorDetailsCard = this.refs.doctorDetailsCard.getDOMNode(),
        editDoctorFormId = "#edit-" + doctorId;
    $(doctorDetailsCard).removeClass('shown').addClass('hidden');
    setTimeout(function(){
      $(editDoctorFormId).addClass('shown');
    }, 300);
  },
  closeDetails: function() {
    var doctorDetailsCard = this.refs.doctorDetailsCard.getDOMNode();
    $(doctorDetailsCard).removeClass('shown').addClass('hidden');
  },
  render: function() {
    var detailsId = "details-"+this.props.id;
    var editId = "edit-"+this.props.id;
    var rawWebsite = this.props.website;
    var websiteUrl = rawWebsite.includes('http://') || rawWebsite.includes('https://') ? rawWebsite : "http://"+rawWebsite;

    return (
      <div className="doctor-details-card col s12 hidden" id={detailsId} ref="doctorDetailsCard">
        <div className="close" onClick={this.closeDetails}>
          <div className="line1"></div>
          <div className="line2"></div>
        </div>
        <div className="col s6">
          <h5 className="name">{this.props.first_name} {this.props.last_name}</h5>
          <h6 className="practice">{this.props.practice_name}</h6>
          <h6 className="specialty">{this.props.specialty}</h6>
          <a href={websiteUrl} target="_blank"><h6 className="website">{rawWebsite}</h6></a>
          <h6 className="phone">{this.props.phone}</h6>
          <h6 className="address">{this.props.address}</h6>
          <Upvote upvotes={this.props.upvotes} id={this.props.id} doctorCreatedBy={this.props.user_id} />
        </div>
        <div className="col s6">
          <h6>Takes Red Antler Insurance?</h6>
          <h6 className="coverage" ref="medical"><label>AETNA SILVER OA EPO 2000:</label> {this.props.aetna_oaepo_silver_2000} </h6>
          <h6 className="coverage" ref="dentalppo"><label>GUARDIAN DENTAL PPO:</label> {this.props.guardian_ppo} </h6>
          <h6 className="coverage" ref="dentaldhmo"><label>GUARDIAN DENTAL DHMO:</label> {this.props.guardian_dhmo} </h6>
          <h6 className="coverage" ref="vision"><label>EYEMED VISION PPO:</label> {this.props.eyemed_ppo} </h6>
          <p className="notes"><label>Notes: </label>{this.props.notes}</p>
          <div className="edit-toggle" onClick={this.toggleEditForm}>Edit</div>
          <DeleteDoctor id={this.props.id}/>
        </div>
      </div>
    )
  }
});

module.exports = DoctorDetails;
