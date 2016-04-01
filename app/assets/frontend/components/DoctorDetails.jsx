var React = require('react');
var Upvote = require('./Upvote.jsx')
var DeleteDoctor = require('./DeleteDoctor.jsx')

var DoctorDetails = React.createClass({
  componentDidMount: function() {
    var dentalPlus = this.refs.dentalPlus.getDOMNode(),
        dentalDMO = this.refs.dentalDMO.getDOMNode(),
        aetnaA3 = this.refs.aetnaA3.getDOMNode(),
        aetnaC1 = this.refs.aetnaC1.getDOMNode(),
        aetnaC3 = this.refs.aetnaC3.getDOMNode(),
        vision = this.refs.vision.getDOMNode(),
        visionPlus = this.refs.visionPlus.getDOMNode();

    if (this.props.specialty_slug === 'dentist') {
      $(aetnaA3).hide();
      $(aetnaC1).hide();
      $(aetnaC3).hide();
      $(vision).hide();
      $(visionPlus).hide();
    } else if (this.props.specialty_slug === 'eye-doctor') {
      $(aetnaA3).hide();
      $(aetnaC1).hide();
      $(aetnaC3).hide();
      $(dentalPlus).hide();
      $(dentalDMO).hide();
    } else {
      $(dentalPlus).hide();
      $(dentalDMO).hide();
      $(vision).hide();
      $(visionPlus).hide();
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
    console.log('props: ', this.props);
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
          <h6 className="coverage" ref="aetnaA3"><label>AETNA A3:</label> {this.props.aetna_a3} </h6>
          <h6 className="coverage" ref="aetnaC1"><label>AETNA C1:</label> {this.props.aetna_c1} </h6>
          <h6 className="coverage" ref="aetnaC3"><label>AETNA C3:</label> {this.props.aetna_c3} </h6>
          <h6 className="coverage" ref="dentalPlus"><label>DENTAL +:</label> {this.props.dental_plus} </h6>
          <h6 className="coverage" ref="dentalDMO"><label>DENTAL DMO:</label> {this.props.dental_dmo} </h6>
          <h6 className="coverage" ref="visionPlus"><label>VISION +:</label> {this.props.vision_plus} </h6>
          <h6 className="coverage" ref="vision"><label>VISION:</label> {this.props.vision} </h6>
          <p className="notes"><label>Notes: </label>{this.props.notes}</p>
          <div className="edit-toggle" onClick={this.toggleEditForm}>Edit</div>
          <DeleteDoctor id={this.props.id}/>
        </div>
      </div>
    )
  }
});

module.exports = DoctorDetails;
