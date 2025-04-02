import express, { NextFunction, Request, Response } from 'express'
import binanceRouter from './router/binanceRouter'
import { PORT } from './config/config'

const app = express()

app.use('/depth', binanceRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    let statusCode = 500
    if (err.statusCode) {
        statusCode = err.statusCode
    }
    res.status(statusCode).send({ message: err.message })
})

// app.use('*', (req, res, next) => {
//     res.status(404).json({ message: `${req.originalUrl} is not awailable` })
// })

app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`)
})
