
var mongoose = require('mongoose');

module.exports = mongoose.model('Raspberry',{
  name: String,
  iduser: String,
  location: String,
  ip: String,
  batery: Number,
  rangebatery1: Number,
  rangebatery2: Number,
  createdat: String,
  updatedat: String,
  enabled: Boolean
});
