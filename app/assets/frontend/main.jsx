var React = require('react');
var Header = require('./components/Header.jsx');
var AddDoc = require('./components/AddDoc.jsx');
var DoctorsList = require('./components/DoctorsList.jsx');

var Main = React.createClass({
  getInitialState: function(){
    return {
      doctorsList: []
    }
  },
  addDoc: function(docToAdd){
    $.ajax({
      type: 'POST',
      url: '/doctors',
      data: docToAdd,
      success:function(savedDoc) {
        var newList = this.state.doctorsList;
        newList.unshift(savedDoc);
        this.setState({ doctorsList: newList });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    $.ajax({
      url:'/doctors',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({doctorsList: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return (
      <div>
        <Header />
        <AddDoc addDoctor={this.addDoc} />
        <DoctorsList doctors={this.state.doctorsList} />
      </div>
    )
  }
});

module.exports = Main;
