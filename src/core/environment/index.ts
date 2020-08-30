import 'dotenv/config';

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 3000;
const END_POINT: string = process.env.END_POINT || 'api/v1';

// mongo
const MONGO_URL = process.env.MONGO_URL || 'localhost';
const MONGO_URI = `mongodb://${MONGO_URL}:${process.env.MONGO_DB}`;

// jsonwebtoken
const ACCESS_TOKEN_SECRET: string =
	process.env.ACCESS_TOKEN_SECRET || 'access-token-key';

// bcrypt
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10;

export {
	NODE_ENV,
	DOMAIN,
	PORT,
	END_POINT,
	ACCESS_TOKEN_SECRET,
	BCRYPT_SALT,
	MONGO_URI,
};
