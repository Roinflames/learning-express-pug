var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var port = new SerialPort('/dev/ttyUSB0');
var dato;

// list serial ports:
serialport.list(function (err, ports) {
ports.forEach(function(port) {
console.log(port.comName);
});
});

port.on('open', function() {
port.write('main screen turn on', function(err) {
if (err) {
  return console.log('Error on write: ', err.message);
}
console.log('Puerto abierto');
});
});

port.on('data', function (data) {
//console.log('Data: ' + data);
dato = JSON.parse(data);
//console.log(dato);
});

// open errors will be emitted as an error event
port.on('error', function(err) {
console.log('Error: ', err.message);
});
