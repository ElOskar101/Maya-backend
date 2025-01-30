const { initDatabase } = require("../database");
const db = initDatabase();


export const feedDatabase = () => {
    const values = [
        { name: 'Oscar Gonzalez', username:'ElOskar101', password: '1234', role: 1 },
        { name: 'William Acuna', username:'EWacuna', password: '1234', role: 2 },
    ]

    const valuesRole = [{ name: 'admin'}, { name: 'seller'}]

    const userInsert = db.prepare('INSERT INTO user (name, username, password, role) VALUES (@name, @username, @password, @role)');
    const rolInsertQuery = db.prepare('INSERT INTO role (name) VALUES (@name)');

    /*let insertData = db.transaction((values) => {
        for (const value of values) rolInsertQuery.run(value);
    });

    insertData(valuesRole);*/

    let insertData = db.transaction((values) => {
        for (const user of values) userInsert.run(user);
    });

    insertData(values);





    console.log('Default data was inserted into database tables');
}

