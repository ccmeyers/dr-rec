var React = require('react');
var DoctorActions = require('../actions/DoctorActions.jsx');

var AddDoc = React.createClass({
  addDoctor: function(event) {
    event.preventDefault();
    var first_name = this.refs.firstName.getDOMNode().value;
    var last_name = this.refs.lastName.getDOMNode().value;
    var practice_name = this.refs.practiceName.getDOMNode().value;
    var specialty = this.refs.specialty.getDOMNode().value;
    var drObj = { id: Date.now(), first_name: first_name, last_name: last_name, practice_name: practice_name, specialty: specialty };
    DoctorActions.sendDoc(drObj);
    this.refs.firstName.getDOMNode().value = '';
    this.refs.lastName.getDOMNode().value = '';
    this.refs.practiceName.getDOMNode().value = '';
    this.refs.specialty.getDOMNode().value = '';
  },
  render: function() {
    return (
      <div className="container">
        <h5>Add a Recommendation</h5>
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
              <input placeholder="Specialty" ref="specialty" type="text" className="validate" />
            </div>
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
