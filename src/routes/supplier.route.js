const router = require("express").Router();
import * as s from"../controllers/supplier.controller";
import { validateToken } from "../middleware/auth.middleware";

router.get("/suppliers/", validateToken, s.getSuppliers);
router.post("/suppliers/", validateToken, s.createSupplier);

export default router;