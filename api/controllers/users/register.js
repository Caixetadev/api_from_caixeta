module.exports = auth => (conn, req, res) => {
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
    //Register with usernamd and password and jwt token
    //Validate username if exist on database

    let query = `SELECT * FROM users WHERE username = '${username}'`;

    conn.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if(result.length == 0){
                query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
                conn.query(query, (err, result) => {
                    if(!err){
                        res.status(200).send({
                            message: `User ${username} created`
                        });
                    }
                })
                
            } else{
                res.status(409).send({
                    error: 'User already exists'
                });
            }
        }
    });
}