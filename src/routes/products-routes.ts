import { Router } from 'express'
import { myMiddlewareLocal } from '../middlewares/my-middleware-local.js'
import { ProductsController } from '../controllers/products-controller.js'

const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.get('/', productsController.index)

productsRoutes.post('/', myMiddlewareLocal, productsController.create)

export { productsRoutes }