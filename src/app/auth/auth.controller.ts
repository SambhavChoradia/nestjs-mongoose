import {
	Controller,
	HttpStatus,
	Post,
	Body,
	Get,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
	ApiOperation,
	ApiResponse,
	ApiBadRequestResponse,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard, ValidationPipe } from '@core';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'User Login' })
	@ApiResponse({ status: HttpStatus.OK, description: 'User Login' })
	@ApiBadRequestResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Bad Request',
	})
	@Post('login')
	login(@Body(ValidationPipe) data: AuthDto) {
		return this.authService.login(data);
	}

	@ApiOperation({ summary: 'Fetch user info' })
	@ApiResponse({ status: HttpStatus.OK, description: 'User Profile Info' })
	@ApiUnauthorizedResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: 'Unauthorized',
	})
	@ApiForbiddenResponse({
		status: HttpStatus.FORBIDDEN,
		description: 'Forbidden',
	})
	@ApiBearerAuth()
	@Get('profile')
	@UseGuards(AuthGuard)
	getProfile(@Request() req) {
		return this.authService.getProfile(req.user.id);
	}
}
