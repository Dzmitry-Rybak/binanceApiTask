import express, { NextFunction, Request, Response } from 'express'
import { BINANCE_API_URL, PORT } from './config/config'
import mongoose from 'mongoose'
import CustomError from './utils/customError'

const app = express()

app.get('/depth', async (req, res, next) => {
    try {
        const { symbol } = req.query
        const response = await fetch(
            `${BINANCE_API_URL}/api/v3/depth?symbol=${symbol}`
        )

        if (!response) {
            throw new CustomError(
                'Error while fetching data "/api/v3/depth"',
                404
            )
        }

        const data = await response.json()

        res.status(200).json({ data })
    } catch (error) {
        next(error)
    }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: err.message })
})

mongoose
    .connect('mongodb://localhost:27017/binanceApiTask')
    .then(() => console.log('DataBase connected'))
    .catch((error) => console.error(error.message))

app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`)
})
