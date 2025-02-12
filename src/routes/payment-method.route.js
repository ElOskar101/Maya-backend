const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as mp from "../controllers/payment-method.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/payment-methods", a.validateToken, a.isStandard, mp.getPaymentMethods);
router.get("/payment-methods/", a.validateToken, a.isStandard, mp.getPaymentMethod);
router.post("/payment-methods/", a.validateToken, a.isAdmin, insertManyTransform, mp.createPaymentMethod);
router.put("/payment-methods/:id", a.validateToken, a.isAdmin, updateTransform, mp.modifyPaymentMethod);
router.delete("/payment-methods/:id", a.validateToken, a.isAdmin, mp.deletePaymentMethod);

export default router;