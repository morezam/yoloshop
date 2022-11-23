import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserType } from '@types';

export type IUser = Document &
	UserType & {
		comparePassword: (candidatePassword: string) => boolean;
		securityNumber?: number;
	};

export const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		favorites: [
			{
				prodId: String,
				name: String,
			},
		],
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		isVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		securityNumber: Number,
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
	return bcrypt.compareSync(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
