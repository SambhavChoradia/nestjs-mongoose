import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '@core';

export class AuthDto {
	@ApiProperty({
		example: 'sambhav',
		description: 'username',
	})
	@IsNotEmptyString()
	username: string;

	@ApiProperty({
		example: 'password',
		description: 'password',
	})
	@IsNotEmptyString()
	password: string;
}
