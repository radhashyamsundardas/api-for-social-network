const {Schema, model ,Types} = require('mongoose');
const moment = require('moment');

const reacSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280,

        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type:Date,
            default: Date.now,
            get: (createdAt) =>
            moment(createdAt).format("MM,DD,YYYY [at] hh.mm a"),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);


module.exports = thought;