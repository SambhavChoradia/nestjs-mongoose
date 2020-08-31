import {
	applyDecorators,
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';
import { IsNotEmpty, ValidationArguments, IsString } from 'class-validator';

export function IsNotEmptyString() {
	return applyDecorators(
		IsNotEmpty({
			message: (args: ValidationArguments) => {
				if (
					args.value !== undefined ||
					args.constraints !== undefined ||
					args.value !== null ||
					args.value.length === 0
				) {
					throw new BadRequestException(`${args.property} Field required`);
				} else {
					throw new InternalServerErrorException();
				}
			},
		}),
		IsString({
			message: (args: ValidationArguments) => {
				throw new BadRequestException(`${args.property} Field Must be String`);
			},
		}),
	);
}
