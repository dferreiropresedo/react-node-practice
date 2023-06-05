
import { pool } from '../middleware/database/database-config'
import * as taskQueries from '../middleware/database/queries/task-queries'
import { taskData } from '../models/task'
import { stateData } from '../models/state'
import { Transform } from 'stream'


const task_by_userId = async function (userId) {
    const dataArray = []

    const [result, fields] = await pool.promise()
        .query(taskQueries.query_task_by_userId(userId))
        .catch((error) => {
            throw error
        })

    // we group here all the elements under the same status
    result.forEach((element) => {
        const state = stateData(element.status_id, element.status_name)
        const taskInfo = taskData(element.task_id, element.description, new Date(element.timestamp * 1000), element.timestamp, state)
        dataArray.push(taskInfo)
    })

    const helper = {}
    const dataGrouped = result.reduce(function (finalValue, element) {
        const key = element.status_id
        const state = stateData(element.status_id, element.status_name)
        const taskInfo = taskData(element.task_id, element.description, new Date(element.timestamp * 1000), element.timestamp, null)

        if (!helper[key]) {
            helper[key] = { status: state, tasks: [taskInfo] }
            finalValue.push(helper[key])
        } else {
            helper[key]['tasks'].push(taskInfo)
        }

        return finalValue
    }, [])

    return dataGrouped
}

/**
 * Given a object, it is in charge of stringify to the corresponding JSON format.
 */
const stringifyStream = () => new Transform({
    objectMode: true,
    transform: (element, encoding, callback) => {
        callback(null, JSON.stringify(element))
    }
})

/**
 * Function that will be applied on the reduce pipe. It is in charge of ordering the information according to the possible states.
 * 
 * @param {result} result The actual result on the current state of the reduce function
 * @param {task} task The new element to be reduced
 * @returns Given the current state of the reduce operation, it returns the state after adding the new task information.
 */
const taskReduceFunction = (result, task) => {
    const key = task.status.id
    const { status: taskState, ...taskInfo } = task

    if (!result[key]) {
        result[key] = { status: taskState, tasks: [taskInfo] }
    } else {
        result[key]['tasks'].push(taskInfo)
    }
    return result
}

/**
 * Pipe in charge of reducing the data from the database to the format needed on the front. In this case, it groups
 * the tasks by the possible states
 * 
 * @param {reduceFunction} reduceFunction Function which will be applied to each one of the elements
 * @param {accumulator} accumulator Accumulator where the final data will be stored
 * @returns A transform pipe with the data reduced to the needed format
 */
const taskReducePipe = (reduceFunction, accumulator) =>
    new Transform({
        objectMode: true,
        transform(element, encoding, callback) {
            try {
                accumulator = reduceFunction(accumulator, element)
            } catch (error) {
                callback(error)
            }

            return callback()
        },
        flush(callback) {
            const tasksArray = []
            for (const property in accumulator) {
                tasksArray.push(accumulator[property])
            }

            callback(null, tasksArray)
        }
    })

/**
 * Pipe which is in charge of, given the data from the database, to parse it to the corresponding format
 */
const dataParserPipe = () => new Transform({
    objectMode: true,
    transform(element, encoding, callback) {
        const state = stateData(element.status_id, element.status_name)
        const taskInfo = taskData(element.task_id, element.description, new Date(element.timestamp * 1000), element.timestamp, state)
        callback(null, taskInfo);
    },
})

/**
 * It returns the list of the tasks associated to the user using streams of data. The user in action wull be the one who made the request. 
 * 
 * @param {userId} userId 
 * @returns A stream of data which consumes the data from database and parses it to JSON format.
 */
const task_by_userId_stream = async function (userId) {

    // Generate a stream to get the data from the database
    const dataStream = await pool.query(taskQueries.query_task_by_userId(userId))
        .stream({ highWaterMark: 5 })

    // It sends the data through a set of pipes, each one of them is in charge of a specific task. Bear in mind that since the responde object
    // from the express dependency is a Writable Stream without objectMode activated, it is need to stringify the contents to be written.
    const transformedStream = dataStream
        .pipe(dataParserPipe())
        .pipe(taskReducePipe(taskReduceFunction, {}))
        .pipe(stringifyStream())

    return transformedStream
}


/**
 * Given the id of the task to update, and its new information, it updates the corresponding task if the user owns it. Otherwise, it ignores the update.
 * 
 * 
 * @param {taskId} taskId 
 * @param {taskDescription} taskDescription 
 * @param {taskTimestamp} taskTimestamp 
 * @param {statusId} statusId 
 * @param {userId} userId 
 */
const task_update = async function (taskId, taskDescription, taskTimestamp, statusId, userId) {
    await pool.promise()
        .query(taskQueries.query_task_update(taskId, taskDescription, new Date(taskTimestamp * 1000), taskTimestamp, statusId, userId))
        .catch((error) => {
            throw error
        })
}


/**
 * Given the data of a task, it inserts a new one associated to the user who is making the request.
 * 
 * @param {taskDescription} taskDescription 
 * @param {taskTimestamp} taskTimestamp 
 * @param {statusId} statusId 
 * @param {userId} userId 
 * @returns The id of the inserted row.
 */
const task_insert = async function (taskDescription, taskTimestamp, statusId, userId) {
    const [results] = await pool.promise()
        .query(taskQueries.query_task_insert(taskDescription, new Date(taskTimestamp * 1000), taskTimestamp, statusId, userId))
        .catch((error) => {
            throw error
        })
    return results.insertId
}


const task_delete = async function (taskId, userId) {
    const data = await pool.promise()
    .query(taskQueries.query_task_delete(taskId, userId))
    .catch( (error) => {
        throw error
    })
}


export { task_by_userId, task_update, task_insert, task_by_userId_stream, task_delete }