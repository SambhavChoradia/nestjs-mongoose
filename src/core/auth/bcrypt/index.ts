import * as bcrypt from 'bcryptjs';
import { BCRYPT_SALT } from '../../index';

/**
 * @method hashPassword
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - password
 * @returns The hashed password
 *
 */
const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, BCRYPT_SALT);
};

/**
 * @method comparePassword
 *
 * @remarks
 * This method is part of the {@link auth/bcrypt}.
 *
 * @param password - password
 * @param hash - number
 * @returns boolean
 *
 */
const comparePassword = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
