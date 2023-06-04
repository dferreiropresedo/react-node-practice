import express from 'express'
import userRouter from './routes/user-routes'
import taskRouter from './routes/task-router'
import { user_login, user_validation } from './controllers/user-controller'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', user_login)

app.use('/users', user_validation, userRouter)

app.use('/tasks', user_validation, taskRouter)

export default app 