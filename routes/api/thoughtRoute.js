const router = require('express').Router();
const { getAllThoughts, getThoughtId, createThought, updateThought, DeleteThought, addReaction, deleteReaction} = require('../../controllers/thoughtsController');

router.route('/') .get(getAllThoughts) .post(createThought);

router.route('/:id').get(getThoughtId).put(updateThought).delete(DeleteThought);

router.route('/:thoghtId/reactions/').post(addReaction).delete(deleteReaction);


module.exports = router;