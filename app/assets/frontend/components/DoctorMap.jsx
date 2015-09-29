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
  render: function() {
    var markers = this.props.doctors.map(function(doctor){
      return (
        <Marker
          key={doctor.id}
          lat={doctor.latitude}
          lng={doctor.longitude}
         />
      )
    });
    return (
      <GoogleMap
        center={this.state.defaultProps.center}
        zoom={this.state.defaultProps.zoom}>
        <RAMarker lat={40.704102} lng={-73.986588} />
        {markers}
      </GoogleMap>
    )
  }
});

module.exports = DoctorMap;
