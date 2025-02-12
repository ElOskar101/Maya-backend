import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getCurrencyTypes = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM currency_type`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'currency-type.controller', 'getCurrencyTypes', res);
    }
}

// GET:id
export const getCurrencyType= (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM currency_type WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'currency-type.controller', 'getCurrencyType', res);
    }
}

// POST
export const createCurrencyType = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO currency_type (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
            .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'currency-type.controller', 'createCurrencyType', res);
    }
}

// PUT
export const modifyCurrencyType = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE currency_type SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No currency type found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'currency-type.controller', 'modifyCurrencyType', res);
    }
}

// DELETE
export const deleteCurrencyType = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM currency_type WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No currency type found', res);

        onSuccess({message: 'Currency type removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'currency-type.controller', 'deleteCurrencyType', res);
    }
}

