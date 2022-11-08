const {Schema, model} = require('mongoose');
const thotschema = require('./thought');

const usrSchema = new Schema ({
    username: {
        type: String,
        unique: [true, 'username in use'],
        required: [true, 'userme cannot be empty'],
        trim: true
    },
    email: {
        type: String,
        unique:[true, 'email is in use'],
        required: [true, 'email cannot be empty'],
        match: [
        /^([a-z 0-9_\.-]+)@([\dc-z\.-]+)\.([a-z\.]{1,5})$/
        ]
    },
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref:'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
},
{
    toJSON:{
        virtuals: true,
        getters: true,
    },
    id: false
}
)

usrSchema.virtual;('friendCount').get(function(){
    return this.friends.length;
})

const user = model('user', usrSchema);

module.exports = user;