import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import 'dotenv/config';
import { validateToken } from '../index';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		if (!request.headers.authorization) {
			return false;
		}
		const decoded = await validateToken(request.headers.authorization);
		request.user = decoded;
	}
}
