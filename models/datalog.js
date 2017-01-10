
var mongoose = require('mongoose');

module.exports = mongoose.model('Datalog',{
	intensity: String,
	voltage: String,
	createdat: String,
	updateat: String
});
