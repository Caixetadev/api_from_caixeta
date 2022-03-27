module.exports = validationToken => (conn, req, res) => {
    // Create table users
    conn.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, 
        username VARCHAR(255), password VARCHAR(255), token VARCHAR(255))`, (err, results) => {
        if (err) {
            return res.status(500).send({
                error: 'Internal server error'
            });
        }
    });

    const {
        token
    } = req.body;

    //Validar o usuário pelo token mysql
    let query = `SELECT * FROM users WHERE token = '${token}'`;
    conn.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                const user = result[0];
                user.token = token
                user.password = undefined;
                conn.query(query, (err, result) => {
                    res.status(200).send({
                        user
                    });
                });
            } else {
                res.status(401).send({
                    error: 'Invalid TOKEN'
                });
            }
        }
    });
}