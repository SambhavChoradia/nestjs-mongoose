import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../index';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest();
		const method = req.method;
		const url = req.url;

		Logger.debug(
			`Controller: ${context.getClass().name} Method: ${method} Url: ${url}`,
		);
		return next.handle().pipe(tap());
	}
}
