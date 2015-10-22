var React = require('react');
var GoogleMap = require('google-map-react');
var RAMarker = require('./RAMarker.jsx');
var Marker = require('./Marker.jsx');

var DoctorMap = React.createClass({
  getInitialState: function() {
    return {
      defaultProps: {
        center: [40.704102, -73.986588],
        zoom: 11
      }
    }
  },
  _onChildClick: function(key, childProps) {
    var doctorId = key,
        detailsId = "#details-"+doctorId;
    if ($(detailsId).hasClass('down')) {
      $(detailsId).slideUp().removeClass('down');
    } else {
      $('.down').slideUp().removeClass('down');
      $(detailsId).slideDown().addClass('down');
    }
  },
  _onChildMouseEnter: function(key, childProps) {
    $('.doctor-card#'+key).addClass('active');
  },
  _onChildMouseLeave: function(key, childProps) {
    $('.doctor-card#'+key).removeClass('active');
  },
  _distanceToMouse: function(markerPos, mousePos, markerProps) {
    var x = markerPos.x;
    var y = markerPos.y - 15;
    return Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
  },
  render: function() {
    var markers = this.props.doctors.map(function(doctor){
      return (
        <Marker
          specialtySlug = {doctor.specialty_slug}
          id={doctor.id}
          key={doctor.id}
          lat={doctor.latitude}
          lng={doctor.longitude}
         />
      )
    });
    return (
      <GoogleMap
        center={this.state.defaultProps.center}
        zoom={this.state.defaultProps.zoom}
        onChildClick={this._onChildClick}
        onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave}
        hoverDistance={13}
        distanceToMouse={this._distanceToMouse}
        >
        <RAMarker lat={40.704102} lng={-73.986588} />
        {markers}
      </GoogleMap>
    )
  }
});

module.exports = DoctorMap;
