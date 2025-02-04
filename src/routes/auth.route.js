import {validateUserExistence} from "../middleware/auth.middleware";

const router = require("express").Router();
import * as auth from"../middleware/auth.middleware";
import * as a from"../controllers/auth.controller";

router.post("/auth/login", auth.validateUserExistence, a.sendToken);

export default router;