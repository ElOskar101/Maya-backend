import httpCodes from "../../config/codes-config";
const { initDatabase } = require("../../database");
const db = initDatabase();
import {onError, onNotFound, onSuccess, onUnauthorized} from "../../libs/utils/res-handler";
import {comparePassword, verifyToken} from "../../libs/utils/encriptor";

/**
 * Validate if user exists otherwise returns not found
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const validateUserExistence = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const result = db.prepare(`SELECT user.*, role.name AS role FROM user JOIN role ON role.id = user.role 
                                        WHERE username=?;`).get(username);

        if(!result)
            return onNotFound('User Not Found', res);

        const matchPassword = await comparePassword(password, result.password);

        if (!matchPassword) return onNotFound('Password did not match', res);

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

export const isSuperAdmin = (req, res, next) => {
    try{
        const result = getUserRole(req.userId);
        if (!['superadmin'].includes(result.role)) return onUnauthorized('Not allowed to do this action', res);
        next();
    }catch (e) {
        onError(e.message, 'auth.middleware', 'isSuperAdmin', res);
    }
}
export const isAdmin = (req, res, next) => {
    try{
        const result = getUserRole(req.userId);
        if (!['superadmin', 'admin'].includes(result.role))
            return onUnauthorized('Not allowed to do this action', res);
        next();
    }catch (e) {
        onError(e.message, 'auth.middleware', 'isAdmin', res);
    }
}
export const isStandard = (req, res, next) => {
    try{
        const result = getUserRole(req.userId);
        if (!['superadmin', 'admin', 'standard'].includes(result.role))
            return onUnauthorized('Not allowed to do this action', res);
        next();
    }catch (e) {
        onError(e.message, 'auth.middleware', 'isStandard', res);
    }
}

/**
 * Search user role for role validation middlewares (isStandard, isAdmin, isSuperAdmin)
 * @param userId
 * @returns {*}
 */
function getUserRole (userId){
    return db.prepare(`SELECT user.*, role.name AS role FROM user JOIN role ON role.id = user.role 
                       WHERE user.id=${userId}`).get();
}

