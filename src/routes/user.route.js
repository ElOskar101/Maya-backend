import {getMyUser} from "../controllers/user.controller";

const router = require("express").Router();
import * as u from"../controllers/user.controller";
import { validateToken } from "../middleware/auth.middleware";

router.get("/users/me", validateToken, u.getMyUser);

export default router;