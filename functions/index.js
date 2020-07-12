const saveTimer = require('./saveTimer');
const fetchTimer = require('./fetchTimer');
const fetchAllTimers = require('./fetchAllTimers');
const deleteTimer = require('./deleteTimer');

exports.saveTimer = saveTimer.saveTimer;
exports.fetchTimer = fetchTimer.fetchTimer;
exports.fetchAllTimers = fetchAllTimers.fetchAllTimers;
exports.deleteTimer = deleteTimer.deleteTimer;