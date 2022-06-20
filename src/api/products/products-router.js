import express from 'express';
import { body, param } from 'express-validator';
import {
     createProductsC, deleteProductsC, getProductC, getProductsC,
} from './products-controller.js';
import { expressValidation } from '../../utils/express-utils.js';

const router = express.Router();

router.get('/', getProductsC);

router.get(
     '/:index',
     param('index').toInt(),
     expressValidation,
     getProductC,
);

router.delete('/:index', deleteProductsC);

router.post(
     '/',

     body('name')
          .isLength({ min: 3, max: 30 })
          .withMessage('must be from 3 to 30 length')
          .isAlphanumeric()
          .withMessage('must contains only letters and numbers'),
     body('color')
          .isLength({ min: 3, max: 20 })
          .withMessage('must be from 3 to 20 length')
          .isAlpha()
          .withMessage('must contains only letters '),
     body('fCamera')
          .isFloat({ min: 3, max: 10 })
          .withMessage('must contain only number not hight 25 and not min 3 '),
     body('bCamera')
          .isFloat({ min: 3, max: 25 })
          .withMessage('must contain only number not hight 25 and not min 3 '),

     expressValidation,
     createProductsC,
);

export default router;
