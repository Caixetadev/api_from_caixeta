const auth = require('../controllers/users/auth');
const register = require('../controllers/users/register');
const validationToken = require('../controllers/users/validationToken');

module.exports = conn => {
    return [{
        route: `/auth`,
        controller: auth(conn),
        method: `post`
    }, 
    {
        route: `/auth/register`,
        controller: register(conn),
        method: `post`
    },  
    {
        route: `/auth/validationToken`,
        controller: validationToken(conn),
        method: `post`
    }, 
    {
        route: `*`,
        controller: conn => {
            return `ERROR 404 NOT FOUND`
        }
    }]
}