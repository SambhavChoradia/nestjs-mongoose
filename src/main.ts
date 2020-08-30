import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
	PORT,
	END_POINT,
	Logger,
	ValidationPipe,
	LoggingInterceptor,
	DOMAIN,
} from './core';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Global prefix
	app.setGlobalPrefix(END_POINT);

	// Global Interceptor
	app.useGlobalInterceptors(new LoggingInterceptor());

	// Global Pipes
	app.useGlobalPipes(new ValidationPipe());

	// Swagger Module
	const options = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('Mongoose')
		.setDescription('Mongoose api docs')
		.setVersion('1.0')
		.addTag('Mongoose')
		.addServer(`${DOMAIN}:${PORT}`)
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	await app.listen(PORT);
	Logger.debug(`🚀  Server is listening on port ${PORT}`);
}

// Start Application
bootstrap().catch(e => {
	Logger.error(`❌  Error starting server, ${e}`);
	throw e;
});
