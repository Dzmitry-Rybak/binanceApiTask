import express from 'express'
import { BINANCE_API_URL } from '../config/config'
import CustomError from '../utils/customError'

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const { symbol } = req.query
        const response = await fetch(
            `${BINANCE_API_URL}/api/v3/historicalTrades?symbol=${symbol}`
        )
        console.log('response', response)
        if (response.status !== 200) {
            throw new CustomError(
                'Error while fetching data "/api/v3/historicalTrades"',
                404
            )
        }

        const data = await response.json()

        res.status(200).json({ data })
    } catch (error) {
        console.log('error', error)
        next(error)
    }
})

export default router
