var API = require('../API.jsx');

var DoctorActions = {
  getAllDoctors() {
    API.getAllDoctors();
  }
};

module.exports = DoctorActions;
