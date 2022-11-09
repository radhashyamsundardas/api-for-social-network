const {User, Thought} = require('../models');
const userController = {
    getAllUsers(req,res){
        User.find({}).select('-__v').then(dbUserinfo => res.json(dbUserinfo)).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    getUserId ({params}, res){
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

createUser({ body},res){
    User.create(body)
    .then(dbUserinfo =>res.json(dbUserinfo)
    .catch(err => res.status(400).json(err)));
},

updateUser({params, body}, res){
    User.findOneAndUpdate({_id: params.id}, body,{new:true, runValidators: true})
    .then(dbUserinfo => {
        if(!dbUserinfo){
            res.status(404).json({message:'no user found'});
        return;        
    }
    res.json(dbUserinfo);
    })
    .catch(err => res.status(400).json(err));
},

deleteUser({params}, res){
    User.findOneAndDelete({_id: params.id})
    .then(dbUserinfo => {
        if (!dbUserinfo){
            res.status(404).json({message: 'no user found'});
            return;
        }
    })
    User.updateMany(
        { _id: {$in: dbUserinfo.friends}},
        {$pull: {friends:params.id}}
        )
        .then(()=> {
            Thought.deleteMany({username: dbUserinfo.username})
            .then(() => {
                res.json({message: 'successfully deleted'});
            })
            .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err));
},


}



module.exports = userController;


