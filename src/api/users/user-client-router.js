import express from 'express';
import { body } from 'express-validator';
import {
     errorAlphanumeric, errorLength, errorNotEmpty,
} from '../../constants/constants-error.js';
import expressValidation from '../../utils/express-utils.js';
import { isCorrectPropertyUV } from './users-validator.js';
import { changePasswordC } from './users-controller.js';

const router = express.Router();

router.post(
     '/change-password',
     isCorrectPropertyUV,
     body('clientOldPassword').notEmpty().withMessage(errorNotEmpty('password')).isLength({ min: 8, max: 20 })
          .withMessage(errorLength(8, 20))
          .isAlphanumeric('en-US')
          .withMessage(errorAlphanumeric),
     body('clientNewPassword').notEmpty().withMessage(errorNotEmpty('password')).isLength({ min: 8, max: 20 })
          .withMessage(errorLength(8, 20))
          .isAlphanumeric('en-US')
          .withMessage(errorAlphanumeric),
     expressValidation,
     changePasswordC,
);

export default router;
