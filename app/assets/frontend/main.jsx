var React = require('react');
var Header = require('./components/Header.jsx');
var Hero = require('./components/Hero.jsx');
var AddDoc = require('./components/AddDoc.jsx');
var DoctorsList = require('./components/DoctorsList.jsx');
var DoctorStore = require('./stores/DoctorStore.jsx');
var UpvoteStore = require('./stores/UpvoteStore.jsx');
var DoctorMap = require('./components/DoctorMap.jsx');
var FilterSelect = require('./components/FilterSelect.jsx');
var DoctorActions = require('./actions/DoctorActions.jsx');

var Main = React.createClass({
  getInitialState: function(){
    return {
      doctorsList: DoctorStore.getAll(),
      upvotes: UpvoteStore.getAll()
    }
  },
  componentDidMount: function() {
    DoctorActions.getAllDoctors();
    DoctorStore.addChangeListener(this._onChange);
    DoctorActions.getAllUpvotes();
    UpvoteStore.addChangeListener(this._onChange);
    this.hideAlreadyUpvoted();
  },
  hideAlreadyUpvoted: function() {
    var that = this;
    var alreadyUpvoted = this.state.upvotes;
    if (alreadyUpvoted.length > 0) {
      var idArray = [];
      alreadyUpvoted.forEach(function(obj) {
        var doctorId = obj.doctor_id
        $('#details-'+doctorId+' .upvote a').addClass('disable').append("<i>You've already upvoted this doctor</i>");
      });
    } else {
      setTimeout(that.hideAlreadyUpvoted, 1000);
    }
  },
  componentWillUnmount: function() {
    DoctorStore.removeChangeListener(this._onChange);
    UpvoteStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      doctorsList: DoctorStore.getAll(),
      upvotes: UpvoteStore.getAll()
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
      $('.clear-filters').removeClass('visible');
    } else {
      $('.doctor-details-card.shown').removeClass('shown').addClass('hidden');
      var doctorsToShow = [];
      $('.doctor-card').each(function() {
        if ($(this).hasClass(specialtySlug)) {
          doctorsToShow.push($(this));
        } else {
          $(this).hide();
        }
      });
      if (doctorsToShow.length > 0) {
        $('.no-doctors').text('');
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
        <Hero />
        <div className="container">
          <div className="row">
            <FilterSelect  filterSpecialty={this.filterSpecialty}/>
            <AddDoc />
          </div>
          <DoctorsList doctors={this.state.doctorsList} />
        </div>
      </div>
    )
  }
});

module.exports = Main;
