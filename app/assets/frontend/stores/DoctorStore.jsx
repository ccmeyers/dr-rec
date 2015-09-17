var AppDispatcher = require('../dispatcher.jsx');
var ActionTypes = require('../constants.jsx');
var objectAssign = require('react/lib/Object.assign');
var EvenEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'CHANGE';

var _doctors = [];

var DoctorStore = objectAssign({}, EvenEmitter.prototype, {
  getAll: function(){
    return _doctors;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action){
  switch (action.actionType) {
    case ActionTypes.RECEIVED_DOCTORS:
      _doctors = action.rawDoctors;
      DoctorStore.emitChange();
      break;
    default:

  }
});

module.exports = DoctorStore;
