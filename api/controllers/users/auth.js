module.exports = auth => (conn, req, res) => {
    //Use JWT
    const jwt = require('jsonwebtoken');

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
        username,
        password
    } = req.body;
    let query = `SELECT * FROM users WHERE username = '${username}'`;
    conn.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                const user = result[0];
                if (user.password === password) {
                    const token = jwt.sign({
                        id: user.id + `_kaway`
                    }, process.env.JWT_SECRET);
                    user.token = token
                    //Update token in database
                    query = `UPDATE users SET token = '${token}' WHERE id = ${user.id}`;
                    user.password = undefined;
                    conn.query(query, (err, result) => {
                        res.status(200).send({
                            user
                        });
                    });
                } else {
                    res.status(401).send({
                        error: 'Invalid credentials'
                    });
                }
            } else {
                res.status(401).send({
                    error: 'Invalid credentials'
                });
            }
        }
    });
}