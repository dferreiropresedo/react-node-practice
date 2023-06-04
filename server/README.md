# Server

## What is it

This is a server developed using the following technologies:

* [NodeJS](https://nodejs.org/dist/latest-v18.x/docs/api/) v18.16.0
* [Express](https://expressjs.com/) v4.18.2
* [mysql2](https://github.com/sidorares/node-mysql2) v3.3.3

---

## Booting up

### Database configuration

First, we need to have a mysql database running on our machine. Concretely, we will need to follow the configuration specified on this [configuration file](https://github.com/dferreiropresedo/react-node-practice/blob/main/server/src/middleware/database/database-config.js):

``` javascript
const _pool = createPool({
    connectionLimit: 5,
    user: 'node-user',
    password: 'node-pass',
    database: 'node_db',
    host: 'localhost',
    port: 3306
})
```

Even though the credentials are stored here on clear text, they should be enmasked using [DotEnv](https://github.com/motdotla/dotenv), but for the sake of simplicity, they were declared in clear text.


### Server boot-up

To start the server it is necessary to execute the following commands:

``` bash
npm install
npm start
```

---

## Features


* User
  * Login
  * Information

* Tasks
  * Add a new task to the user
  * Update a new task to the user
  * List all the tasks from the user
  * Remove a task from the user (WIP)

---

## Code highlights

In this section I will remark some code snippets of what I am particularly proud.

### Datasource pooling with promises

``` javascript
const [results] = await pool.promise()
    .query(taskQueries.query_task_insert(taskDescription, new Date(taskTimestamp * 1000), taskTimestamp, statusId, userId))
    .catch((error) => {
        throw error
    })
return results.insertId
```

This code can be found on line [TaskService:149](https://github.com/dferreiropresedo/react-node-practice/blob/main/server/src/services/taskService.js#L149).

We can observe that a pool of connections is used here so as to be more efficient at time of managing the connections to the DataSource. Furthermore, we are making use of the promises so as to free the thread while we are waiting for the query to be completed.


### Streaming processal of database information

``` javascript
// Generate a stream to get the data from the database
1 const dataStream = await pool.query(taskQueries.query_task_by_userId(userId))
2     .stream({ highWaterMark: 5 })

// It sends the data through a set of pipes, each one of them is in charge of a specific task. Bear in mind that since the responde object from the express dependency is a Writable Stream without objectMode activated, it is need to stringify the contents to be written.
3 const transformedStream = dataStream
4     .pipe(dataParserPipe())
5     .pipe(taskReducePipe(taskReduceFunction, {}))
6     .pipe(stringifyStream())

7 return transformedStream
```
This code can be found on line [TaskService:129](https://github.com/dferreiropresedo/react-node-practice/blob/main/server/src/services/taskService.js#L129).

Since there are a lot of things going on, I will break it down on the different steps:
 
* On the line number 2 from the snippet, we are requesting the library to return a stream which will at max process 5 objects at the same time before pausing the reading.

* On the line 3 a few of pipes are being added to the one returned from the database, so each one of them will be executed for the data obtained.

* On the 4th line from the snippet, the added pipe can be found on the line [TaskService:106](https://github.com/dferreiropresedo/react-node-practice/blob/main/server/src/services/taskService.js#L106), and its main objective is to parse the database data to a domain object.

* On the line number 5 lies the hardest pipe of all of them as it executes the next reduce function which can be found on [TaskService:81](https://github.com/dferreiropresedo/react-node-practice/blob/main/server/src/services/taskService.js#L81):

``` javascript
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
```
On this snippet, we are using an accumulator to store the final result, whereas the reduce function which is established as parameter will be executed on every incoming element from the stream. In that case, the reduce function to be executed will allow to group all the tasks under the same status.
