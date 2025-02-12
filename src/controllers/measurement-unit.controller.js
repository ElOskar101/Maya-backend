import {onError,  onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET
export const getMeasurementUnits = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM measurement_unit`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'measurement-unit.controller', 'getMeasurementUnits', res);
    }
}

// GET:id
export const getMeasurementUnit= (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM measurement_unit WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'measurement-unit.controller', 'getMeasurementUnit', res);
    }
}

// POST
export const createMeasurementUnit = async (req, res) => {
    try{
        const result = db.prepare(`INSERT INTO measurement_unit (${req.queryFields})  VALUES ${req.queryPlaceholders};`)
            .run(req.queryValues);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'measurement-unit.controller', 'createMeasurementUnit', res);
    }
}

// PUT
export const modifyMeasurementUnit = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE measurement_unit SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);

        if (result.changes === 0) return onNotFound('No measurement unit found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'measurement-unit.controller', 'modifyMeasurementUnit', res);
    }
}

// DELETE
export const deleteMeasurementUnit = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM measurement_unit WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No measurement unit found', res);

        onSuccess({message: 'Measurement unit removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'measurement-unit.controller', 'deleteMeasurementUnit', res);
    }
}

