const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        minLength: 3
    },
    name: String,
    passwordHash: String,
    blogs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // passwordHash bi trebalo sakriti
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;