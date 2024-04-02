const { Schema, SchemaTypes, model } = require('mongoose');

const replySchema = new Schema({
    username: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    replies: [SchemaTypes.Number] // pass the an array of review IDs
})

module.exports = model("Review", reviewSchema)