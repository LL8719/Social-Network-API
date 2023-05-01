const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Please enter a valid email address'],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'thought',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

userSchema.pre('remove', async function (next) {
	try {
		const thoughtsIds = this.thoughts;
		await thought.deleteMany({ _id: { $in: thoughtsIds } });
		next();
	} catch (err) {
		next(err);
	}
});

const user = model('user', userSchema);

module.exports = user;
