var React = require('react');
var SpecialtySelect = require('./SpecialtySelect.jsx');
var DoctorActions = require('../actions/DoctorActions.jsx');

var EditDoctor = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.id,
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
      aetna_oaepo_silver_2000: this.props.aetna_oaepo_silver_2000,
      eyemed_ppo: this.props.eyemed_ppo,
      guardian_ppo: this.props.guardian_ppo,
      guardian_dhmo: this.props.guardian_dhmo,
      addressChanged: false
    }
  },
  componentDidMount: function() {
    var slug = this.state.specialty_slug;
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
  editFirstName: function() {
    this.setState({first_name: this.refs.firstName.getDOMNode().value});
  },
  editLastName: function() {
    this.setState({last_name: this.refs.lastName.getDOMNode().value});
  },
  editPractice: function() {
    this.setState({practice_name: this.refs.practiceName.getDOMNode().value});
  },
  editPhone: function() {
    this.setState({phone: this.refs.phone.getDOMNode().value});
  },
  editWebsite: function() {
    this.setState({website: this.refs.website.getDOMNode().value});
  },
  editNotes: function() {
    this.setState({notes: this.refs.notes.getDOMNode().value});
  },
  editAddress: function() {
    this.setState({addressChanged: true});
  },
  editSpecialty: function(specialty, slug) {
    this.setState({specialty: specialty, specialty_slug: slug});
    this.swapCoverageInputs(slug);
  },
  editCoverage: function(coverage, ans, e) {
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
  startEditDoctor: function(e) {
    e.preventDefault();
    var that = this;

    if (this.state.addressChanged === true) {
      var address = this.refs.address.getDOMNode().value;
      that.setState({address: address});
      that.getLatLng(address);
    } else {
      that.finishEditDoctor();
    }
  },
  getLatLng: function(address) {
    var that = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
        that.setState({ latitude: results[0].geometry.location.lat() });
        that.setState({ longitude: results[0].geometry.location.lng() });
        that.finishEditDoctor();
     }
     else {
        console.log("Geocoding failed: " + status);
     }
    });
  },
  finishEditDoctor: function() {
    var id = this.state.id;
    var first_name = this.state.first_name;
    var last_name = this.state.last_name;
    var practice_name = this.state.practice_name;
    var editedSpecialty = this.state.specialty;
    var editedSpecialtySlug = this.state.specialty_slug;
    var phone = this.state.phone;
    var website = this.state.website;
    var notes = this.state.notes;
    var address = this.state.address
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    var aetna_oaepo_silver_2000 = this.state.aetna_oaepo_silver_2000;
    var eyemed_ppo = this.state.eyemed_ppo;
    var guardian_ppo = this.state.guardian_ppo;
    var guardian_dhmo = this.state.guardian_dhmo;
    var drObjEdited = { id: id, first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: editedSpecialty, specialty_slug: editedSpecialtySlug, phone: phone, website: website, notes: notes, address: address, latitude: latitude, longitude: longitude, aetna_oaepo_silver_2000: aetna_oaepo_silver_2000, eyemed_ppo: eyemed_ppo, guardian_ppo: guardian_ppo, guardian_dhmo: guardian_dhmo };
    DoctorActions.updateDoc(drObjEdited);
    this.closeForm();
  },
  closeForm: function() {
    var doctorId = this.props.id,
        doctorDetailsId = "#details-"+ doctorId,
        editDoctorForm = this.refs.editDoctorForm.getDOMNode();
    $(editDoctorForm).removeClass('shown').addClass('hidden');
    setTimeout(function(){
      $(doctorDetailsId).removeClass('hidden').addClass('shown');
    }, 300);
  },

  render: function() {
    var doctorId = this.props.id,
        editDoctorId = "edit-" + doctorId;

    return (
      <div className="edit-doctor" >
        <form className="hidden" onSubmit={this.startEditDoctor} id={editDoctorId} ref="editDoctorForm">
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
              <SpecialtySelect sendSpecialty={this.editSpecialty} defaultSpecialty={this.props.specialty} defaultSpecialtySlug={this.props.specialty_slug} />
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
            <div className="col s6">
              <input placeholder="Address" ref="address" type="text" className="validate" defaultValue={this.props.address} onChange={this.editAddress} />
            </div>
            <div className="col s6 health-coverage">
              <div className="row medical" ref="medical">
                <h6 className="option-label">Accepts Red Antler Insurance -- AETNA SILVER OA EPO 2000?</h6>
                <input type="radio" defaultChecked={ this.state.aetna_oaepo_silver_2000 === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.aetna_oaepo_silver_2000 === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.aetna_oaepo_silver_2000 === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'maybe')}>I don't know</label>
              </div>
              <div className="row dental" ref="dentalPPO">
                <h6 className="option-label">Accepts Red Antler Insurance -- GUARDIAN DENTAL PPO?</h6>
                <input type="radio" defaultChecked={ this.state.guardian_ppo === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalPPO', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.guardian_ppo === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalPPO', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.guardian_ppo === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalPPO', 'maybe')}>I don't know</label>
              </div>
              <div className="row dental" ref="dentalDHMO">
                <h6 className="option-label">Accepts Red Antler Insurance -- GUARDIAN DENTAL DHMO?</h6>
                <input type="radio" defaultChecked={ this.state.guardian_dhmo === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalDHMO', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.guardian_dhmo === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalDHMO', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.guardian_dhmo === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalDHMO', 'maybe')}>I don't know</label>
              </div>
              <div className="row vision" ref="vision">
                <h6 className="option-label">Accepts Red Antler Insurance -- EYEMED VISION PPO?</h6>
                <input type="radio" defaultChecked={ this.state.eyemed_ppo === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.eyemed_ppo === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.eyemed_ppo === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'maybe')}>I don't know</label>
              </div>
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
