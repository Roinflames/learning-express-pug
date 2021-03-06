var path = require("path"),
    config = require("./config.json"),
    User = require(path.join("../", "models", "user.js")),
    ///home/pird-admin/Documentos/node.js/learning-express-pug/models/user.js
    mongoose_uri = process.env.MONGOOSE_URI || "localhost/test";

var args = process.argv.slice(2);

var username = args[0];
var password = args[1];
var email = args[2];

if (args.length < 2) {
    console.log("usage: node %s %s %s", path.basename(process.argv[1]), "user", "password", "email");
    process.exit();
}

console.log("Username: %s", username);
console.log("Password: %s", password);
console.log("Email: %s", email);
console.log("Creating a new user in Mongo");


var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(mongoose_uri);
mongoose.connection.on('error', function () {
    console.log('Mongoose connection error', arguments);
});
mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");

    var user = new User();

    user.username = username;
    user.password = password;
    user.email = email;

    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
        }
        process.exit();
    });

});
