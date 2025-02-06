import {onError, onSuccess} from "../../libs/utils/res-handler";

const { initDatabase } = require("../../database");
const db = initDatabase();

/**
 * Send user in session
 * @param { Object } req - Request with username & password in its body.
 * @param { Object } res - Respond API object.
 * @returns { JSON } It responds a user object or not found
 */
export const getMyUser = (req, res) => {
    try{
        const result = db.prepare(`SELECT user.*, role.name AS role FROM user JOIN role ON role.id = user.role 
                                        WHERE user.id=?`).get(req.userId);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'user.controller', 'getMyUser', res);
    }
}
