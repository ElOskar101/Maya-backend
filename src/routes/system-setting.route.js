const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as ss from "../controllers/system-setting.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/system-settings", a.validateToken, a.isStandard, ss.getSystemSettings);
/*router.get("/system-setting/:id", a.validateToken, a.isStandard, ss.getInvoiceStatus);
router.post("/system-setting/", a.validateToken, a.isAdmin, insertManyTransform, ss.createInvoiceStatus);*/
router.put("/system-settings/:id", a.validateToken, a.isAdmin, updateTransform, ss.modifySystemSettings);
//router.delete("/system-setting/:id", a.validateToken, a.isAdmin, ss.deleteInvoiceStatus);*/

export default router;