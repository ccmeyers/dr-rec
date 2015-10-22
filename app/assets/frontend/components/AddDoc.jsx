var React = require('react');
var DoctorActions = require('../actions/DoctorActions.jsx');
var SpecialtySelect = require('./SpecialtySelect.jsx');

var AddDoc = React.createClass({
  getInitialState: function() {
    return {
      sentSpecialty: '',
      specialtySlug: '',
      latitude: '',
      longitude: ''
    }
  },
  addSpecialty: function(specialty, slug) {
    this.setState({ sentSpecialty: specialty, specialtySlug: slug });
  },
  addDoctor: function(event) {
    event.preventDefault();

    var address = this.refs.address.getDOMNode().value;
    this.getLatLng(address);

  },
  getLatLng: function(address) {
    var that = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
        that.setState({ latitude: results[0].geometry.location.lat() });
        that.setState({ longitude: results[0].geometry.location.lng() });
        that.finishAddDoctor();
        that.toggleForm();
     }
     else {
        console.log("Geocoding failed: " + status);
     }
    });
  },
  finishAddDoctor: function() {
    var first_name = this.refs.firstName.getDOMNode().value;
    var last_name = this.refs.lastName.getDOMNode().value;
    var practice_name = this.refs.practiceName.getDOMNode().value;
    var addedSpecialty = this.state.sentSpecialty;
    var addedSpecialtySlug = this.state.specialtySlug;
    var phone = this.refs.phone.getDOMNode().value;
    var website = this.refs.website.getDOMNode().value;
    var notes = this.refs.notes.getDOMNode().value;
    var address = this.refs.address.getDOMNode().value;
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    var drObj = { id: Date.now(), first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: addedSpecialty, specialtySlug: addedSpecialtySlug, phone: phone, website: website, notes: notes, address: address, latitude: latitude, longitude: longitude };
    console.log('drObj', drObj);
    DoctorActions.sendDoc(drObj);
    this.refs.firstName.getDOMNode().value = '';
    this.refs.lastName.getDOMNode().value = '';
    this.refs.practiceName.getDOMNode().value = '';
    this.refs.address.getDOMNode().value = '';
    this.refs.phone.getDOMNode().value = '';
    this.refs.website.getDOMNode().value = '';
    this.refs.notes.getDOMNode().value = '';
  },
  toggleForm: function() {
    $('form').slideToggle();
  },
  render: function() {
    return (
      <div className="">
        <div className="row">
          <div className="col s6 offset-s6">
            <h5 id="form-header" onClick={this.toggleForm}>Add a Recommendation</h5>
          </div>
        </div>
        <form onSubmit={this.addDoctor}>
          <div className="row">
            <div className="input_field col s6">
              <input placeholder="First Name" ref="firstName" type="text" className="validate" />
            </div>
            <div className="input-field col s6">
              <input placeholder="Last Name" ref="lastName" type="text" className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Name of Practice" ref="practiceName" type="text" className="validate" />
            </div>
            <div className="input-field col s6">
              <SpecialtySelect sendSpecialty={this.addSpecialty}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <input placeholder="Phone" ref="phone" type="tel" className="validate" />
            </div>
            <div className="col s6">
              <input placeholder="Website" ref="website" type="text" className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <input placeholder="Address" ref="address" type="text" className="validate" />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <textarea placeholder="Notes" ref="notes" type="textarea" className="validate materialize-textarea" />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button type='submit' className='btn right'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = AddDoc;
