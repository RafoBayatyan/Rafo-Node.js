import express from 'express';
import { body } from 'express-validator';
import { errorNotEmpty, errorUUID } from '../../constants/constants-error.js';
import expressValidation from '../../utils/express-utils.js';
import { getUserBagC, addProductToBagC } from './bag-controller.js';

const bagRouter = express.Router();

bagRouter.get(
     '/get-client-product',
     getUserBagC,
);
bagRouter.post(
     '/add-product',
     body('purchasedProduct').notEmpty().withMessage(errorNotEmpty('purchasedProduct')).isMongoId()
          .withMessage(errorUUID),
     expressValidation,
     addProductToBagC,
);
export default bagRouter;
