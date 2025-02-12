const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as it from"../controllers/invoice-type.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/invoice-types", a.validateToken, a.isStandard, it.getInvoiceTypes);
router.get("/invoice-types/", a.validateToken, a.isStandard, it.getInvoiceType);
router.post("/invoice-types/", a.validateToken, a.isAdmin, insertManyTransform, it.createInvoiceType);
router.put("/invoice-types/:id", a.validateToken, a.isSuperAdmin, updateTransform, it.modifyInvoiceType);
router.delete("/invoice-types/:id", a.validateToken, a.isSuperAdmin, it.deleteInvoiceType);

export default router;