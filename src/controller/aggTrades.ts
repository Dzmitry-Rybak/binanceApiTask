import { NextFunction, Request, Response } from 'express'
import { BINANCE_API_URL } from '../config/config'
import CustomError from '../utils/customError'

export const aggTrades = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { symbol, timestamp } = req.query
        const response = await fetch(
            `${BINANCE_API_URL}/api/v3/aggTrades?symbol=${symbol}&startTime=${timestamp}&endTime=${timestamp}`
        )

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
}
