import httpCodes from "../../config/codes-config";
import { currentDateFormatted } from "./dates";
import  sqliteErrorHandler from '../../libs/utils/sqlite-error-handler';

/**
 * Specially used on catch or exceptions
 * @param { string } error Message of the error
 * @param { string } file Name of the file that contains the function
 * @param { string } functionName Name of the function
 * @param { Object } res - Request with username & password in its body.
 * @returns { JSON } Error message.
 */
export const onError = (error, file, functionName, res) => {
    console.error(`${ error } \n${ file }.js > ${ functionName }();\nAt: ${ currentDateFormatted() }`);
    const message = sqliteErrorHandler(error) || error;
    return res.status(httpCodes.INTERNAL_SERVER_ERROR_N).send({ error: message });
}

export const onNotFound = (message, res) => {
    console.error(message);
    return res.status(httpCodes.NOT_FOUND).send({ message: message });
}

export const onSuccess = (data, res) => {
    return res.status(httpCodes.OK).json(data);
}

export const onUnauthorized = (message, res) => {
    console.error(message);
    return res.status(httpCodes.UNAUTHORIZED).send({ message: message });
}

export const onNotAllowed = (message, res) => {
    console.error(message);
    return res.status(httpCodes.NOT_ALLOWED).send({ message: message });
}

export const onNotModify = (message, res) => {
    console.error(message);
    return res.status(httpCodes.NOT_MODIFIED).send({ message: message });
}



