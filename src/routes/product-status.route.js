const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as ps from "../controllers/product-status.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/product-status", a.validateToken, a.isStandard, ps.getProductStatuses);
router.get("/product-status/:id", a.validateToken, a.isStandard, ps.getProductStatus);
router.post("/product-status/", a.validateToken, a.isAdmin, insertManyTransform, ps.createProductStatus);
router.put("/product-status/:id", a.validateToken, a.isAdmin, updateTransform, ps.modifyProductStatus);
router.delete("/product-status/:id", a.validateToken, a.isAdmin, ps.deleteProductStatus);

export default router;