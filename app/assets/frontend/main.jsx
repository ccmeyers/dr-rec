var React = require('react');
var Header = require('./components/Header.jsx');
var AddDoc = require('./components/AddDoc.jsx');
var DoctorsList = require('./components/DoctorsList.jsx');

var mockDrs = [
  { id: 1, first_name: 'Bob', last_name: 'Smith', practice_name: 'Smith and Assoc', specialty: 'Optometry' },
  { id: 2, first_name: 'Alice', last_name: 'Jones', practice_name: 'Jones and Assoc', specialty: 'OBGYN' },
  { id: 3, first_name: 'Carol', last_name: 'White', practice_name: 'White and Assoc', specialty: 'Dentist' }
];

var Main = React.createClass({
  getInitialState: function(){
    return {
      doctorsList: mockDrs
    }
  },
  addDoc: function(docToAdd){
    var newList = this.state.doctorsList;
    newList.unshift(docToAdd);
    this.setState({ doctorsList: newList });
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
