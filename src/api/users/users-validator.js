/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
import { ValidatorError } from '../../utils/custom-errors.js';

export const isUniqueV = (prop, propList) => {
     const isUniqueUser = propList.find((props) => props.email === prop.email);

     if (isUniqueUser) throw new ValidatorError(400, prop.email, 'User exists');
};
export const isCorrectPropertyUV = (req, res, next) => {
     const { body } = req;

     const typeSchema = {
          firstName: null,
          lastName: null,
          password: null,
          email: null,
          age: null,
          job: null,
          gender: null,
          blood: null,

     };
     Object.keys(body).forEach((key) => {
          if (!typeSchema.hasOwnProperty(key)) next(new ValidatorError(404, key, 'Property not a found'));
     });
     next();
};
