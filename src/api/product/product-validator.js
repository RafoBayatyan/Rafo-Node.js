/* eslint-disable no-plusplus */
const chackName = (name) => {
     if (name.length < 4) {
          throw new Error('Product Name must be have 4 letter');
     }
     if (!(name[0] >= 'A' && name[0] <= 'Z')) {
          throw new Error('first letter must be started whit a capital letter');
     }

     for (let i = 1; i < name.length; i++) {
          if (!(name[i] >= 'a' && name[i] <= 'z')) {
               throw new Error('The word must contain only letters ');
          }
     }
};
const chackColor = (color) => {
     if (color.length < 4) {
          throw new Error('color must be have 4 letter');
     }
     if (!(color[0] >= 'A' && color[0] <= 'Z')) {
          throw new Error('first letter must be started whit a capital letter');
     }

     for (let i = 1; i < color.length; i++) {
          if (!(color[i] >= 'a' && color[i] <= 'z')) {
               throw new Error('The word must contain only letters ');
          }
     }
};
const chakCameras = (fCamera, bCamera) => {
     if (fCamera < 0 && parseFloat(fCamera)) {
          throw new Error('Camera');
     }
     if (bCamera < 0 && parseFloat(bCamera)) {
          throw new Error('Camera');
     }
};
export const validateProductData = (req, res, next) => {
     const {
          name, color, fCamera,
          bCamera,
     } = req.body;
     chackName(name);
     chackColor(color);
     chakCameras(fCamera, bCamera);

     next();
};
