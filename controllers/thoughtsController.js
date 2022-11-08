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

}