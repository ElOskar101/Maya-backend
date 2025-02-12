const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as d from"../controllers/department.controller";
import transformQuery from '../middleware/body-transformer.middleware'

router.get("/departments/", a.validateToken, a.isStandard, d.getDepartments);
router.get("/departments/:id", a.validateToken, a.isStandard, d.getDepartment);
/*router.post("/departments/", a.validateToken, a.isAdmin, d.createDepartment);
router.put("/departments/:id", a.validateToken, a.isAdmin, transformQuery, d.modifyDepartment);
router.delete("/departments/:id", a.validateToken, a.isAdmin, transformQuery, d.deleteDepartment);*/

export default router;