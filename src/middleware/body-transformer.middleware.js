import {onError, onNotModify, onSuccess} from "../../libs/utils/res-handler";

/**
 * Middleware that transforms dynamically a body to a query fields and values of a statement query
 * ie: UPDATE entity SET (colum1, column2...) VALUES (?, ?) WHERE id = ?;
 * 'req.body' can contain as many columns as necessary and user cant only set one column1 or the whole properties
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const updateTransform =  (req, res, next) => {
    try{
        if (Object.keys(req.body).length === 0) return onNotModify('No columns to update found', res);

        req.queryFields = Object.keys(req.body).map(field => `${field} = ?`).join(', ');
        req.queryValues = Object.values(req.body);

        req.queryValues.push(req.params.id);

        next();
    }catch (e) {
        onError(e.message, 'body-transformer.middleware', 'updateTransform', res);
    }
}

/**
 * As the user cant insert many records at one. This function transforms an array body to multi insert query
 * @param req
 * @param res
 * @param next
 */
export const insertManyTransform =  (req, res, next) => {
    try {
        if ( (Array.isArray(req.body) && req.body.length === 0) || !req.body || Object.keys(req.body).length === 0)
            return onNotModify('Empty body', res);

        let elements = !Array.isArray(req.body) ? [req.body] : structuredClone(req.body);

        let keys = Object.keys(elements[0]);

        req.queryPlaceholders = elements.map(() => `(${keys.map(() => "?").join(", ")})`).join(", ");
        req.queryValues = elements.flatMap(Object.values);
        req.queryFields = keys.join(", ");

        for (const item of elements)
            if (Object.keys(item).length !== keys.length)
                return onNotModify('Define same columns for all elements', res);

        next ();
    }catch (e) {
        onError(e.message, 'body-transformer.middleware', 'insertManyTransform', res);
    }
}