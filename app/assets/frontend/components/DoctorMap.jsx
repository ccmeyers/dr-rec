var React = require('react');
var GoogleMap = require('google-map-react');
var RAMarker = require('./RAMarker.jsx');

var DoctorMap = React.createClass({
  getInitialState: function() {
    return {
      defaultProps: {
        center: [40.704102, -73.986588],
        zoom: 13
      }
    }
  },
  render: function() {
    return (
      <GoogleMap
        center={this.state.defaultProps.center}
        zoom={this.state.defaultProps.zoom}>
        <RAMarker lat={40.704102} lng={-73.986588} />
      </GoogleMap>
    )
  }
});

module.exports = DoctorMap;