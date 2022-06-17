/* eslint-disable no-plusplus */
const validateUserName = (username) => {
     for (let i = 0; i < username.length; i++) {
          if (!(username[i].toLowerCase() >= 'a' && username[i].toLowerCase() <= 'z')
            || !(username[i] >= 0 && username[i] <= 9)) {
               throw new Error('user mus have only letters or numbers');
          }
     }
};

export const validateUserData = (req, res, next) => {
     const { username } = req.body;
     validateUserName(username);

     next();
};
