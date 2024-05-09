const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    
    email: {
        required: true,
        type: String,
        trim: true,
    },
    
    city: {
        type: String,
        required: true,
        trim: true,
    },

    age: {
        type: String,
        required: true,
        trim: true,
    },
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", userSchema);
module.exports = User;
