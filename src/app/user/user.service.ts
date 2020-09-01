import { User } from './models/user.models';
import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { Logger } from '@core';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {}

	/**
	 * @method findUserById
	 *
	 * @description find user by id
	 *
	 * @params id
	 *
	 * @returns user
	 *
	 * @author Sambhav
	 */
	async findUserById(id: string): Promise<User> {
		const user = await this.userModel.findOne({ _id: id });
		if (!user) {
			Logger.error('User not found');
			throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
		}
		return user;
	}

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
	async register(data: UserDto, profilePic: any) {
		const { username, password, firstname, lastname, address } = data;

		Logger.debug('Request body for user registration:' + JSON.stringify(data));

		const user = await this.userModel.findOne({ username: username });
		if (user) {
			Logger.error('User already exists');
			throw new HttpException('User already exists', HttpStatus.CONFLICT);
		}

		const registerUser = new this.userModel({
			username: username,
			password: password,
			firstname: firstname,
			lastname: lastname,
			address: address ? address[0] : null,
			profilePic: profilePic ? profilePic.path : null,
		});

		const saveUser = await registerUser.save();
		if (saveUser) {
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

	/**
	 * @method updateUserProfile
	 *
	 * @description updates user
	 *
	 * @params data: UpdateUserDto
	 *
	 * @returns updated successfully
	 *
	 * @author Sambhav
	 */
	async updateUserProfile(id: string, data: UpdateUserDto, profilePic: any) {
		const { username, firstname, lastname, address } = data;

		Logger.debug('Request body for user registration:' + JSON.stringify(data));

		const user = await this.findUserById(id);

		const updateUser = await user.update({
			username: username,
			firstname: firstname,
			lastname: lastname,
			address: address ? address[0] : user.address,
			profilePic: profilePic ? profilePic.path : user.profilePic,
		});

		if (updateUser) {
			return {
				statusCode: HttpStatus.OK,
				message: 'User updated successfully',
			};
		}

		throw new HttpException(
			'Issue updating user',
			HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}

	/**
	 * @method updateUserProfile
	 *
	 * @description updates user
	 *
	 * @params data: UpdateUserDto
	 *
	 * @returns updated successfully
	 *
	 * @author Sambhav
	 */
	async deleteUser(id: string) {
		const user = await this.findUserById(id);

		const deleteUser = await user.remove();

		if (deleteUser) {
			return {
				statusCode: HttpStatus.OK,
				message: 'User deleted successfully',
			};
		}

		throw new HttpException(
			'Issue deleting user',
			HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}
}
