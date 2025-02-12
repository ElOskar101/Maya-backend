const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as c from"../controllers/client.controller";
import {updateTransform, insertManyTransform} from '../middleware/body-transformer.middleware'

router.get("/clients/", a.validateToken, a.isStandard, c.getClients);
router.get("/clients/:id", a.validateToken, a.isStandard, c.getClient);
router.post("/clients/", a.validateToken, a.isStandard, insertManyTransform, c.createClient);
router.put("/clients/:id", a.validateToken, a.isStandard, updateTransform, c.modifyClient);
router.delete("/clients/:id", a.validateToken, a.isAdmin, c.deleteClient);

export default router;