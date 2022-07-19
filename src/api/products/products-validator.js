/* eslint-disable no-prototype-builtins */
/* eslint-disable no-mixed-operators */
import { errorAlphanumeric } from '../../constants/constants-error.js';
import { ValidatorError } from '../../utils/custom-errors.js';

export const checkLicenseKeyV = (req, res, next) => {
     if (!req.body.licenseKey) return next();

     const key = req.body.licenseKey;
     let checkKey = req.body.licenseKey.toLowerCase();
     for (let i = 0; i < checkKey.length; i += 1) {
          const latterOrNum = checkKey[i];
          if (!(latterOrNum >= 'a' && latterOrNum <= 'z' || parseFloat(latterOrNum) >= 0 && parseFloat(latterOrNum) <= 9 || latterOrNum === ' ')) {
               throw new ValidatorError(400, key, errorAlphanumeric);
          }
     }

     checkKey = checkKey.replaceAll(' ', '-').toUpperCase();
     if (checkKey.length !== 24) {
          throw new ValidatorError(400, key, 'Defective key');
     }
     req.body.licenseKey = checkKey;
     return next();
};
export const isCorrectPropertyPV = (prop) => {
     const typeSchema = {
          videoGameName: null,
          developers: null,
          platform: null,
          releaseDate: null,
          productPriceInUSD: null,

     };
     Object.keys(prop).forEach((key) => {
          if (!typeSchema.hasOwnProperty(key)) throw new ValidatorError(404, key, 'Property not a found');
     });
};
export const isCorrectCategoryV = (req, res, next) => {
     const { body } = req;
     const typeSchema = {
          videoGameName: null,
          developers: null,
          platform: null,
          releaseDate: null,
          productPriceInUSD: null,

     };
     Object.keys(body).forEach((key) => {
          if (!typeSchema.hasOwnProperty(key)) next(new ValidatorError(404, key, 'Property not a found'));
     });
     next();
};
