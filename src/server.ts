import express, { Request, Response, NextFunction } from 'express'

import { z, ZodError } from 'zod'

import { myMiddleware } from './middlewares/my-middleware.js'

import { routes } from './routes/index.js'

import { AppError } from './utils/app-error.js'

const PORT = 3333

const app = express()

app.use(express.json())

// app.use(myMiddleware)

app.use(routes)

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    if (error instanceof ZodError) {
        return res.status(400).json({ 
            message: 'Validation Error!',
            issues: z.flattenError(error) // z.treeifyError(error)
        })
    }

    res.status(500).json({ message: error.message })
})

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}!`))