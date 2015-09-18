var React = require('react');
var matchHeight = require('jquery-match-height');

var Doctor = React.createClass({
  componentDidMount: function() {
    $('.doctor-card').matchHeight();
  },
  render: function() {
    return (
      <div className="col s6 doctor-card">
        <h5 className="name">{this.props.first_name} {this.props.last_name}</h5>
        <h6 className="practice">{this.props.practice_name}</h6>
        <h6 className="specialty">{this.props.specialty}</h6>
      </div>
    )
  }
});

module.exports = Doctor;
