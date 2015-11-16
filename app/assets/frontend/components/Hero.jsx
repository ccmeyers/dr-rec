var React = require('react');

var Hero = React.createClass({
  render: function() {
    return (
      <div className="hero">
        <div className="container">
          <h1>Keep those antlers healthy.</h1>
          <h6>Find and share great doctors in our health plans with your fellow Antlerists.</h6>
          <h6>All recommendations are always anonymous.</h6>
        </div>
      </div>
    )
  }
});

module.exports = Hero;
