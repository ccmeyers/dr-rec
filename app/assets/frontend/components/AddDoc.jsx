var React = require('react');
var DoctorActions = require('../actions/DoctorActions.jsx');
var SpecialtySelect = require('./SpecialtySelect.jsx');

var AddDoc = React.createClass({
  getInitialState: function() {
    return {
      sentSpecialty: '',
      latitude: '',
      longitude: ''
    }
  },
  addSpecialty: function(specialty) {
    this.setState({ sentSpecialty: specialty });
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
    var address = this.refs.address.getDOMNode().value;
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    var drObj = { id: Date.now(), first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: addedSpecialty, address: address, latitude: latitude, longitude: longitude };
    DoctorActions.sendDoc(drObj);
    this.refs.firstName.getDOMNode().value = '';
    this.refs.lastName.getDOMNode().value = '';
    this.refs.practiceName.getDOMNode().value = '';
    this.refs.address.getDOMNode().value = '';
  },
  toggleForm: function() {
    $('form').slideToggle();
  },
  render: function() {
    return (
      <div className="">
        <h5 id="form-header" onClick={this.toggleForm}>Add a Recommendation</h5>
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
            <input placeholder="Address" ref="address" type="text" className="validate" />
          </div>
          <div className="row">
            <button type='submit' className='btn right'>Submit</button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = AddDoc;
