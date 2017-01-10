var path = require("path"),
    //config = require("./config.json"),
    Datalog = require(path.join("../", "models", "datalog.js")),
    ///home/pird-admin/Documentos/node.js/learning-express-pug/models/user.js
    mongoose_uri = process.env.MONGOOSE_URI || "localhost/test";

var args = process.argv.slice(2);
/*
intensity: String,
voltage: String,
createdat: String,
updateat: String
*/
var intensity = args[0];
var voltage = args[1];
var createdat = args[2];
var updateat = args[3];

if (args.length < 3) {
    console.log("usage: node %s %s %s %s", path.basename(process.argv[1]), "intensity", "voltage", "createdat", "updateat");
    process.exit();
}

console.log("intensity: %s", intensity);
console.log("voltage: %s", voltage);
console.log("createdat: %s", createdat);
console.log("updateat: %s", updateat);


var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(mongoose_uri);
mongoose.connection.on('error', function () {
    console.log('Mongoose connection error', arguments);
});
mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");

    var datalog = new Datalog();

    datalog.intensity = intensity;
    datalog.voltage = voltage;
    datalog.createdat = createdat;
    datalog.updateat = updateat;

    datalog.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(datalog);
        }
        process.exit();
    });

});
