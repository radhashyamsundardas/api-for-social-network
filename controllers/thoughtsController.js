const {User,Thought,Reaction} = require('../models');
const thought = require('../models/thought');
const user = require('../models/user');


const thoughtController = {
getAllthoughts(req,res){
    thought.find({}).populate({path:'reaction', select: '-__v'}).select('-__v').then(dbThoughtINfo => res.json(dbThoughtINfo))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
},
getThougtId({params}, res){
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
createThought({body},res){
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

    deleteThought

    )
}
}