import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from '@core';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
	imports: [MongooseModule.forRoot(MONGO_URI), UserModule, AuthModule],
})
export class AppModule {}
