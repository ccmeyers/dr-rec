var React = require('react');

var Doctor = React.createClass({
  render: function() {
    return (
      <div className="col s3">
        <h5 className="name">{this.props.first_name} {this.props.last_name}</h5>
        <h6 className="practice">{this.props.practice_name}</h6>
        <h6 className="specialty">{this.props.specialty}</h6>
      </div>
    )
  }
});

module.exports = Doctor;
