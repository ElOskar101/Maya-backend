import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getDocuments = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM document`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'document.controller', 'getDocuments', res);
    }
}

// GET:id
export const getDocument= (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM document WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'document.controller', 'getDocument', res);
    }
}

// POST
export const createDocument = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO document (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
            .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'document.controller', 'createDocument', res);
    }
}

// PUT
export const modifyDocument = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE document SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No document found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'document.controller', 'modifyDocument', res);
    }
}

// DELETE
export const deleteDocument = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM document WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No document found', res);

        onSuccess({message: 'Document removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'document.controller', 'deleteDocument', res);
    }
}

