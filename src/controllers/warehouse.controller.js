import {onError, onNotAllowed, onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getWarehouses = (req, res) => {
    try{
        const result = db.prepare(`SELECT warehouse.*, enterprise.name AS enterprise, department.name AS department 
                                   FROM warehouse 
                                   JOIN enterprise ON  enterprise.id = warehouse.enterprise
                                   JOIN department on department.id = warehouse.department 
                                   WHERE department.id = warehouse.department`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'warehouse.controller', 'getWarehouses', res);
    }
}

// GET:id
export const getWarehouse= (req, res) => {
    try{
        const result = db.prepare(`SELECT warehouse.*, enterprise.name AS enterprise, department.name AS department 
                                   FROM warehouse 
                                   JOIN enterprise ON  enterprise.id = warehouse.enterprise
                                   JOIN department on department.id = warehouse.department
                                   WHERE enterprise.id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'warehouse.controller', 'getWarehouse', res);
    }
}

// POST
export const createWarehouse = async (req, res) => {
    try{

        const enterprise = db.prepare("SELECT * FROM enterprise").get();
        if (!enterprise) return onNotAllowed('Create an enterprise first.', res);

        const result = db.prepare(`INSERT INTO warehouse (${req.queryFields})
                                  VALUES ${req.queryPlaceholders};`).run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'warehouse.controller', 'createWarehouse', res);
    }
}

// PUT
export const modifyWarehouse = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE warehouse SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No warehouse found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'warehouse.controller', 'modifyWarehouse', res);
    }
}

// DELETE
export const deleteWarehouse = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM warehouse WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No warehouse found', res);

        onSuccess({message: 'Warehouse removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'warehouse.controller', 'deleteWarehouse', res);
    }
}