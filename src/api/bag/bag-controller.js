import { addProductToBagS, getUserBagS } from './bag-service.js';

export const getUserBagC = async (req, res, next) => {
     try {
          const token = (req.headers.authorization).split(' ')[1];
          const got = await getUserBagS(token);
          res.status(201).json(got);
     } catch (err) {
          next(err);
     }
};
export const addProductToBagC = async (req, res, next) => {
     try {
          const { purchasedProduct } = req.body;
          const token = (req.headers.authorization).split(' ')[1];
          await addProductToBagS(purchasedProduct, token);
          res.status(201).json({ message: 'Product added your bag' });
     } catch (err) {
          next(err);
     }
};
