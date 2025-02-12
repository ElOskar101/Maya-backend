import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getPaymentMethods = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM payment_method`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'payment-method.controller', 'getPaymentMethods', res);
    }
}

// GET:id
export const getPaymentMethod= (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM payment_method WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'payment-method.controller', 'getPaymentMethod', res);
    }
}

// POST
export const createPaymentMethod = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO payment_method (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
            .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'payment-method.controller', 'createPaymentMethod', res);
    }
}

// PUT
export const modifyPaymentMethod = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE payment_method SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);

        if (result.changes === 0) return onNotFound('No payment method found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'payment-method.controller', 'modifyPaymentMethod', res);
    }
}

// DELETE
export const deletePaymentMethod = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM payment_method WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No payment method found', res);

        onSuccess({message: 'Payment method removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'payment-method.controller', 'deletePaymentMethod', res);
    }
}

