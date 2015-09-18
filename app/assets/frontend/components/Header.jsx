var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <div className="head">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h3>Recommend a Doctor to Fellow Antlerists</h3>
              <p>* all recommendations are anonymous</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Header;
