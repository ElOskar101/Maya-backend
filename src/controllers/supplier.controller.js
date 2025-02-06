import {onError, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

export const createSupplier = async (req, res) => {
    try{
        const { identification, name, representativeName, cellphone } = req.body;
        const userId = req.userId;

        const query = db.prepare(`INSERT INTO supplier (identification, name, representative_name, cellphone, createdBy) 
                               VALUES (?, ?, ?, ?, ?);`);
        const result = query.run(identification, name, representativeName, cellphone, userId);

        onSuccess(result, res);

    }catch (e) {
     onError(e.message, 'supplier.controller', 'createSupplier', res);
    }
}

export const getSuppliers = async (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM supplier`).all();
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'supplier.controller', 'getSuppliers', res);
    }

}