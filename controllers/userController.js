const {User, Thought} = require('../models');
const userController = {
    getAllUsers(req,res){
        User.find({}).select('-__v').then(dbUserinfo => res.json(dbUserinfo)).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    getUserById ({params}, res){
        User.findOne({ _id: params.id})
        .populate([
            {path: 'thoughts', select: '-__v'},
            {path: 'friends', select: '-__v'}
        ])
        .select('-__v')
        .then(dbUserinfo => {
            if (!dbUserinfo){
                res.status(400).json({message: 'user not found with id'});
                return;
            }
            res.json(dbUserinfo);
        })
    },


    
}