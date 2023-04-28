const router = require('express').Router();
const {
	getUser,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend,
} = require('../../controllers/userController');

// /api/users  *All routes working
router.route('/').get(getUser).post(createUser);

// /api/users/:userId *All routes working
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId *All routes working
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
