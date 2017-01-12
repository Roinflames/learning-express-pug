var path = require("path"),
    //config = require("./config.json"),
    Raspberry = require(path.join("../", "models", "raspberry.js")),
    ///home/pird-admin/Documentos/node.js/learning-express-pug/models/user.js
    mongoose_uri = process.env.MONGOOSE_URI || "localhost/test";

var args = process.argv.slice(2);
/*
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
*/
var name = args[0];
var iduser = args[1];
var location = args[2];
var ip = args[3];
var batery = args[4];
var rangebatery1 = args[5];
var rangebatery2 = args[6];
var createdat = args[7];
var createdat = args[8];
var enabled = args[9];

if (args.length < 9) {
    console.log("usage: node %s %s %s %s %s %s %s %s %s %s", path.basename(process.argv[1]),
    "name", "iduser", "location","ip", "batery", "rangebatery1", "rangebatery2",
    "createdat", "updatedat", "enabled");
    process.exit();
}

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(mongoose_uri);
mongoose.connection.on('error', function () {
    console.log('Mongoose connection error', arguments);
});
mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");

    var respberry = new Raspberry();

    respberry.name = name;
    respberry.iduser = iduser;
    respberry.location = location;
    respberry.ip = ip;
    respberry.batery = batery;
    respberry.rangebatery1 = rangebatery1;
    respberry.rangebatery2 = rangebatery2;
    respberry.createdat = createdat;
    respberry.updatedat = updatedat;
    respberry.enabled = enabled;

    datalog.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(datalog);
        }
        process.exit();
    });

});
