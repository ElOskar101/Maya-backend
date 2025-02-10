const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as e from"../controllers/enterprise.controller";
import transformQuery from '../middleware/put-transformer.middleware'

router.get("/enterprise/", a.validateToken, a.isStandard, e.getEnterprise);
router.post("/enterprise/", a.validateToken, a.isAdmin, e.createEnterprise);
router.put("/enterprise/:id", a.validateToken, a.isAdmin, transformQuery, e.modifyEnterprise);

export default router;