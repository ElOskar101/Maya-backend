const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as mu from "../controllers/measurement-unit.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/measurement-units", a.validateToken, a.isStandard, mu.getMeasurementUnits);
router.get("/measurement-units/", a.validateToken, a.isStandard, mu.getMeasurementUnit);
router.post("/measurement-units/", a.validateToken, a.isAdmin, insertManyTransform, mu.createMeasurementUnit);
router.put("/measurement-units/:id", a.validateToken, a.isAdmin, updateTransform, mu.modifyMeasurementUnit);
router.delete("/measurement-units/:id", a.validateToken, a.isAdmin, mu.deleteMeasurementUnit);

export default router;