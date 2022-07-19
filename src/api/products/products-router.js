import express from 'express';
import { body, param } from 'express-validator';
import {
     createProductC, deleteProductC, updateProductC,
} from './products-controller.js';
import expressValidation from '../../utils/express-utils.js';
import {
     errorAlphanumeric, errorLength, errorNotEmpty, errorUUID,
} from '../../constants/constants-error.js';
import { isCorrectCategoryV } from './products-validator.js';

const productRouter = express.Router();

productRouter.post(
     '/',
     isCorrectCategoryV,
     body('videoGameName').notEmpty().withMessage(errorNotEmpty('videoGameName')).isLength({ min: 2, max: 30 })
          .withMessage(errorLength(2, 3))
          .isAlphanumeric('en-US', { ignore: ' _-' })
          .withMessage(errorAlphanumeric),
     body('platform').notEmpty().withMessage(errorNotEmpty('platform')).isIn(['ps4', 'PS4', 'ps3', 'PS3', 'xbox', 'XBOX', 'windows', 'WINDOWS'])
          .withMessage('this platform is not supported'),
     body('developers').notEmpty().withMessage(errorNotEmpty('developers')).isAlphanumeric('en-US', { ignore: ' -' })
          .withMessage(errorAlphanumeric),
     body('releaseDate').notEmpty().withMessage(errorNotEmpty('releaseData')).isInt({ min: 2000, max: 2022 })
          .withMessage('Wrong release year'),
     body('productPriceInUSD').notEmpty().withMessage(errorNotEmpty('productPriceInUSD')).isInt({ min: 10 })
          .withMessage('Enter the correct amount ( "The amount must be at least $10" )'),
     expressValidation,
     createProductC,
);
productRouter.patch(
     '/:id',
     param('id').isMongoId().withMessage(errorUUID),
     body('videoGameName').notEmpty().withMessage(errorNotEmpty('videoGameName')).isLength({ min: 2, max: 30 })
          .withMessage(errorLength(2, 30))
          .isAlphanumeric('en-US', { ignore: ' _-' })
          .withMessage(errorAlphanumeric)
          .optional(),
     body('platform').notEmpty().withMessage(errorNotEmpty('platform')).isIn(['ps4', 'PS4', 'ps3', 'PS3', 'xbox', 'XBOX', 'windows', 'WINDOWS'])
          .withMessage('this platform is not supported')
          .optional(),
     body('developers').notEmpty().withMessage(errorNotEmpty('developers')).isAlphanumeric('en-US', { ignore: ' -' })
          .withMessage(errorAlphanumeric)
          .optional(),
     body('releaseDate').notEmpty().withMessage(errorNotEmpty('releaseData')).isInt({ min: 2000, max: 2022 })
          .withMessage('Wrong release year')
          .optional(),
     body('productPriceInUSD').notEmpty().withMessage(errorNotEmpty('productPriceInUSD')).isInt({ min: 10 })
          .withMessage('Enter the correct amount ( "The amount must be at least $10" )')
          .optional(),
     expressValidation,
     updateProductC,
);

productRouter.delete(
     '/:id',
     param('id').isMongoId().withMessage(errorUUID),
     expressValidation,
     deleteProductC,
);
export default productRouter;
