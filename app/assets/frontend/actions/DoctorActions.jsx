var API = require('../API.jsx');

var DoctorActions = {
  getAllDoctors() {
    API.getAllDoctors();
  },
  sendDoc(drObj) {
    API.createDoctor(drObj);
  }
};

module.exports = DoctorActions;
