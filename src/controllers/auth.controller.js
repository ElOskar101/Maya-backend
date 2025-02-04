import { onError, onSuccess } from "../../libs/utils/res-handler";
import { createToken } from "../../libs/utils/encriptor";

/**
 * Creates and send a token. This is a result of success login in middleware function
 * @param req
 * @param res
 */
export const sendToken = (req, res) => {
    try{
        const token = createToken(req.userId);
        onSuccess({token: token}, res);
    }catch(e){
        onError(e.message, 'auth.controller', 'sendToken', res);
    }
}