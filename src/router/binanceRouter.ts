import express from 'express'
import { aggTrades } from '../controller/aggTrades'

const router = express.Router()

router.get('/', aggTrades)

export default router
