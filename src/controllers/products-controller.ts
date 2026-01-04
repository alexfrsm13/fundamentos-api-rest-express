import { Request, Response } from 'express'
import { z } from 'zod'
import { AppError } from '../utils/app-error.js'

class ProductsController {
    index(req: Request, res: Response) {
        const { page, limit } = req.query

        res.send(`Página ${page} de ${limit} produtos!`)
    }

    create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string({ message: 'Price is required or invalid'})
                    .trim()
                    .min(6, 'Name must be 6 or more characters'),
            price: z.number({ message: 'Price is required or invalid'})
                    .positive('Price must be positive!')
        })

        const { name, price } = bodySchema.parse(req.body)

        /*
        if(!name) {
            throw new AppError('Nome do Produto é obrigatório!')
        }

        if(name.trim().length < 6) {
            throw new AppError('Nome do Produto precisa ter pelo menos 6 caracteres!')
        }

        if(!price) {
            throw new AppError('Preço do Produto é obrigatório!')
        }

        if(price < 0) {
            throw new AppError('Preço do Produto não pode ser menor que zero!')
        }
        */

        // throw new Error('ERRO AO TENTAR CRIAR UM PRODUTO!')
        // throw new AppError('ERRO AO TENTAR CRIAR UM PRODUTO!')

        res.status(201).json({ name, price, user_id: req.user_id })
    }
}

export { ProductsController }