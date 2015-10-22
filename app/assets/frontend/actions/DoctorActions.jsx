var API = require('../API.jsx');

var DoctorActions = {
  getAllDoctors() {
    API.getAllDoctors();
  },
  sendDoc(drObj) {
    API.createDoctor(drObj);
  },
  deleteDoc(doctorId) {
    API.deleteDoctor(doctorId);
  }
};

module.exports = DoctorActions;
