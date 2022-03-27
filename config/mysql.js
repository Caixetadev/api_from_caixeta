module.exports = conn => (database) => {
    const mysql = require('mysql');

    const conn = mysql.createConnection({
        host: database.host, // O host do banco. Ex: localhost
        user: database.username, // Um usuário do banco. Ex: user 
        password: database.password, // A senha do usuário. Ex: user123
        database: database.db // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    });

    return conn;
}