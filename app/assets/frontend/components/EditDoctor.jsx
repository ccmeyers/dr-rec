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
      aetna_a3: this.props.aetna_a3,
      aetna_c1: this.props.aetna_c1,
      aetna_c3: this.props.aetna_c3,
      vision: this.props.vision,
      vision_plus: this.props.vision_plus,
      dental_plus: this.props.dental_plus,
      dental_dmo: this.props.dental_dmo,
      addressChanged: false
    }
  },
  componentDidMount: function() {
    var slug = this.state.specialty_slug;
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
    var aetna_a3 = this.state.aetna_a3;
    var aetna_c1 = this.state.aetna_c1;
    var aetna_c3 = this.state.aetna_c3;
    var vision = this.state.vision;
    var vision_plus = this.state.vision_plus;
    var dental_plus = this.state.dental_plus;
    var dental_dmo = this.state.dental_dmo;
    var drObjEdited = { id: id, first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: editedSpecialty, specialty_slug: editedSpecialtySlug, phone: phone, website: website, notes: notes, address: address, latitude: latitude, longitude: longitude, aetna_a3: aetna_a3, aetna_c1: aetna_c1, aetna_c3: aetna_c3, vision: vision, vision_plus: vision_plus, dental_plus: dental_plus, dental_dmo: dental_dmo };
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
              <div className="row medical" ref="aetnaA3">
                <h6 className="option-label">Accepts Red Antler Insurance -- AETNA A3?</h6>
                <input type="radio" defaultChecked={ this.state.aetna_a3 === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.aetna_a3 === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.aetna_a3 === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'maybe')}>I don't know</label>
              </div>
              <div className="row medical" ref="aetnaC1">
                <h6 className="option-label">Accepts Red Antler Insurance -- AETNA C1?</h6>
                <input type="radio" defaultChecked={ this.state.aetna_c1 === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.aetna_c1 === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.aetna_c1 === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'maybe')}>I don't know</label>
              </div>
              <div className="row medical" ref="aetnaC3">
                <h6 className="option-label">Accepts Red Antler Insurance -- AETNA C3?</h6>
                <input type="radio" defaultChecked={ this.state.aetna_c3 === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.aetna_c3 === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.aetna_c3 === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'medical', 'maybe')}>I don't know</label>
              </div>
              <div className="row dental" ref="dentalPlus">
                <h6 className="option-label">Accepts Red Antler Insurance -- DENTAL +?</h6>
                <input type="radio" defaultChecked={ this.state.dental_plus === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalPlus', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.dental_plus === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalPlus', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.dental_plus === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalPlus', 'maybe')}>I don't know</label>
              </div>
              <div className="row dental" ref="dentalDMO">
                <h6 className="option-label">Accepts Red Antler Insurance -- DENTAL DMO?</h6>
                <input type="radio" defaultChecked={ this.state.dental_dmo === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalDMO', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.dental_dmo === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalDMO', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.dental_dmo === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'dentalDMO', 'maybe')}>I don't know</label>
              </div>
              <div className="row vision" ref="visionPlus">
                <h6 className="option-label">Accepts Red Antler Insurance -- VISION +?</h6>
                <input type="radio" defaultChecked={ this.state.vision_plus === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.vision_plus === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.vision_plus === 'maybe' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'maybe')}>I don't know</label>
              </div>
              <div className="row vision" ref="vision">
                <h6 className="option-label">Accepts Red Antler Insurance -- VISION?</h6>
                <input type="radio" defaultChecked={ this.state.vision === 'yes' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'yes')}>Yes</label>
                <input type="radio" defaultChecked={ this.state.vision === 'no' ? 'checked' : '' } />
                <label onClick={this.editCoverage.bind(this, 'vision', 'no')}>No</label>
                <input type="radio" defaultChecked={ this.state.vision === 'maybe' ? 'checked' : '' } />
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
