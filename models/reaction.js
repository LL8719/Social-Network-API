const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxLength: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

reactionSchema.virtual('formattedCreatedAt').get(function () {
	return this.createdAt.toLocaleString();
});

const reaction = model('reaction', reactionSchema);

module.exports = reaction;
