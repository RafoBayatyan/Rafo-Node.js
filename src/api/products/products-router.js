import express from 'express';
import { body, param } from 'express-validator';
import {
     createProductC, deleteProductC, getProductC, getProductsC, updateProductC,
} from './products-controller.js';
import { expressValidation } from '../../utils/express-utils.js';
import {
     errorAlpha, errorAlphanumeric, errorLength, errorNotEmpty,
} from '../../constants.js/constants-error.js';

const router = express.Router();

router.get('/', getProductsC);

router.get(
     '/:index',
     param('index').toInt(),
     expressValidation,
     getProductC,
);

router.delete('/:index', deleteProductC);

router.post(
     '/',

     body('name').notEmpty().withMessage(errorNotEmpty('name'))
          .isLength({ min: 3, max: 30 })
          .withMessage(errorLength(3, 10))
          .isAlphanumeric()
          .withMessage(errorAlphanumeric),
     body('color').notEmpty().withMessage(errorNotEmpty('color'))
          .isLength({ min: 3, max: 20 })
          .withMessage(errorLength(3, 20))
          .isAlpha()
          .withMessage(errorAlpha),
     body('fCamera').notEmpty().withMessage(errorNotEmpty('fCamera'))
          .isFloat({ min: 3, max: 10 })
          .withMessage('must contain only number not hight 25 and not min 3 '),
     body('bCamera').notEmpty().withMessage(errorNotEmpty('bCamera'))
          .isFloat({ min: 3, max: 25 })
          .withMessage('must contain only number not hight 25 and not min 3 '),

     expressValidation,
     createProductC,
);
router.patch(
     '/:index',
     param('index').toInt(),
     body('name').optional().notEmpty().withMessage(errorNotEmpty('name'))
          .isLength({ min: 3, max: 30 })
          .withMessage(errorLength(3, 10))
          .isAlphanumeric()
          .withMessage(errorAlphanumeric),
     body('color').optional().notEmpty().withMessage(errorNotEmpty('color'))
          .isLength({ min: 3, max: 20 })
          .withMessage(errorLength(3, 20))
          .isAlpha()
          .withMessage(errorAlpha),
     body('fCamera').optional().notEmpty().withMessage(errorNotEmpty('fCamera'))
          .isFloat({ min: 3, max: 10 })
          .withMessage('must contain only number not hight 25 and not min 3 '),
     body('bCamera').optional().notEmpty().withMessage(errorNotEmpty('bCamera'))
          .isFloat({ min: 3, max: 25 })
          .withMessage('must contain only number not hight 25 and not min 3 '),

     expressValidation,
     updateProductC,
);

export default router;
