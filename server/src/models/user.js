
const userData = function(userId, userName, userLogin, userPassword, userTasks) {
    var taskList = []
    if (userTasks) {
        taskList = userTasks
    }


    return {
        id: userId,
        name: userName,
        login: userLogin,
        password: userPassword,
        tasks: taskList
    }
}

export { userData }
