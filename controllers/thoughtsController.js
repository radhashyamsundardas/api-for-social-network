const {User,Thought,Reaction} = require('../models');
const thought = require('../models/thought');


const thoughtController = {
getAllthoughts(req,res){
    thought.find({}).populate({path:'reaction', select: '-__v'}).select('-__v').then(dbThoughtINfo => res.json(dbThoughtINfo))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
},

}