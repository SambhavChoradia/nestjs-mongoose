import { User } from './models/user.models';
import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { Logger } from '@core';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {}

	/**
	 * @method register
	 *
	 * @description register user
	 *
	 * @params data: UserDto
	 *
	 * @returns registration success
	 *
	 * @author Sambhav
	 */
	async register(data: UserDto) {
		const { username } = data;

		Logger.debug('Request body for user registration:' + JSON.stringify(data));

		const user = await this.userModel.findOne({ username: username });
		if (user) {
			Logger.error('User already exists');
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}

		const registerUser = new this.userModel(data);
		if (registerUser.save()) {
			return {
				statusCode: HttpStatus.CREATED,
				message: 'User registered successfully',
			};
		}

		throw new HttpException(
			'Issue registering user',
			HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}
}
