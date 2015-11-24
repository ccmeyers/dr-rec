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
      aetna_oaepo_silver_2000: '',
      eyemed_ppo: '',
      guardian_ppo: '',
      guardian_dhmo: ''
    }
  },
  addSpecialty: function(specialty, slug) {
    this.setState({ sentSpecialty: specialty, specialtySlug: slug });
    this.swapCoverageInputs(slug);
  },
  swapCoverageInputs: function(slug) {
    var dentalPPO = this.refs.dentalPPO.getDOMNode(),
        dentalDHMO = this.refs.dentalDHMO.getDOMNode(),
        medicalRow = this.refs.medical.getDOMNode(),
        visionRow = this.refs.vision.getDOMNode();
    if (slug === 'dentist') {
      $(medicalRow).hide();
      $(visionRow).hide();
      $(dentalPPO).show();
      $(dentalDHMO).show();
    } else if (slug === 'eye-doctor') {
      $(medicalRow).hide();
      $(dentalPPO).hide();
      $(dentalDHMO).hide();
      $(visionRow).show();
    } else {
      $(visionRow).hide();
      $(dentalPPO).hide();
      $(dentalDHMO).hide();
      $(medicalRow).show();
    }
  },
  addCoverage: function(coverage, ans, e) {
    var that = this;
    $(e.target).siblings('input:checked').prop('checked', false);
    $(e.target).prev('input').prop('checked', true);
    if (coverage === 'medical') {
      that.setState({ aetna_oaepo_silver_2000: ans });
    } else if (coverage === 'dentalPPO') {
      that.setState({ guardian_ppo: ans });
    } else if (coverage === 'dentalDHMO') {
      that.setState({ guardian_dhmo: ans });
    } else if (coverage === 'vision') {
      that.setState({ eyemed_ppo: ans });
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
      console.log("Geocoding failed: " + status);
      $('.error-msg').text('Please enter a valid address.').addClass('error');
      $(address).addClass('error');
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
    var aetna_oaepo_silver_2000 = this.state.aetna_oaepo_silver_2000;
    var eyemed_ppo = this.state.eyemed_ppo;
    var guardian_ppo = this.state.guardian_ppo;
    var guardian_dhmo = this.state.guardian_dhmo;
    var drObj = { first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: addedSpecialty, specialty_slug: addedSpecialtySlug, phone: phone, website: website, notes: notes, address: address, latitude: latitude, longitude: longitude, aetna_oaepo_silver_2000: aetna_oaepo_silver_2000, eyemed_ppo: eyemed_ppo, guardian_ppo: guardian_ppo, guardian_dhmo: guardian_dhmo };
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
                <div className="row medical" ref="medical">
                  <h6 className="option-label">Accepts Red Antler Insurance -- AETNA SILVER OA EPO 2000?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'medical', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'medical', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'medical', 'maybe')}>I don't know</label>
                </div>
                <div className="row dental" ref="dentalPPO">
                  <h6 className="option-label">Accepts Red Antler Insurance -- GUARDIAN DENTAL PPO?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalPPO', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalPPO', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalPPO', 'maybe')}>I don't know</label>
                </div>
                <div className="row dental" ref="dentalDHMO">
                  <h6 className="option-label">Accepts Red Antler Insurance -- GUARDIAN DENTAL DHMO?</h6>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalDHMO', 'yes')}>Yes</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalDHMO', 'no')}>No</label>
                  <input type="radio" />
                  <label onClick={this.addCoverage.bind(this, 'dentalDHMO', 'maybe')}>I don't know</label>
                </div>
                <div className="row vision" ref="vision">
                  <h6 className="option-label">Accepts Red Antler Insurance -- EYEMED VISION PPO?</h6>
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
