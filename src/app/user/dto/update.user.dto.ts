import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsOptional } from 'class-validator';
import { IsNotEmptyString } from '@core';
import { UserAddressDto } from './user.address.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
	@ApiProperty({
		example: 'sambhav',
		description: 'username',
	})
	@IsNotEmptyString()
	username: string;

	@ApiProperty({
		example: 'sambhav',
		description: 'username',
	})
	@IsNotEmptyString()
	firstname: string;

	@ApiProperty({
		example: 'sambhav',
		description: 'username',
	})
	@IsNotEmptyString()
	lastname: string;

	@ApiProperty({
		type: String,
		format: 'binary',
		required: false,
	})
	profilePic: any;

	@ApiProperty({ type: UserAddressDto, required: false })
	@ValidateNested({ each: true })
	@Type(() => UserAddressDto)
	@IsOptional()
	address?: UserAddressDto;
}
