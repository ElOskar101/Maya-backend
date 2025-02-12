import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getProductStatuses = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM product_status`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'product-status.controller', 'getProductStatus', res);
    }
}

// GET:id
export const getProductStatus = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM product_status WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'product-status.controller', 'getProductStatus', res);
    }
}

// POST
export const createProductStatus = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO product_status (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
            .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'product-status.controller', 'createProductStatus', res);
    }
}

// PUT
export const modifyProductStatus = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE product_status SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);

        if (result.changes === 0) return onNotFound('No product status found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'product-status.controller', 'modifyProductStatus', res);
    }
}

// DELETE
export const deleteProductStatus = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM product_status WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No product status found', res);

        onSuccess({message: 'Product status removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'product-status.controller', 'deleteProductStatus', res);
    }
}