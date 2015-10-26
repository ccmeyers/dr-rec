var API = require('../API.jsx');

var DoctorActions = {
  getAllDoctors() {
    API.getAllDoctors();
  },
  sendDoc(drObj) {
    API.createDoctor(drObj);
  },
  updateDoc(drObjEdited) {
    API.updateDoctor(drObjEdited);
  },
  upvote(newVote) {
    API.upvote(newVote);
  },
  deleteDoc(doctorId) {
    API.deleteDoctor(doctorId);
  }
};

module.exports = DoctorActions;
