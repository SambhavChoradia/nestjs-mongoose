import {
	Controller,
	Body,
	Post,
	HttpStatus,
	UseInterceptors,
	UploadedFile,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import {
	ApiOperation,
	ApiResponse,
	ApiBadRequestResponse,
	ApiConsumes,
	ApiTags,
} from '@nestjs/swagger';
import { extname } from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ValidationPipe, Auth } from '@core';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Register User' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'User Registered Successfully',
	})
	@ApiBadRequestResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Bad Request',
	})
	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileInterceptor('profilePic', {
			storage: diskStorage({
				destination: function(req, profilePic, cb) {
					const path = './attachments';
					fs.mkdirSync(path, { recursive: true });
					return cb(null, path);
				},
				filename: (req, profilePic, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('');
					return cb(null, `${randomName}${extname(profilePic.originalname)}`);
				},
			}),
		}),
	)
	register(@Body(ValidationPipe) data: UserDto, @UploadedFile() profilePic) {
		return this.userService.register(data, profilePic);
	}

	@ApiOperation({ summary: 'Update User Profile' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User Profile updated successfully.',
	})
	@Put(':id')
	@Auth()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileInterceptor('profilePic', {
			storage: diskStorage({
				destination: function(req, profilePic, cb) {
					const path = './attachments';
					fs.mkdirSync(path, { recursive: true });
					return cb(null, path);
				},
				filename: (req, profilePic, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('');
					return cb(null, `${randomName}${extname(profilePic.originalname)}`);
				},
			}),
		}),
	)
	updateUserProfile(
		@Param('id') id: string,
		@Body(ValidationPipe) data: UpdateUserDto,
		@UploadedFile() profilePic,
	) {
		return this.userService.updateUserProfile(id, data, profilePic);
	}

	@ApiOperation({ summary: 'Delete User' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User deleted successfully.',
	})
	@Delete(':id')
	@Auth()
	deleteUser(@Param('id') id: string): Promise<{}> {
		return this.userService.deleteUser(id);
	}
}
