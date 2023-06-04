
const taskData = function(taskId, taskDescription, taskDate, taskTimestamp, taskStatus) {
    const taskInfo = {
        id: taskId,
        description: taskDescription,
        date: taskDate,
        timestamp: taskTimestamp
    }
    
    if (taskStatus) {
        taskInfo.status = taskStatus
    }

    return taskInfo
}


export { taskData }
