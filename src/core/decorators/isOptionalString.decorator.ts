import { applyDecorators } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { IsNotEmptyString } from '.';

export function IsOptionalString() {
	return applyDecorators(IsOptional(), IsNotEmptyString());
}
