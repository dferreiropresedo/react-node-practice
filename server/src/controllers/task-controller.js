import * as TaskService from '../services/taskService'
import { PassThrough } from 'stream'


const user_tasks = async function (request, response, next) {
    const user = response.locals.userData
    response.setHeader('Content-Type', 'application/json')

    TaskService.task_by_userId_stream(user.id)
        .then((taskStream) => {
            // here we transform the Readable stream to a Writable one to be able to send on the response object
            new PassThrough().pipe(taskStream).pipe(response)
        })
        .catch((error) => {
            response.status(500).send({ error: "There was an error trying to find the tasks.", msg: error })
        })

}



const update_task = async function (request, response, next) {
    const user = response.locals.userData
    const taskData = request.body
    TaskService.task_update(parseInt(request.params.id), taskData.description, taskData.timestamp, taskData.status.id, user.id)
        .then((_) => {
            response.send({ id: request.params.id, ...taskData })
        })
        .catch((error) => {
            response.status(500).send({ error: "There was an error trying to add the task.", msg: error })
        })
}



const add_task = function (request, response, next) {
    const user = response.locals.userData
    const taskData = request.body
    TaskService.task_insert(taskData.description, taskData.timestamp, taskData.status.id, user.id)
        .then((insertedId) => {
            response.send({ id: insertedId, ...taskData })
        })
        .catch((error) => {
            response.status(500).send({ error: "There was an error trying to add the task.", msg: error })
        })
}

export { update_task, user_tasks, add_task }