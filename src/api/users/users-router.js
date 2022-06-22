import express from 'express';
import { body, param } from 'express-validator';
import {
     createUserC, deleteUserC, getUserC, getUsersC, updateUserC,
} from './users-controller.js';
import {
     errorAlphanumeric, errorLength, errorNotEmpty,
} from '../../utils/Error/constants-error.js';
import { expressValidation } from '../../utils/express-utils.js';

const router = express.Router();

router.get('/', getUsersC);

router.get(
     '/:index',
     param('index').toInt(),
     expressValidation,
     getUserC,
);

router.delete('/:index', deleteUserC);

router.post(
     '/',
     body('password').notEmpty().withMessage(errorNotEmpty('password'))
          .isLength({ min: 8, max: 50 })
          .withMessage(errorLength(8, 50)),
     body('username').notEmpty().withMessage(errorNotEmpty('username'))
          .isLength({ min: 3, max: 10 })
          .withMessage(errorLength(8, 50))
          .isAlphanumeric()
          .withMessage(errorAlphanumeric),
     expressValidation,
     createUserC,
);
router.patch(
     '/:index',
     param('index').toInt(),
     body('password').optional().notEmpty().withMessage(errorNotEmpty('password'))
          .isLength({ min: 8, max: 50 })
          .withMessage(errorLength(8, 50)),
     body('username').optional().notEmpty().withMessage(errorNotEmpty('username'))
          .isLength({ min: 3, max: 10 })
          .withMessage(errorLength(8, 50))
          .isAlphanumeric()
          .withMessage(errorAlphanumeric),
     expressValidation,
     updateUserC,
);
export default router;
