const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as w from"../controllers/warehouse.controller";
import { updateTransform, insertManyTransform } from '../middleware/body-transformer.middleware'

router.get("/warehouses/", a.validateToken, a.isStandard, w.getWarehouses);
router.get("/warehouses/:id", a.validateToken, a.isStandard, w.getWarehouse);
router.post("/warehouses/", a.validateToken, a.isAdmin, insertManyTransform, w.createWarehouse);
router.put("/warehouses/:id", a.validateToken, a.isAdmin, updateTransform, w.modifyWarehouse);
router.delete("/warehouses/:id", a.validateToken, a.isAdmin, w.deleteWarehouse);

export default router;