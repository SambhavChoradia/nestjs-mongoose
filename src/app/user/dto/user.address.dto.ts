import { IsNotEmptyString, IsOptionalString } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class UserAddressDto {
	@ApiProperty({
		example: '1-b samarth karena',
		description: 'addressLine1',
	})
	@IsNotEmptyString()
	addressLine1: string;

	@ApiProperty({
		example: 'near bliss hotel',
		description: 'addressLine2',
	})
	@IsOptionalString()
	addressLine2: string;

	@ApiProperty({
		example: 'thathavde',
		description: 'addressLine3',
	})
	@IsOptionalString()
	addressLine3: string;

	@ApiProperty({
		example: 'pune',
		description: 'city',
	})
	@IsNotEmptyString()
	city: string;

	@ApiProperty({
		example: 'maharashtra',
		description: 'state',
	})
	@IsNotEmptyString()
	state: string;

	@ApiProperty({
		example: 'India',
		description: 'country',
	})
	@IsNotEmptyString()
	country: string;

	@ApiProperty({
		example: '411044',
		description: 'zipcode',
	})
	@IsNotEmptyString()
	@MaxLength(6)
	zipcode: string;
}
