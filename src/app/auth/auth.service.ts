import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/models/user.models';
import { AuthDto } from './dto/auth.dto';
import { Logger, generateToken } from '@core';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {}

	/**
	 * @method login
	 *
	 * @description login user and generates JWT token
	 *
	 * @params data: AuthDto
	 *
	 * @returns JWT token
	 *
	 * @author Sambhav
	 */
	async login(data: AuthDto): Promise<{}> {
		const { username, password } = data;

		Logger.debug('Request body for user registration:' + JSON.stringify(data));

		const user = await this.userModel.findOne({ username: username });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			Logger.error('Invalid username/password' + JSON.stringify(user));
			throw new HttpException(
				'Invalid username/password',
				HttpStatus.UNAUTHORIZED,
			);
		}
		const { id } = user;
		const token = await generateToken(id);

		return {
			statusCode: HttpStatus.OK,
			message: 'Authorization success',
			token: token,
		};
	}

	/**
	 * @method getProfile
	 *
	 * @description fetch user  profile
	 *
	 * @params id: user id
	 *
	 * @returns user profile
	 *
	 * @author Sambhav
	 */
	async getProfile(id): Promise<{}> {
		const user = await this.userModel
			.findOne({ _id: id })
			.select('username address');

		return {
			statusCode: HttpStatus.OK,
			message: 'User profile fetched successfully',
			data: user,
		};
	}
}
