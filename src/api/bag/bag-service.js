/* eslint-disable no-plusplus */
import { verify } from '../../utils/JWT.js';
import { addToOldBagR, getUserBagR, createBagR } from './bag-repository.js';

export const getUserBagS = async (token) => {
     const { id } = verify(token);
     const userBag = (await getUserBagR(id))[0];
     return userBag;
};

export const addProductToBagS = async (productId, token) => {
     const userId = verify(token).id;
     const existingClient = await getUserBagS(token);
     const clientUserId = existingClient?.userId.toString();
     const clientProductId = existingClient?.productId.toString();
     if (clientUserId === userId && clientProductId === productId) {
          await addToOldBagR(existingClient.id, { count: ++existingClient.count });
          return false;
     }
     await createBagR(userId, productId);
     return true;
};
