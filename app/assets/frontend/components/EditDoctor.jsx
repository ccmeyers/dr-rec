var React = require('react');
var SpecialtySelect = require('./SpecialtySelect.jsx');

var EditDoctor = React.createClass({
  getInitialState: function() {
    return {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      practice_name: this.props.practice_name,
      specialty: this.props.specialty,
      specialty_slug: this.props.specialty_slug,
      phone: this.props.phone,
      website: this.props.website,
      notes: this.props.notes,
      address: this.props.address,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      addressChanged: false,
      specialtyChanged: false
    }
  },
  editFirstName: function() {
    this.setState({first_name: this.refs.firstName.getDOMNode().value});
  },
  editLastName: function() {
    this.setState({first_name: this.refs.lastName.getDOMNode().value});
  },
  editPractice: function() {
    this.setState({first_name: this.refs.practiceName.getDOMNode().value});
  },
  editPhone: function() {
    this.setState({first_name: this.refs.phone.getDOMNode().value});
  },
  editWebsite: function() {
    this.setState({first_name: this.refs.website.getDOMNode().value});
  },
  editNotes: function() {
    this.setState({first_name: this.refs.notes.getDOMNode().value});
  },
  editAddress: function() {
    this.setState({addressChanged: true});
  },
  changeSpecialty: function() {
    this.setState({specialtyChanged: true});
  },
  startEditDoctor: function() {
    var that = this;

    if (this.state.addressChanged === true) {
      var address = this.refs.address.getDOMNode().value;
      that.getLatLng(address);
    }
    if (this.state.specialtyChanged === true) {

    }
  },
  getLatLng: function(address) {
    var that = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
        that.setState({ latitude: results[0].geometry.location.lat() });
        that.setState({ longitude: results[0].geometry.location.lng() });
        that.finishAddDoctor();
        that.closeForm();
     }
     else {
        console.log("Geocoding failed: " + status);
     }
    });
  },
  finishEditDoctor: function() {
    var first_name = this.state.first_name;
    var last_name = this.state.last_name;
    var practice_name = this.state.practice_name;
    // var addedSpecialty = this.state.sentSpecialty;
    // var addedSpecialtySlug = this.state.specialtySlug;
    var phone = this.state.phone;
    var website = this.state.website;
    var notes = this.state.notes;
    var address = this.state.address
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    var drObj = { first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: addedSpecialty, specialty_slug: addedSpecialtySlug, phone: phone, website: website, notes: notes, address: address, latitude: latitude, longitude: longitude };
    DoctorActions.updateDoc(drObj);
  },
  closeForm: function() {
    var doctorId = this.props.id,
        doctorDetailsId = "#details-"+ doctorId,
        editDoctorFormId = "#edit-" + doctorId;
    $(editDoctorFormId).fadeOut();
    $(doctorDetailsId).fadeIn();
  },


  render: function() {
    var doctorId = this.props.id,
        editDoctorId = "edit-" + doctorId;

    return (
      <div className="edit-doctor" >
        <form onSubmit={this.startEditDoctor} id={editDoctorId}>
          <div className="row">
            <div className="input_field col s6">
              <input placeholder="First Name" ref="firstName" type="text" className="validate" defaultValue={this.props.first_name} onChange={this.editFirstName}/>
            </div>
            <div className="input-field col s6">
              <input placeholder="Last Name" ref="lastName" type="text" className="validate" defaultValue={this.props.last_name} onChange={this.editLastName} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Name of Practice" ref="practiceName" type="text" className="validate" defaultValue={this.props.practice_name} onChange={this.editPractice} />
            </div>
            <div className="input-field col s6">
              <SpecialtySelect sendSpecialty={this.editSpecialty} defaultSpecialty={this.props.specialty} onChange={this.changeSpecialty} />
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <input placeholder="Phone" ref="phone" type="tel" className="validate" defaultValue={this.props.phone} onChange={this.editPhone} />
            </div>
            <div className="col s6">
              <input placeholder="Website" ref="website" type="text" className="validate" defaultValue={this.props.website} onChange={this.editWebsite} />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <input placeholder="Address" ref="address" type="text" className="validate" defaultValue={this.props.address} onChange={this.editAddress} />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <textarea placeholder="Notes" ref="notes" type="textarea" className="validate materialize-textarea" defaultValue={this.props.notes} onChange={this.editNotes} />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button type='submit' className='btn right'>Submit</button>
              <div className='btn right cancel' onClick={this.closeForm}>Cancel</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = EditDoctor;
