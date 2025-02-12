// For bank and bank account routes
const router = require("express").Router();
import * as a from"../middleware/auth.middleware";
import * as b from"../controllers/bank.controller";
import { updateTransform, insertManyTransform } from '../middleware/body-transformer.middleware'

// Banks
router.get("/banks/", a.validateToken, a.isStandard, b.getBanks);
router.get("/banks/:id", a.validateToken, a.isStandard, b.getBank);
router.post("/banks/", a.validateToken, a.isAdmin, insertManyTransform, b.createBank);
router.put("/banks/:id", a.validateToken, a.isAdmin, updateTransform, b.modifyBank);
router.delete("/banks/:id", a.validateToken, a.isAdmin, b.deleteBank);

// Bank accounts
router.get("/bank-accounts/", a.validateToken, a.isStandard, b.getBankAccounts);
router.get("/bank-accounts/:id", a.validateToken, a.isStandard, b.getBankAccount);
router.post("/bank-accounts/", a.validateToken, a.isAdmin, insertManyTransform, b.createBankAccount);
router.put("/bank-accounts/:id", a.validateToken, a.isAdmin, updateTransform, b.modifyBankAccount);
router.delete("/bank-accounts/:id", a.validateToken, a.isAdmin, b.deleteBankAccount);

export default router;
