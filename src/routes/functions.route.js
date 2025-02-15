import {validateUserExistence} from "../middleware/auth.middleware";

const router = require("express").Router();
import * as f from"../controllers/functions.controller";

router.post("/functions/test", f.createSerialLicence);

export default router;