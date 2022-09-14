const cassandra = require('cassandra-driver');
const config = require('config');
const cassandraConfig = config.get('cassandra');
const client = new cassandra.Client(cassandraConfig);
const { v4: uuidv4 } = require('uuid');

const registerUser = async ( username, password) => {
    const query = `insert into daas_ks.users (id,name,password) values(?,?,?);`;
    client.execute(query,[uuidv4(),username,password]);
}

const getPasswordForUsername = async (username) => {
    const query = `select password from daas_ks.users where name = ? ALLOW FILTERING`;
    return client.execute(query,[username]).then(result => {
        if(!result.rows.length){
            return null;
        }
        return result.rows[0].password;
    });
}

module.exports = {
    registerUser,
    getPasswordForUsername
}

