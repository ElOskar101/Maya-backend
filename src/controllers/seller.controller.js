import {onError, onNotAllowed, onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getSellers = (req, res) => {
    try{
        const result = db.prepare(`SELECT seller.*, user.name AS createdBy 
                                   FROM seller
                                   JOIN user ON user.id = seller.createdBy`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'seller.controller', 'getSellers', res);
    }
}

// GET:id
export const getSeller= (req, res) => {
    try{
        const result = db.prepare(`SELECT seller.*, user.name AS createdBy 
                                   FROM seller
                                   JOIN user ON user.id = seller.createdBy
                                   WHERE seller.id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'seller.controller', 'getSeller', res);
    }
}

// POST
export const createSeller = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO seller (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
            .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'seller.controller', 'createSeller', res);
    }
}

// PUT
export const modifySeller = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE seller SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No seller found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'seller.controller', 'modifySeller', res);
    }
}

// DELETE
export const deleteSeller = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM seller WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No seller found', res);

        onSuccess({message: 'Seller removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'seller.controller', 'deleteSeller', res);
    }
}

