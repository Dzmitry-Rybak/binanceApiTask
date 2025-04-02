import express, { NextFunction, Request, Response } from 'express'
import { BINANCE_API_URL, PORT } from './config/config'
import CustomError from './utils/customError'

const app = express()

app.get('/depth', async (req, res, next) => {
    try {
        const { symbol } = req.query
        const response = await fetch(
            `${BINANCE_API_URL}/apis/v3/depth?symbol=${symbol}`
        )
        console.log('response', response)
        if (response.status !== 200) {
            throw new CustomError(
                'Error while fetching data "/api/v3/depth"',
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

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    let statusCode = 500
    if (err.statusCode) {
        statusCode = err.statusCode
    }
    res.status(statusCode).send({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`)
})
