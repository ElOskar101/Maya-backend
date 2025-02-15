import {onError, onSuccess} from "../../libs/utils/res-handler";
const crypto = require('crypto');
const fs = require('fs');
import path from "path";

export const createSerialLicence = (req, res) => {
    try{

        const privateKey = fs.readFileSync(path.join(__dirname, `../../private.pem`), 'utf8');


        const { mac, serial, uuid, company }  =  {
            mac: '00:1A:2B:3C:4D:5E',
            serial: 'ABC123XYZ',
            uuid: '550e8400-e29b-41d4-a716-446655440000',
            company: 'Mi Empresas'
        }

        const dataString = `${mac}|${serial}|${uuid}|${company}`;

        const hash = crypto.createHash('sha256').update(dataString).digest('hex');

        const signature = crypto.sign('sha256', Buffer.from(hash), privateKey).toString('base64');

        onSuccess(signature, res);
    }catch (e) {
        onError(e.message, 'functions.controller', 'createSerialLicense', res);
    }
}