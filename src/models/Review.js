const { Schema, SchemaTypes, model } = require('mongoose');

const reviewSchema = new Schema({
    username: {
        type: SchemaTypes.String,
    }
})

module.exports = model("Review", reviewSchema)