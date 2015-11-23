var React = require('react');
var DoctorActions = require('../actions/DoctorActions.jsx');


var Upvote = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.id,
      upvotes: this.props.upvotes,
      doctorCreatedBy: this.props.doctorCreatedBy
    }
  },
  handleUpvote: function(e) {
    e.preventDefault();
    var newVote = {
      id: this.state.id,
      num: this.state.upvotes + 1
    }
    this.setState({ upvotes: newVote.num });
    DoctorActions.upvote(newVote);
    var thumb = this.refs.currentUpvotes.getDOMNode();
    $(thumb).show();
  },
  componentDidMount: function() {
    if (this.props.upvotes === 0) {
      var thumb = this.refs.currentUpvotes.getDOMNode();
      $(thumb).hide();
    }
    if (this.state.doctorCreatedBy === $('div[data-user-id]').data().userId) {
      var upvoteCta = this.refs.upvoteCta.getDOMNode();
      $(upvoteCta).hide();
    }
  },
  render: function() {
    return (
      <div className="upvote">
        <div className="current-upvotes" ref="currentUpvotes">
          <svg className="thumbs-up" xmlns="http://www.w3.org/2000/svg" width="40px" height="35.799px" viewBox="280.995 296.595 50 45.799"><path fill="#4E00FF" d="M330.984,321.158c-0.111-1.714-1.116-3.182-2.555-3.983c0.331-0.726,0.487-1.542,0.428-2.39
          	c-0.178-2.562-2.374-4.569-5.002-4.569h-8.446c0.092-0.976,0.214-2.353,0.358-4.207c0.526-6.784-3.342-9.082-5.458-9.348
          	c-0.267-0.034-0.56-0.065-0.903-0.065c-1.695,0-3.106,0.791-4.081,2.288c-0.657,1.012-0.613,2.24-0.562,3.661
          	c0.083,2.313,0.199,5.48-2.633,9.097c-2.353,3.003-4.408,4.195-5.71,4.669c-0.21-0.712-0.859-1.233-1.639-1.233h-12.07
          	c-0.948,0-1.717,0.769-1.717,1.717v23.883c0,0.948,0.769,1.717,1.717,1.717h12.071c0.948,0,1.717-0.769,1.717-1.717v-2.286
          	l0.816,0.003c0.959,0.664,2.084,1.015,3.25,1.015h19.717c3.372,0,6.115-2.744,6.115-6.115v-0.85
          	c1.672-0.799,2.829-2.505,2.829-4.476c0-0.822-0.201-1.599-0.557-2.281c0.36-0.224,0.692-0.497,0.986-0.811
          	C330.589,323.881,331.074,322.526,330.984,321.158z M293.066,338.96h-8.635v-20.448h8.635v18.157V338.96z M327.15,322.528
          	c-0.292,0.311-0.687,0.482-1.113,0.482h-1.357h-0.412h-5.687c-0.948,0-1.717,0.769-1.717,1.717s0.769,1.717,1.717,1.717h5.687
          	c0.84,0,1.523,0.684,1.523,1.524s-0.684,1.523-1.523,1.523h-5.687c-0.948,0-1.717,0.769-1.717,1.717
          	c0,0.948,0.769,1.717,1.717,1.717h4.382v0.367c0,1.478-1.202,2.68-2.681,2.68h-19.717c-0.464,0-0.913-0.14-1.297-0.406
          	c-0.584-0.404-1.27-0.617-1.98-0.617H296.5v-15.086c1.876-0.437,4.983-1.824,8.335-6.105c3.605-4.604,3.454-8.819,3.363-11.337
          	c-0.022-0.625-0.054-1.479,0.009-1.665c0.392-0.602,0.764-0.725,1.201-0.725c0.183,0,0.344,0.022,0.468,0.037
          	c0.117,0.017,2.871,0.49,2.469,5.676c-0.328,4.24-0.539,5.96-0.542,5.977c-0.061,0.489,0.091,0.979,0.418,1.349
          	c0.325,0.37,0.795,0.581,1.286,0.581h10.351c0.817,0,1.523,0.616,1.577,1.372c0.047,0.685-0.371,1.292-1.007,1.505h-5.844
          	c-0.948,0-1.717,0.769-1.717,1.717c0,0.948,0.769,1.717,1.717,1.717h6.097h1.248c0.85,0,1.58,0.637,1.633,1.42
          	C327.586,321.811,327.44,322.218,327.15,322.528z"/>
          </svg>
          <div className="upvote-num">({this.props.upvotes})</div>
        </div>
        <a href="" onClick={this.handleUpvote} ref="upvoteCta">Upvote This Doctor</a>
      </div>
    )
  }
});

module.exports = Upvote;
