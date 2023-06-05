import { Router } from 'express'
import { update_task, user_tasks, add_task, remove_task } from '../controllers/task-controller'

const router = Router()

router.get('/', user_tasks)

router.post('/', add_task)

router.put('/:id', update_task)

router.delete('/:id', remove_task)


export default router