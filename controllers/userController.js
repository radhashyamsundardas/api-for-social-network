const {User, Thought} = require('../models');
const userController = {
    getAllUsers(req,res){
        User.find({}).select('-__v').then(dbUserinfo => res.json(dbUserinfo)).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    
}