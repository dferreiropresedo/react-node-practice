import * as UserService from '../services/userServices'


const user_information = function (request, response, next) {
    const { password: _, ...userInformation } = response.locals.userData
    response.send(userInformation)
}



/**
 * Check if the user exists. If so, it returns on the headers the correspondent token to authenticate future requests.
 * 
 * @param {request} request Request data
 * @param {response} response  Response data
 * @param {next} next  Next middleware
 */
const user_login = function (request, response, next) {
    UserService.user_login(request.body.login, request.body.password)
        .then((userData) => {
            // generate the token to be used by the client
            const auth_token = Buffer.from(userData.login + ":" + userData.password).toString('base64')
            // remove the sensible data from the response
            const { password: _, ...responseBody } = userData
            response.append("access-token", auth_token).send(responseBody)
        })
        .catch((error) => {
            response.status(404).send("The credentials used are not valid.")
        })
}



/**
 * Queries the database based on the token received on the Authorization header and checks if the user exists.
 * If the user does not exist, it sends a 401 header. Otherwise, let the flow goes to the next middleware.
 * 
 * @param {request} request Request data
 * @param {response} response Response data
 * @param {next} next next middleware
 */
const user_validation = function (request, response, next) {
    const access_token = request.get('Authorization').replace('Bearer ', '')
    const sensibleData = Buffer.from(access_token, 'base64').toString('utf8').split(':')
    UserService.user_login(sensibleData[0], sensibleData[1])
        .then((userFound) => {
            if (!userFound) {
                response.status(401).send("You are not allowed to perform this operation")
            } else {
                response.locals.userData = userFound
                next()
            }
        })
        .catch((error) => {
            response.status(500).send(error)
        })
}


export { user_information, user_login, user_validation } 