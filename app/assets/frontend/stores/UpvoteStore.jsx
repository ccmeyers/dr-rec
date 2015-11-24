var AppDispatcher = require('../dispatcher.jsx');
var ActionTypes = require('../constants.jsx');
var objectAssign = require('react/lib/Object.assign');
var EvenEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'CHANGE';

var _upvotes = [];

var UpvoteStore = objectAssign({}, EvenEmitter.prototype, {
  getAll: function(){
    return _upvotes;
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
    case ActionTypes.RECEIVED_UPVOTES:
      _upvotes = action.rawUpvotes;
      UpvoteStore.emitChange();
      break;
    default:
  }
});

module.exports = UpvoteStore;
