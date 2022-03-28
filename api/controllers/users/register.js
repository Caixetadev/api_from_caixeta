module.exports = auth => (conn, req, res) => {
    const {
        username,
        password
    } = req.body;
    if(password && username){
        const encryptPassword = require('encrypt-password')
        const encryptedPassword = encryptPassword(password, 'mysignaturekaway')
        //Register with usernamd and password and jwt token
        //Validate username if exist on database

        let query = `SELECT * FROM users WHERE username = '${username}'`;

        conn.query(query, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if(result.length == 0){
                    query = `INSERT INTO users (username, password) VALUES ('${username}', '${encryptedPassword}')`;
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
    } else{
        res.status(401).send({
            error: 'Please provide username and password'
        });
    }
}