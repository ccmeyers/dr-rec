var React = require('react');
var DoctorActions = require('../actions/DoctorActions.jsx');
var SpecialtySelect = require('./SpecialtySelect.jsx');

var AddDoc = React.createClass({
  getInitialState: function() {
    return {
      sentSpecialty: '',
      specialtySlug: '',
      latitude: '',
      longitude: '',
      aetna_a3: '',
      aetna_c1: '',
      aetna_c3: '',
      vision: '',
      vision_plus: '',
      dental_dmo: '',
      dental_plus: ''
    }
  },
  addSpecialty: function(specialty, slug) {
    this.setState({ sentSpecialty: specialty, specialtySlug: slug });
    this.swapCoverageInputs(slug);
  },
  swapCoverageInputs: function(slug) {
    var dentalPlus = this.refs.dentalPlus.getDOMNode(),
        dentalDMO = this.refs.dentalDMO.getDOMNode(),
        aetnaA3 = this.refs.aetnaA3.getDOMNode(),
        aetnaC1 = this.refs.aetnaC1.getDOMNode(),
        aetnaC3 = this.refs.aetnaC3.getDOMNode(),
        vision = this.refs.vision.getDOMNode(),
        visionPlus = this.refs.visionPlus.getDOMNode();
    if (slug === 'dentist') {
      $(aetnaA3).hide();
      $(aetnaC1).hide();
      $(aetnaC3).hide();
      $(vision).hide();
      $(visionPlus).hide();
      $(dentalPlus).show();
      $(dentalDMO).show();
    } else if (slug === 'eye-doctor') {
      $(aetnaA3).hide();
      $(aetnaC1).hide();
      $(aetnaC3).hide();
      $(dentalPlus).hide();
      $(dentalDMO).hide();
      $(vision).show();
      $(visionPlus).show();
    } else {
      $(vision).hide();
      $(visionPlus).hide();
      $(dentalPlus).hide();
      $(dentalDMO).hide();
      $(aetnaA3).show();
      $(aetnaC1).show();
      $(aetnaC3).show();
    }
  },
  addCoverage: function(coverage, ans, e) {
    var that = this;
    $(e.target).siblings('input:checked').prop('checked', false);
    $(e.target).prev('input').prop('checked', true);
    if (coverage === 'aetnaA3') {
      that.setState({ aetna_a3: ans });
    } else if (coverage === 'aetnaC1') {
      that.setState({ aetna_c1: ans });
    } else if (coverage === 'aetnaC3') {
      that.setState({ aetna_c3: ans });
    } else if (coverage === 'dentalPlus') {
      that.setState({ dental_plus: ans });
    } else if (coverage === 'dentalDMO') {
      that.setState({ dental_dmo: ans });
    } else if (coverage === 'vision') {
      that.setState({ vision: ans });
    } else if (coverage === 'visionPlus') {
      that.setState({ vision_plus: ans });
    }
  },
  startAddDoctor: function(event) {
    event.preventDefault();

    var first_name = this.refs.firstName.getDOMNode();
    var first_name_value = first_name.value;
    var last_name = this.refs.lastName.getDOMNode();
    var last_name_value = last_name.value;
    var address = this.refs.address.getDOMNode();
    var address_value = address.value;

    if (first_name_value === '' || last_name_value === '' || address_value === '' || this.state.sentSpecialty === '') {
      $('.error-msg').text('Please fill out required fields.').addClass('error');
      if (first_name_value === '') {
        $(first_name).addClass('error');
      }
      if (last_name_value === '') {
        $(last_name).addClass('error');
      }
      if (address_value === '') {
        $(address).addClass('error');
      }
      if (this.state.sentSpecialty === '') {
        $('.add-doctor .Dropdown-control').addClass('error');
      }
    } else {
      this.getLatLng(address_value);
      $('.error-msg').text('* = required').removeClass('error');
      $(first_name).removeClass('error');
      $(last_name).removeClass('error');
      $(address).removeClass('error');
      $('.add-doctor .Dropdown-control').removeClass('error');
    }
  },
  getLatLng: function(address_value) {
    var that = this;
    var address = this.refs.address.getDOMNode();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address_value }, function (results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
      that.setState({ latitude: results[0].geometry.location.lat() });
      that.setState({ longitude: results[0].geometry.location.lng() });
      that.finishAddDoctor();
      that.toggleForm();
     }
     else {
      $('.error-msg').text('Please enter a valid address.').addClass('error');
      $(address).addClass('error');
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
    var aetna_a3 = this.state.aetna_a3;
    var aetna_c1 = this.state.aetna_c1;
    var aetna_c3 = this.state.aetna_c3;
    var vision = this.state.vision;
    var vision_plus = this.state.vision_plus;
    var dentalPlus = this.state.dentalPlus;
    var dental_dmo = this.state.dental_dmo;
    var drObj = { first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: addedSpecialty, specialty_slug: addedSpecialtySlug, phone: phone, website: website, notes: notes, address: address, latitude: latitude, longitude: longitude, aetna_a3: aetna_a3, aetna_c1: aetna_c1, aetna_c3: aetna_c3, vision: vision, vision_plus: vision_plus, dentalPlus: dentalPlus, dental_dmo: dental_dmo };
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
    $('.add-doctor form').slideToggle();
  },
  render: function() {
    return (
      <div className="add-doctor">
        <div className="col s4 offset-s2">
          <h5 id="form-header" onClick={this.toggleForm}><figure>+ </figure> Add a Recommendation</h5>
        </div>
        <div className="col s12">
          <form onSubmit={this.startAddDoctor}>
            <div className="row">
              <div className="input_field col s6">
                <input placeholder="First Name *" ref="firstName" type="text" className="validate" />
              </div>
              <div className="input-field col s6">
                <input placeholder="Last Name *" ref="lastName" type="text" className="validate" />
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
              <div className="col s6">
                <input placeholder="Address *" ref="address" type="text" className="validate" />
              </div>
              <div className="col s6 health-coverage">
                <div className="row medical" ref="aetnaA3">
                  <h6 className="option-label">Accepts Red Antler Insurance -- AETNA A3?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaA3', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaA3', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaA3', 'maybe')}>I don't know</label>
                </div>
                <div className="row medical" ref="aetnaC1">
                  <h6 className="option-label">Accepts Red Antler Insurance -- AETNA C1?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaC1', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaC1', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaC1', 'maybe')}>I don't know</label>
                </div>
                <div className="row medical" ref="aetnaC3">
                  <h6 className="option-label">Accepts Red Antler Insurance -- AETNA C3?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaC3', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaC3', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'aetnaC3', 'maybe')}>I don't know</label>
                </div>
                <div className="row dental" ref="dentalPlus">
                  <h6 className="option-label">Accepts Red Antler Insurance -- DENTAL +?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalPlus', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalPlus', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalPlus', 'maybe')}>I don't know</label>
                </div>
                <div className="row dental" ref="dentalDMO">
                  <h6 className="option-label">Accepts Red Antler Insurance -- DENTAL DMO?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalDMO', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalDMO', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalDMO', 'maybe')}>I don't know</label>
                </div>
                <div className="row vision" ref="visionPlus">
                  <h6 className="option-label">Accepts Red Antler Insurance -- VISION +?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'visionPlus', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'visionPlus', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'visionPlus', 'maybe')}>I don't know</label>
                </div>
                <div className="row vision" ref="vision">
                  <h6 className="option-label">Accepts Red Antler Insurance -- VISION?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'vision', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'vision', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'vision', 'maybe')}>I don't know</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <textarea placeholder="Notes" ref="notes" type="textarea" className="validate materialize-textarea" />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <label className="error-msg">* = required</label>
                <button type='submit' className='btn right'>Submit</button>
                <div className='btn right cancel' onClick={this.toggleForm}>Cancel</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = AddDoc;
