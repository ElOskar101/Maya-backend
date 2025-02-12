import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getInvoiceTypes = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM invoice_type`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'invoice-type.controller', 'getInvoiceTypes', res);
    }
}

// GET:id
export const getInvoiceType= (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM invoice_type WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'invoice-type.controller', 'getInvoiceType', res);
    }
}

// POST
export const createInvoiceType = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO invoice_type (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
                         .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'invoice-type.controller', 'createInvoiceType', res);
    }
}

// PUT
export const modifyInvoiceType = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE invoice_type SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);

        if (result.changes === 0) return onNotFound('No invoice type found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'invoice-type.controller', 'modifyInvoiceType', res);
    }
}

// DELETE
export const deleteInvoiceType = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM invoice_type WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No invoice type found', res);

        onSuccess({message: 'Invoice Type removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'invoice-type.controller', 'deleteInvoiceType', res);
    }
}

