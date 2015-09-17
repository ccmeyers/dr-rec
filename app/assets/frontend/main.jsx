var React = require('react');
var Header = require('./components/Header.jsx');
var AddDoc = require('./components/AddDoc.jsx');
var DoctorsList = require('./components/DoctorsList.jsx');
var DoctorStore = require('./stores/DoctorStore.jsx');

var DoctorActions = require('./actions/DoctorActions.jsx');

var Main = React.createClass({
  getInitialState: function(){
    return {
      doctorsList: DoctorStore.getAll()
    }
  },
  addDoc: function(docToAdd){
    // $.ajax({
    //   type: 'POST',
    //   url: '/doctors',
    //   data: docToAdd,
    //   success:function(savedDoc) {
    //     var newList = this.state.doctorsList;
    //     newList.unshift(savedDoc);
    //     this.setState({ doctorsList: newList });
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },
  componentDidMount: function() {
    DoctorActions.getAllDoctors();
    DoctorStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    DoctorStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      doctorsList: DoctorStore.getAll()
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
