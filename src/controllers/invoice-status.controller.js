import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getInvoiceStatuses = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM invoice_status`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'invoice-status.controller', 'getInvoiceStatus', res);
    }
}

// GET:id
export const getInvoiceStatus = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM invoice_status WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'invoice-status.controller', 'getInvoiceStatus', res);
    }
}

// POST
export const createInvoiceStatus = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO invoice_status (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
            .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'invoice-status.controller', 'createInvoiceStatus', res);
    }
}

// PUT
export const modifyInvoiceStatus = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE invoice_status SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);

        if (result.changes === 0) return onNotFound('No invoice status found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'invoice-status.controller', 'modifyInvoiceStatus', res);
    }
}

// DELETE
export const deleteInvoiceStatus = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM invoice_status WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No invoice status found', res);

        onSuccess({message: 'Invoice status removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'invoice-status.controller', 'deleteInvoiceStatus', res);
    }
}

