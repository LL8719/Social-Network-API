const { user, thought } = require('../models');
module.exports = {
	// Find all users
	async getUser(req, res) {
		try {
			const users = await user.find({});
			return res.json({ users });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Find Single user

	async getSingleUser(req, res) {
		try {
			const oneUser = await user
				.findOne({ _id: req.params.userId })
				.populate('thoughts')
				.populate('friends')
				.select('-__v');

			if (!oneUser) {
				return res.status(404).json({ message: 'No user found with that ID' });
			}
			res.json(oneUser);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Create a user
	async createUser(req, res) {
		try {
			const newUser = await user.create(req.body);
			return res.json({ newUser });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Update user
	async updateUser(req, res) {
		try {
			const updateUser = await user.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);
			if (!updateUser) {
				return res.status(404).json({ message: 'No user found with that ID' });
			}

			res.json(updateUser);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Delete user
	async deleteUser(req, res) {
		try {
			const deleteUser = await user.findByIdAndDelete({
				_id: req.params.userId,
			});
			if (!deleteUser) {
				return res.status(404).json({ message: 'No user found with that ID' });
			}
			console.log(deleteUser.thoughts);
			await thought.deleteMany({ _id: { $in: deleteUser.thoughts } });
			res.json({ message: 'User and related thoughts deleted!' });
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Add friend
	async addFriend(req, res) {
		try {
			const userFriend = await user.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId } },
				{ new: true, runValidators: true }
			);
			if (!userFriend) {
				return res.status(404).json({ message: 'No user found with that id' });
			}
			res.json(userFriend);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Remove friend
	async removeFriend(req, res) {
		try {
			const unFriend = await user.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId } },
				{ new: true }
			);

			if (!unFriend) {
				return res.status(404).json({ message: 'No user found with that id' });
			}

			res.json(unFriend);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
