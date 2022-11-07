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
            moment(createdAtVal).format("MM,DD,YYYY [at] hh.mm a"),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);


const thotSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default:  Date.now,
            get: (createdAtVal) =>
            moment(createdAtVal).format("MM,DD,YYYY [at] hh.mm a"),
        },
        username: {
            type:String,
            require: true,
        },
    reactions: [reacSchema],
}, {
    toJSON: {
        getters: true,
    },
    id: false,
}
);

const thought = model('Thought', thotSchema);
thotSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});











module.exports = thought;