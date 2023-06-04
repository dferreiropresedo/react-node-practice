
import { pool } from '../middleware/database/database-config'
import { query_user_login } from '../middleware/database/queries/user-queries'
import { userData } from '../models/user'

/**
 * It goes to the database to query the relevant information about the user and returns it.
 * 
 * @param {userLogin} userLogin 
 * @param {userPass} userPass 
 * @returns The data obtained related to the user.
 */
const user_login = async function (userLogin, userPass) {
    const [result, fields] = await pool.promise()
        .query(query_user_login(userLogin, userPass))
        .catch((error) => {
            throw error
        })

    const userObtained = result[0]
    return userData(userObtained.id, userObtained.name, userObtained.login, userObtained.password)
}

export { user_login }