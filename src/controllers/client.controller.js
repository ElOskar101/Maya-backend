import {onError, onNotAllowed, onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getClients = (req, res) => {
    try{
        const result = db.prepare(`SELECT client.*, currency_type.name AS credit_currency, user.name AS createdBy,
                                   department.name AS department, seller.name AS seller
                                   FROM client
                                   JOIN currency_type ON client.credit_currency = currency_type.id
                                   JOIN user ON client.createdBy = user.id
                                   JOIN department ON client.department = department.id
                                   JOIN seller ON client.seller = seller.id`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'client.controller', 'getClients', res);
    }
}

// GET:id
export const getClient= (req, res) => {
    try{
        const result = db.prepare(`SELECT client.*, currency_type.name AS credit_currency, user.name AS createdBy,
                                   department.name AS department, seller.name AS seller
                                   FROM client
                                   JOIN currency_type ON client.credit_currency = currency_type.id
                                   JOIN user ON client.createdBy = user.id
                                   JOIN department ON client.department = department.id
                                   JOIN seller ON client.seller = seller.id
                                   WHERE client.id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'client.controller', 'getClient', res);
    }
}

// POST
export const createClient = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO client (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
                         .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'client.controller', 'createClient', res);
    }
}

// PUT
export const modifyClient = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE client SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No client found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'client.controller', 'modifyClient', res);
    }
}

// DELETE
export const deleteClient = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM client WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No client found', res);

        onSuccess({message: 'Client removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'client.controller', 'deleteClient', res);
    }
}

