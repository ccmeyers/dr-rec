var React = require('react');
var Upvote = require('./Upvote.jsx')

var DoctorDetails = React.createClass({
  render: function() {
    var detailsId = "details-"+this.props.id;

    return (
      <div className="doctor-details-card col s12" id={detailsId}>
        <div className="col s6">
          <h5 className="name">{this.props.first_name} {this.props.last_name}</h5>
          <h6 className="practice">{this.props.practice_name}</h6>
          <h6 className="specialty">{this.props.specialty}</h6>
          <h6 className="website">{this.props.website}</h6>
          <h6 className="phone">{this.props.phone}</h6>
          <h6 className="address">{this.props.address}</h6>
          <Upvote upvotes={this.props.upvotes} id={this.props.id} />
        </div>
        <div className="col s6">
          <p className="notes">Notes: {this.props.notes}</p>
          <a href="">Edit</a>
          <a href="">Delete</a>
        </div>
      </div>
    )
  }
});

module.exports = DoctorDetails;
