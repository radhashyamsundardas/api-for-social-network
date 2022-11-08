const router = require('express').Router();
const {getAllUser, getUserID, createUser, updateUser, deleteUser, addFriend, deleteFriend}= require('../../controllers/userController');


router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUserID).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;