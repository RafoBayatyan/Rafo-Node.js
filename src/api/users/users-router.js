import express from 'express';
import { body, param } from 'express-validator';
import {
     createUserC, deleteUserC, getUserC, getUsersC,
} from './users-controller.js';
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
     body('password')
          .isLength({ min: 8, max: 50 })
          .withMessage('must be from 5 to 10 length'),
     body('username')
          .isLength({ min: 3, max: 10 })
          .withMessage('must be from 3 to 10 length')
          .isAlphanumeric()
          .withMessage('must contains only letters and numbers'),
     expressValidation,
     createUserC,
);

export default router;
