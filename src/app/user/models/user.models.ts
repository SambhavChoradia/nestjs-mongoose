import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User extends Document {
	@Prop({ required: true, useCreateIndex: true })
	username: string;

	@Prop({ required: true })
	password: string;

	@Prop(
		raw({
			addressLine1: String,
			addressLine2: String,
			addressLine3: String,
			city: String,
			state: String,
			country: String,
			zipcode: Number,
		}),
	)
	address: Record<string, any>;

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function(next: HookNextFunction) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		const hashed = await bcrypt.hash(this['password'], 10);
		this['password'] = hashed;
		return next();
	} catch (err) {
		return next(err);
	}
});
