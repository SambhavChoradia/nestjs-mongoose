import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../../index';

/**
 * @method generateToken
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param user - user id
 *
 * @returns The access token
 *
 */
const generateToken = async (user: string): Promise<string> => {
	return await jwt.sign(
		{
			id: user,
		},
		ACCESS_TOKEN_SECRET,
		{
			expiresIn: '30d',
		},
	);
};

/**
 * @method validateToken
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param auth - containg Bearer  Token
 *
 * @returns The decoded token
 *
 */
const validateToken = async (auth: string) => {
	if (auth.split(' ')[0] !== 'Bearer') {
		throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
	}
	const token = auth.split(' ')[1];
	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
		return decoded;
	} catch (err) {
		const message = 'Token error:' + (err.messgae || err.name);
		throw new HttpException(message, HttpStatus.FORBIDDEN);
	}
};

export { generateToken, validateToken };
