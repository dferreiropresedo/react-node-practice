import { Router } from 'express'
import {  user_information } from '../controllers/user-controller'

const router = Router()

router.get('/info', user_information)


export default router
