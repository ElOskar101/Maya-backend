import {onError, onNotAllowed, onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getDepartments = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM department;`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'department.controller', 'getDepartments', res);
    }
}

// GET:id
export const getDepartment = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM department WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'department.controller', 'getDepartment', res);
    }
}

/*
// POST
export const createDepartment = async (req, res) => {
    try{

        const { name , address, department } = req.body;

        const enterprise = db.prepare("SELECT * FROM enterprise").get();
        if (!enterprise) return onNotAllowed('Create a enterprise first.', res);

        const result = db.prepare(`INSERT INTO warehouse (name, address, department, enterprise) 
                                  VALUES (?, ?, ?, ?);`).run(name, address, department, enterprise.id);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'department.controller', 'createDepartment', res);
    }
}

// PUT
export const modifyDepartment = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE warehouse SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No warehouse found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'department.controller', 'modifyDepartment', res);
    }
}

// DELETE
export const deleteDepartment = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM warehouse WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No warehouse found', res);

        onSuccess({message: 'Department removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'warehouse.controller', 'deleteDepartment', res);
    }
}*/