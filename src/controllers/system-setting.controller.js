import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getSystemSettings = (req, res) => {
    try{
        const result = db.prepare(`SELECT system_setting.*, currency_type.name AS currency_type, 
                                   warehouse.name AS warehouse 
                                   FROM system_setting
                                   JOIN currency_type ON system_setting.currency_type = currency_type.id
                                   LEFT JOIN warehouse ON system_setting.warehouse = warehouse.id`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'system-settings.controller', 'getSystemSettings', res);
    }
}

// PUT
export const modifySystemSettings = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE system_setting SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);

        if (result.changes === 0) return onNotFound('No setting found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'system-settings.controller', 'modifySystemSettings', res);
    }
}
