const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as ct from"../controllers/currency-type.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/currency-types", a.validateToken, a.isStandard, ct.getCurrencyTypes);
router.get("/currency-types/id", a.validateToken, a.isStandard, ct.getCurrencyType);
router.post("/currency-types/", a.validateToken, a.isStandard, insertManyTransform, ct.createCurrencyType);
router.put("/currency-types/:id", a.validateToken, a.isStandard, updateTransform, ct.modifyCurrencyType);
router.delete("/currency-types/:id", a.validateToken, a.isAdmin, ct.deleteCurrencyType);

export default router;