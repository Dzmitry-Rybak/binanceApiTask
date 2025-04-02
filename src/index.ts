import express, { NextFunction, Request, Response } from 'express'
import binanceRouter from './router/binanceRouter'
import { PORT } from './config/config'

const app = express()

app.use('/depth', binanceRouter)

// app.all('*', (req, res, next) => {
//     const error = new Error(`${req.originalUrl} is not available`) as any
//     error.statusCode = 404
//     next(error)
// })

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

export default app
