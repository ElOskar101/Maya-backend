import Crypt from "cryptr";
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
require('dotenv').config();

/**
 * Only for encrypt passwords that cant be returned to it original value
 * @param password
 * @returns {Promise<string>}
 */
export const encrypt = async (password) => {
    const secret = Buffer.from(process.env.SECRET_KEY, 'base64').toString('utf-8');
    const cryptP = new Crypt(secret);
    return cryptP.encrypt(password);
};

/**
 * Decrypt a password to convert it into the original, readable value
 * @param password
 * @returns {Promise<string>}
 */
export const decrypting = async (password) => {
    const secret = Buffer.from(process.env.SECRET_KEY, 'base64').toString('utf-8');
    const cryptP = new Crypt(secret);
    return cryptP.decrypt(password)
};

/**
 * Ideal for passwords that we do not want to return to their original value. The user password is an example.
 * @param password
 * @returns {Promise<void|*>}
 */
export const encryptOneWayHash = async (password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

/**
 * Since we cannot return an encrypted password to its original value, we let this algorithm compare it without unhashing.
 * @param password
 * @param hash
 * @returns {Promise<void|*>}
 */
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

/**
 * Create a user token when their sign in
 * @param userId
 * @returns {*} user token
 */
export const createToken = (userId) => {
    const publicTokenKey = Buffer.from(process.env.TOKEN_SECRET_KEY, 'base64').toString('utf-8');
    const expiresIn = Number (process.env.TOKEN_EXPIRE_TIME);
    return jwt.sign({id: userId}, publicTokenKey, {'expiresIn': expiresIn}, '');
}


export const verifyToken = (token) => {
    try{
        const publicTokenKey = Buffer.from(process.env.TOKEN_SECRET_KEY, 'base64').toString('utf-8');
        return jwt.verify(token, publicTokenKey, {}, '');
    }catch (e) {
        return null
    }
}
