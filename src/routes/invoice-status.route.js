const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as is from "../controllers/invoice-status.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/invoice-status", a.validateToken, a.isStandard, is.getInvoiceStatuses);
router.get("/invoice-status/:id", a.validateToken, a.isStandard, is.getInvoiceStatus);
router.post("/invoice-status/", a.validateToken, a.isAdmin, insertManyTransform, is.createInvoiceStatus);
router.put("/invoice-status/:id", a.validateToken, a.isAdmin, updateTransform, is.modifyInvoiceStatus);
router.delete("/invoice-status/:id", a.validateToken, a.isAdmin, is.deleteInvoiceStatus);

export default router;