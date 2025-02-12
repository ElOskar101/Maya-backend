const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as d from"../controllers/document.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/documents", a.validateToken, a.isStandard, d.getDocuments);
router.get("/documents/", a.validateToken, a.isStandard, d.getDocument);
router.post("/documents/", a.validateToken, a.isSuperAdmin, insertManyTransform, d.createDocument);
router.put("/documents/:id", a.validateToken, a.isSuperAdmin, updateTransform, d.modifyDocument);
router.delete("/documents/:id", a.validateToken, a.isSuperAdmin, d.deleteDocument);

export default router;