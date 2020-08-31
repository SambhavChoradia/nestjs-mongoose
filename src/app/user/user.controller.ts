import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
import {
	ApiOperation,
	ApiResponse,
	ApiBadRequestResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ValidationPipe } from '@core';

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
	@Post('register')
	register(@Body(ValidationPipe) data: UserDto) {
		return this.userService.register(data);
	}
}
