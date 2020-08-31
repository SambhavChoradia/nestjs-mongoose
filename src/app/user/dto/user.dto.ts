import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsOptional } from 'class-validator';
import { IsNotEmptyString } from '@core';
import { UserAddressDto } from './user.address.dto';
import { Type } from 'class-transformer';

export class UserDto {
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

	@ApiProperty({ type: UserAddressDto, required: false })
	@ValidateNested({ each: true })
	@Type(() => UserAddressDto)
	@IsOptional()
	address?: UserAddressDto;
}
