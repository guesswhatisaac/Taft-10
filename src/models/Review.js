const { Schema, SchemaTypes, model } = require('mongoose');

const reviewSchema = new Schema({
    username: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    reviews: [{
        rating: {
            type: SchemaTypes.Number,
            required: true
        },
        date: {
            type: SchemaTypes.Date,
            required: true
        },
        upvotes: {
            type: SchemaTypes.Number,
            default: 0
        },
        review: { 
            type: SchemaTypes.String,
            required: true
        }
    }]
})

module.exports = model("Review", reviewSchema)