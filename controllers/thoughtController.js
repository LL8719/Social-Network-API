const { user, thought, reaction } = require('../models');
module.exports = {
	// Find all thoughts
	async getThought(req, res) {
		try {
			const thoughts = await thought.find({});
			res.json(thoughts);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Find Single thought
	async getSingleThought(req, res) {
		try {
			const oneThought = await thought
				.findOne({ _id: req.params.thoughtId })
				.select('-__v');
			if (!oneThought) {
				return res
					.status(404)
					.json({ message: 'No thought found with that ID' });
			}
			res.json(oneThought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Create a thought and update user
	async createThought(req, res) {
		try {
			const { _id } = await thought.create(req.body);
			const updateUser = await user.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: _id } },
				{ new: true }
			);
			res.json(updateUser);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Update thought
	async updateThought(req, res) {
		try {
			const updateThought = await thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);
			if (!updateThought) {
				return res
					.status(404)
					.json({ message: 'No thought found with that ID' });
			}

			res.json(updateThought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Delete thought
	async deleteThought(req, res) {
		try {
			const deleteThought = await thought.findOneAndRemove({
				_id: req.params.thoughtId,
			});
			if (!deleteThought) {
				return res
					.status(404)
					.json({ message: 'No thought found with that ID' });
			}
			const updateUser = await user.findOneAndUpdate(
				{ thoughts: req.params.thoughtId },
				{ $pull: { thoughts: req.params.thoughtId } },
				{ new: true }
			);
			if (!updateUser) {
				return res.status(404).json({
					message: 'Thought has been deleted. No user found with that ID',
				});
			}
			res.json({ message: 'Thought successfully deleted' });
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Add reaction
	async addReaction(req, res) {
		try {
			const addReaction = await thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ new: true, runValidators: true }
			);
			if (!addReaction) {
				return res
					.status(404)
					.json({ message: 'No thought found with that id' });
			}
			res.json(addReaction);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
	// Remove reaction
	async removeReaction(req, res) {
		try {
			const deleteReaction = await thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: req.params.reactionId } },
				{ new: true }
			);

			if (!deleteReaction) {
				return res
					.status(404)
					.json({ message: 'No thought found with that id' });
			}

			res.json(deleteReaction);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
