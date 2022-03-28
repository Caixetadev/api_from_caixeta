module.exports = createTable => (conn) => {
    // Create table users
    conn.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, 
        username VARCHAR(255), password VARCHAR(255), photo LONGTEXT, token VARCHAR(255), admin int)`, (err, results) => {
        if (err) {
            return res.status(500).send({
                error: 'Internal server error'
            });
        }
    });
}