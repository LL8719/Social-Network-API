const { user, thought } = require('../models');
module.exports = {
	// Find all users
	async getUser(req, res) {
		try {
			const users = await user.find({});
			res.json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Find Single user

	async getSingleUser(req, res) {
		try {
			const user = await user
				.findOne({ _id: req.params.userId })
				.populate('thought')
				.populate('friends')
				.select('-__v');
			if (!user) {
				return res.status(404).json({ message: 'No user found with that ID' });
			}
			res.json(user);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};
