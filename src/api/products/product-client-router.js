import express from 'express';
import {
     getProductC, getProductsC,
} from './products-controller.js';
import expressValidation from '../../utils/express-utils.js';

const productRouter = express.Router();

productRouter.get(
     '/',
     getProductsC,
);

productRouter.get(
     '/:id',
     expressValidation,
     getProductC,
);

export default productRouter;
