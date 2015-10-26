var AppDispatcher = require('../dispatcher.jsx');
var ActionTypes = require('../constants.jsx');

var ServerActions = {
  receivedDoctors(rawDoctors) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_DOCTORS,
      rawDoctors: rawDoctors
    })
  },
  receivedOneDoctor(rawDoctor) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_ONE_DOCTOR,
      rawDoctor: rawDoctor
    })
  },
  editedOneDoctor(rawDoctor) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.EDITED_ONE_DOCTOR,
      rawDoctor: rawDoctor
    })
  },
  deletedOneDoctor(rawDoctor) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.DELETED_ONE_DOCTOR,
      rawDoctor: rawDoctor
    })
  }
};

module.exports = ServerActions;
