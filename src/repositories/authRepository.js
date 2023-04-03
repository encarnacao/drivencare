import database from '../config/database.js';

async function searchEmail(email, table){
    const query = "SELECT * FROM " + table + " WHERE email = $1";
    const { rows } = await database.query(query, [email]);
    return rows;
}

function deleteByEmail(email, table){
    const query = "DELETE FROM " + table + " WHERE email = $1";
    return database.query(query, [email]);
}

export default { searchEmail, deleteByEmail }