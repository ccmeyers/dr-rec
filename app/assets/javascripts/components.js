var React = require('react');

var Main = require('../frontend/main.jsx');

$(document).ready(function() {
  React.render(<Main />, document.getElementById('react'));
});
