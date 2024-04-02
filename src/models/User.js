const { Schema, SchemaTypes, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    email: {
        type: SchemaTypes.String,
        required: true
    },
    lastName: {
        type: SchemaTypes.String,
        required: true
    },
    firstName: {
        type: SchemaTypes.String,
        required: true
    },
    bio: {
        type: SchemaTypes.String,
        required: true
    },
    phoneNum: {
        type: SchemaTypes.String,
        required: false
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    profilePicture: {
        type: SchemaTypes.String,
        required: true
    },
    isOwner: {
        type: SchemaTypes.Boolean,
        required: true
    },
    numReviews: {
        default: 0,
        type: Number
    }
})

module.exports = model("User", userSchema)