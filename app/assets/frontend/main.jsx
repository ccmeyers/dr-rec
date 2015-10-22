var React = require('react');
var Header = require('./components/Header.jsx');
var AddDoc = require('./components/AddDoc.jsx');
var DoctorsList = require('./components/DoctorsList.jsx');
var DoctorStore = require('./stores/DoctorStore.jsx');
var DoctorMap = require('./components/DoctorMap.jsx');
var FilterSelect = require('./components/FilterSelect.jsx');

var DoctorActions = require('./actions/DoctorActions.jsx');

var Main = React.createClass({
  getInitialState: function(){
    return {
      doctorsList: DoctorStore.getAll()
    }
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
  filterSpecialty: function(specialtySlug) {
    $('.doctor-card').each(function() {
      if ($(this).hasClass(specialtySlug)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    var markers = document.getElementsByClassName('marker');
    [].forEach.call(markers, function(marker) {
      if (marker.classList.contains(specialtySlug)) {
        marker.style.display = ""
      } else {
        marker.style.display = "none"
      }
    });

  },
  render: function(){
    return (
      <div>
        <Header />
        <div className="container">
          <AddDoc />
            <h4>List of Doctors</h4>
          <FilterSelect  filterSpecialty={this.filterSpecialty}/>
          <DoctorsList doctors={this.state.doctorsList} />
        </div>
      </div>
    )
  }
});

module.exports = Main;
