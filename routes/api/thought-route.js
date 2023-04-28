const router = require('express').Router();
const {
	getThought,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts  *All working
router.route('/').get(getThought).post(createThought);

// /api/thoughts/:thoughtId *All working
router
	.route('/:thoughtId')
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
