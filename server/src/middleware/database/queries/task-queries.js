import { escape } from 'mysql2'

const query_task_by_user_and_task_id = function (taskId, userId) {
    return `
        SELECT id, description, date, timestamp, status_id, user_id
        FROM task t
        WHERE t.id = ${escape(taskId)} AND t.user_id = ${escape(userId)}
    `
}


const query_task_by_userId = function (userId) {
    return `
        SELECT t.id as task_id, t.description, t.date, t.timestamp, t.status_id, s.state as status_name, t.user_id
        FROM task t JOIN status s ON t.status_id = s.id
        WHERE t.user_id = ${escape(userId)}
        ORDER BY t.status_id ASC, t.timestamp DESC;
    `
}



const query_task_insert = function (description, date, timestamp, statusId, userId) {
    return `
        INSERT INTO task(description, date, timestamp, status_id, user_id)
        VALUES (${escape(description)}, ${escape(date)}, ${escape(timestamp)}, ${escape(statusId)}, ${escape(userId)});
    `
}


const query_task_update = function(id, description, date, timestamp, statusId, userId) {
    return `
        UPDATE task SET description=${escape(description)}, date=${escape(date)}, timestamp=${escape(timestamp)}, status_id=${escape(statusId)}
        WHERE id=${escape(id)} AND user_id=${escape(userId)} ;
    `
}

export { query_task_by_user_and_task_id as query_task_by_id, query_task_by_userId,  query_task_insert, query_task_update }