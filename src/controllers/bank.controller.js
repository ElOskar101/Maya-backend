import {onError, onNotAllowed, onNotFound, onSuccess} from "../../libs/utils/res-handler";
const { initDatabase } = require("../../database");
const db = initDatabase();

// GET bank
export const getBanks = (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM bank`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'bank.controller', 'getBanks', res);
    }
}

// GET bank:id
export const getBank= (req, res) => {
    try{
        const result = db.prepare(`SELECT * FROM bank WHERE id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'bank.controller', 'getBank', res);
    }
}

// POST bank
export const createBank = async (req, res) => {
    try{

        const { name , telephone } = req.body;

        const result = db.prepare(`INSERT INTO bank (name, telephone)  VALUES (?, ?);`).run(name, telephone);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'bank.controller', 'createBank', res);
    }
}

// PUT bank
export const modifyBank = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE bank SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No bank found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'bank.controller', 'modifyBank', res);
    }
}

// DELETE bank
export const deleteBank = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM bank WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No bank found', res);

        onSuccess({message: 'Bank removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'bank.controller', 'deleteBank', res);
    }
}

/*BANK ACCOUNTS*/
// GET bank account
export const getBankAccounts = (req, res) => {
    try{
        const result = db.prepare(`SELECT bank_account.*, currency_type.name AS currency_type, bank.name AS bank
                                    FROM bank_account
                                    JOIN currency_type ON currency_type.id = bank_account.currency_type
                                    JOIN bank ON bank.id = bank_account.bank;`).all();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'bank.controller', 'getBankAccount', res);
    }
}

// GET bank account:id
export const getBankAccount= (req, res) => {
    try{
        const result = db.prepare(`SELECT bank_account.*, currency_type.name AS currency_type, bank.name AS bank
                                    FROM bank_account
                                    JOIN currency_type ON currency_type.id = bank_account.currency_type
                                    JOIN bank ON bank.id = bank_account.bank
                                    WHERE bank_account.id = ${req.params.id}`).get();
        onSuccess(result || {}, res);
    }catch(e){
        onError(e.message, 'bank.controller', 'getBankAccount', res);
    }
}

// POST bank account
export const createBankAccount = async (req, res) => {
    try{

        const { accountNumber, accountHolderName, currencyType, bank } = req.body;

        const result = db.prepare(`INSERT INTO bank_account (account_number, account_holder_name, currency_type, bank)  
                                   VALUES (?, ?, ?, ?);`).run(accountNumber, accountHolderName, currencyType, bank);

        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'bank.controller', 'createBankAccount', res);
    }
}

// PUT bank account
export const modifyBankAccount = (req, res) =>{
    try{
        const query = db.prepare(`UPDATE bank SET ${req.queryFields} WHERE id = ?`);
        const result = query.run(...req.queryValues);
        if (result.changes === 0) return onNotFound('No bank found', res);
        onSuccess(result, res);
    }catch (e) {
        onError(e.message, 'bank.controller', 'modifyBankAccount', res);
    }
}

// DELETE bank
export const deleteBankAccount = (req, res) =>{
    try{
        const query = db.prepare(`DELETE FROM bank_account WHERE id = ${req.params.id}`);
        const result = query.run();
        if (result.changes === 0) return onNotFound('No bank account found', res);

        onSuccess({message: 'Bank account removed successfully'}, res);
    }catch (e) {
        onError(e.message, 'bank.controller', 'deleteBankAccount', res);
    }
}