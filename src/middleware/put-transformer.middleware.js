import {onError, onNotModify} from "../../libs/utils/res-handler";

/**
 * Middleware that transforms dynamically a body to a query fields and values of a statement only for update queries
 * ie: UPDATE entity SET (colum1, column2...) VALUES (?, ?) WHERE id = ?;
 * 'req.body' can contain as many columns as necessary and user cant only set one column1 or the whole properties
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export default (req, res, next) => {
    try{
        if (Object.keys(req.body).length === 0) return onNotModify('Define at least one column', res);

        req.queryFields = Object.keys(req.body).map(field => `${field} = ?`).join(', ');
        req.queryValues = Object.values(req.body);

        req.queryValues.push(req.params.id);

        next();
    }catch (e) {
        onError(e.message, 'put-transformer.middleware', 'default', res);
    }
} 