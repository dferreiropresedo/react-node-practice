import { createPool } from 'mysql2'
import * as populationQueries from './queries/population-queries'

const _pool = createPool({
    connectionLimit: 5,
    user: 'node-user',
    password: 'node-pass',
    database: 'node_db',
    host: 'localhost',
    port: 3306
})

console.log("Executed population")

_pool.query(populationQueries.table_creation_status, function(error, results, fields) {
    if (error) throw error
})

_pool.query(populationQueries.table_creation_user, function(error, results, fields) {
    if (error) throw error
})

_pool.query(populationQueries.table_creation_task, function(error, results, fields) {
    if (error) throw error
})
_pool.query(populationQueries.populate_status_1, function(error, results, fields) {
    if (error) throw error
})
_pool.query(populationQueries.populate_status_2, function(error, results, fields) {
    if (error) throw error
})
_pool.query(populationQueries.populate_status_3, function(error, results, fields) {
    if (error) throw error
})
_pool.query(populationQueries.populate_user_1, function(error, results, fields) {
    if (error) throw error
})
_pool.query(populationQueries.populate_user_2, function(error, results, fields) {
    if (error) throw error
})

export { _pool as pool }