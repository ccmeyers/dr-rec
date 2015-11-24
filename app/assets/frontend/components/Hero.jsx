var React = require('react');

var Hero = React.createClass({
  render: function() {
    return (
      <div className="hero">
        <div className="container">
          <h1>DrRec Demo.</h1>
          <h6>This is a demo of an internal app I built with React, Flux, and Rails for company employees to recommend doctors to each other.</h6>
          <h6>The real app has an additional layer of authentication</h6>
        </div>
      </div>
    )
  }
});

module.exports = Hero;
