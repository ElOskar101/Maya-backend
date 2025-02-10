import {onError, onNotAllowed, onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getEnterprise = (req, res) => {
    try{
        const result = db.prepare("SELECT * FROM enterprise").get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'enterprise.controller', 'getEnterprise', res);
    }
}

// POST
export const createEnterprise = async (req, res) => {
    try{
        const { name, address, cellphone, logo } = req.body;
        const enterprise = db.prepare("SELECT * FROM enterprise").get();
        if (enterprise) return onNotAllowed('Only one enterprise is allowed.', res);

        const result = db.prepare(`INSERT INTO enterprise (name, address, cellphone, logo) 
                                  VALUES (?, ?, ?, ?);`).run(name, address, cellphone, logo);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'enterprise.controller', 'createEnterprise', res);
    }
}

// PUT
export const modifyEnterprise = (req, res) =>{
    try{

        const query = db.prepare(`UPDATE enterprise SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No enterprise found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'enterprise.controller', 'modifyEnterprise', res);
    }
}