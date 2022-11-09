const {User,Thought,Reaction} = require('../models');
const thought = require('../models/thought');
const user = require('../models/user');


const thoughtController = {
getAllThoughts:(req,res)=>{
    thought.find({}).populate({path:'reaction', select: '-__v'}).select('-__v')
    .then(dbThoughtINfo => res.json(dbThoughtINfo))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
},
getThoughtId:({params}, res)=>{
    thought.findOne({_id: params.id})
    .populate({path: 'reaction', select: '-__v'})
    .select('-__v')
    .then(dbThoughtINfo =>{
        if (!dbThoughtINfo){
            res.status(404).json({message: 'no thought with this id'});
            return;
        }
        res.json(dbThoughtINfo)

})
.catch(err => {
    console.log(err);res.status(400).json(err);
});
},
createThought:({body},res)=>{
    Thought.create(body)
    .then(dbThoughtINfo => {
        user.findOneAndUpdate(
            {_id: body.userId},
            {$push: {thoughts:dbThoughtINfo._id}},
            {new:true}
        )
        .then(dbUserInfo =>{
            if(!dbUserInfo){
                res.status(404).json({message: 'no userfound with this particular id'});
                return;
            }
            res.json(dbUserInfo);
        })
        .catch (err => res.status(400).json(err));
    },
    )
},
deleteThought:({params}, res)=>{
    Thought.findOneAndDelete({_id: params.id})
    .then(dbThoughtINfo =>  {
        if (!dbThoughtINfo){
            res.status(404).json({message: 'no thought found'});
            return;
        }
        User.findOneAndUpdate(
            { username: dbThoughtINfo.username},
            {$pull: {thoughts: params.id}}
            )
            .then(() => {
                res.json({message: 'successgully updated thought'});
            })
            .catch(err => res.status(500).json(err));
    
},

// addReaction:({params, body}, res) =>{
//     Thought.findOneAndUpdate(
//         { _id: params.thoughtId},
//         { $addToSet: {reactions: body}},
//         {new: true, runValidators:true}
//     )
//     .then(dbThoughtINfo => {
//         if (!dbThoughtINfo){
//             res.status(404).json({message: 'no though found '});
//             return;
//         }
//         res.json(dbThoughtINfo)
//     })
//     .catch(err => res.status(500).json(err))
// },

// deleteReaction({params, body}, res)=>{
//     thought.findOneAndUpdate(
//         { _id: params.thoughtId},
//         { $pull: {reactions: {reactionId: body.reactionId}}},
//         {new: true, runValidators:true}
//     )
//     .then(dbThoughtINfo => {
//         if(!dbThoughtINfo){
//             res.status(400).json({message: 'no thought found'});
//             return;
//         }
//         res.json({message: 'sucessfully deleted reaction'});
//     })
//     .catch(err => res.status(500).json(err));
// },
)
}
}

module.exports = thoughtController;