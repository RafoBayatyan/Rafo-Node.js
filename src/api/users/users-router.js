import express from 'express';
import { body, param } from 'express-validator';
import {
     errorAlpha, errorLength, errorNotEmpty, errorUUID,
} from '../../constants/constants-error.js';
import { expressValidation } from '../../utils/express-utils.js';
import { changePasswordC } from './changePassword-Controller.js';
// import { isCorrectProperty } from './user-validator.js';
import {
     getUserC, getUsersC, createUserC, deleteUserC, updateUserC,
} from './users-controller.js';

const router = express.Router();

router.get('/', getUsersC);

router.get('/:id', param('id').isMongoId().withMessage(errorUUID), expressValidation, getUserC);

router.delete('/:id', param('id').isMongoId().withMessage(errorUUID), expressValidation, deleteUserC);

router.post(
     '/',
     body('firstName').notEmpty().withMessage('First name cannot be empty').isLength({ min: 2, max: 15 })
          .withMessage(errorLength(2, 15))
          .isAlpha('en-US')
          .withMessage(errorAlpha),
     body('lastName').notEmpty().withMessage(errorNotEmpty('lastName')).isLength({ min: 3, max: 15 })
          .withMessage(errorLength(3, 15))
          .isAlpha('en-US')
          .withMessage(errorAlpha),
     body('password').notEmpty().withMessage(errorNotEmpty('password')).isLength({ min: 8, max: 20 })
          .withMessage(errorLength(8, 20))
          .isAlphanumeric('en-US')
          .withMessage(errorAlpha),
     body('email').notEmpty().withMessage(errorNotEmpty('email')).isEmail()
          .withMessage('Incorrect email address'),
     expressValidation,
     createUserC,
);
router.patch(
     '/:id',
     param('id').isMongoId().withMessage(errorUUID),
     body('firstName').notEmpty().withMessage('First name cannot be empty').isLength({ min: 2, max: 15 })
          .withMessage(errorLength(2, 15))
          .isAlpha('en-US')
          .withMessage(errorAlpha)
          .optional(),
     body('lastName').notEmpty().withMessage(errorNotEmpty('lastName')).isLength({ min: 3, max: 15 })
          .withMessage(errorLength(3, 15))
          .isAlpha('en-US')
          .withMessage(errorAlpha)
          .optional(),
     body('password').notEmpty().withMessage(errorNotEmpty('password')).isLength({ min: 8, max: 20 })
          .withMessage(errorLength(8, 20))
          .isAlphanumeric('en-US')
          .withMessage(errorAlpha)
          .optional(),
     body('email').notEmpty().withMessage(errorNotEmpty('email')).isEmail()
          .withMessage('Incorrect email address')
          .optional(),
     expressValidation,
     // isCorrectProperty,
     updateUserC,
);
router.post(
     '/changpassword',
     body('oldPassword').notEmpty().withMessage(errorNotEmpty('oldPassword')).isLength({ min: 8, max: 20 })
          .withMessage(errorLength(8, 20))
          .isAlphanumeric('en-US')
          .withMessage(errorAlpha),

     body('newPassword').notEmpty().withMessage(errorNotEmpty('newPassword')).isLength({ min: 8, max: 20 })
          .withMessage(errorLength(8, 20))
          .isAlphanumeric('en-US')
          .withMessage(errorAlpha),

     expressValidation,
     changePasswordC,
);

export default router;
