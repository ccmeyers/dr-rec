var React = require('react');
var matchHeight = require('jquery-match-height');

var Doctor = React.createClass({
  componentDidMount: function() {
    $('.doctor-card').matchHeight();
  },
  handleOnMouseEnter: function() {
    var markerId = this.props.id;
    var selectedMarker = document.querySelector('#marker-'+markerId);
    selectedMarker.classList.add('active');
  },
  handleOnMouseLeave: function() {
    var markerId = this.props.id;
    var selectedMarker = document.querySelector('#marker-'+markerId);
    selectedMarker.classList.remove('active');
  },
  handleClick: function() {
    var doctorId = this.props.id,
        detailsId = "#details-"+doctorId;
    if ($(detailsId).hasClass('shown')) {
      $(detailsId).removeClass('shown').addClass('hidden');
    } else if ($(detailsId).siblings().hasClass('shown')) {
      $('.shown').removeClass('shown').addClass('hidden');
      setTimeout(function(){
        $(detailsId).removeClass('hidden').addClass('shown');
      }, 400);
    } else {
      $(detailsId).removeClass('hidden').addClass('shown');
    }
  },
  render: function() {
    var fullClassName = "col s6 doctor-card " + this.props.specialty_slug;
    return (
      <div className={fullClassName} id={this.props.id} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} onClick={this.handleClick}>
        <h5 className="name">{this.props.first_name} {this.props.last_name}</h5>
        <h6 className="specialty">{this.props.specialty}</h6>
      </div>
    )
  }
});

module.exports = Doctor;
