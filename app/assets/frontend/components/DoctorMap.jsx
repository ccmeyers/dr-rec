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
    console.log('clicking ', key);
  },
  _onChildMouseEnter: function(key, childProps) {
    console.log('key', key);
    console.log('childProps', childProps);
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
