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
    if (specialtySlug === 'clear') {
      $('.no-doctors').text('');
      $('.doctor-card').show();
      var markers = document.getElementsByClassName('marker');
      [].forEach.call(markers, function(marker) {
        marker.style.display = ""
      });
      $('.clear-filters').hide();
    } else {
      var doctorsToShow = [];
      $('.doctor-card').each(function() {
        if ($(this).hasClass(specialtySlug)) {
          doctorsToShow.push($(this));
        } else {
          $(this).hide();
        }
      });
      if (doctorsToShow.length > 0) {
        doctorsToShow.forEach(function(card) {
          card.show();
        });
      } else {
        $('.no-doctors').text('There are no doctors for this specialty.');
      }
      var markers = document.getElementsByClassName('marker');
      [].forEach.call(markers, function(marker) {
        if (marker.classList.contains(specialtySlug)) {
          marker.style.display = ""
        } else {
          marker.style.display = "none"
        }
      });
    }
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
