const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as w from"../controllers/warehouse.controller";
import transformQuery from '../middleware/put-transformer.middleware'

router.get("/warehouses/", a.validateToken, a.isStandard, w.getWarehouses);
router.get("/warehouses/:id", a.validateToken, a.isStandard, w.getWarehouse);
router.post("/warehouses/", a.validateToken, a.isAdmin, w.createWarehouse);
router.put("/warehouses/:id", a.validateToken, a.isAdmin, transformQuery, w.modifyWarehouse);
router.delete("/warehouses/:id", a.validateToken, a.isAdmin, transformQuery, w.deleteWarehouse);

export default router;