import { escape } from 'mysql2'

const query_user_by_id = function(userId) {
    return `
        SELECT id, name, login
        FROM user u
        WHERE u.id = ${escape(userId)} 
    `
}

const query_user_login = function(userLogin, userPass) {
    return `
        SELECT id, name, login, password
        FROM user u
        WHERE u.login = ${escape(userLogin)} AND u.password = ${escape(userPass)}
    `
}

export { query_user_by_id, query_user_login }