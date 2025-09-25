const mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose");
const Schama = mongoose.Schema;

//  Passport-Local Mongoose will add a username, hash and salt 
//  field to store the username, the hashed password and the salt value.
const userSchema = new Schama({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(PassportLocalMongoose)

module.exports = mongoose.model("User", userSchema);
