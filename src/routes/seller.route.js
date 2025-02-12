const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as s from"../controllers/seller.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/sellers/", a.validateToken, a.isStandard, s.getSellers);
router.get("/sellers/:id", a.validateToken, a.isStandard, s.getSeller);
router.post("/sellers/", a.validateToken, a.isStandard, insertManyTransform, s.createSeller);
router.put("/sellers/:id", a.validateToken, a.isStandard, updateTransform, s.modifySeller);
router.delete("/sellers/:id", a.validateToken, a.isAdmin, s.deleteSeller);

export default router;