import httpCodes from "../../config/codes-config";
const { initDatabase } = require("../../database");
const db = initDatabase();
import { onError, onNotFound, onUnauthorized} from "../../libs/utils/res-handler";
import { verifyToken } from "../../libs/utils/encriptor";

/**
 * Validate if user exists otherwise returns not found
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const validateUserExistence = (req, res, next) => {
    try{
        const { username, password } = req.body;
        const result = db.prepare(`SELECT user.*, role.name AS role FROM user JOIN role ON role.id = user.role 
                                        WHERE username=? AND password=?;`).get(username, password);
        if(!result)
            return onNotFound('User Not Found | Check credentials', res);

        req.userId = result.id;
        next();

    }catch (e) {
        onError(e.message, 'auth.middleware', 'validateUserExistence', res);
    }
}

/**
 * Validate if token is provided or valid
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const validateToken = async (req, res, next) => {

    try {
        const token = req.headers['x-access-token'];
        if (!token)
            return onUnauthorized('No token provided', res);

        let tokenDecoded = verifyToken(token);
        if (!tokenDecoded)
            return onUnauthorized('Invalid or expired token', res);

        req.userId = tokenDecoded.id;
        next();
    }catch (e){

        return res.status(httpCodes.INTERNAL_SERVER_ERROR_N).send('An error occurred validating token');
    }
}

export const isAdmin = (req, res, next) => {}
export const isSeller = (req, res, next) => {}

