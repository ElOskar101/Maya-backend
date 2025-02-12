const { initDatabase } = require("../database");
const db = initDatabase();
import seeds from './seeds';


export const feedDatabase = async () => {
    const tables = ['bank', 'currency_type', 'department', 'document', 'measurement_unit',
        'payment_method', 'role', 'invoice_status', 'invoice_type', 'user', 'product_status', 'system_setting'];

    for (const table of tables) {
        const values = db.prepare(`SELECT * FROM '${table}'`).all();
        if (values.length > 0) continue;
        db.prepare(seeds[table]).run();
    }

    console.log('Default data was inserted into tables');
}

