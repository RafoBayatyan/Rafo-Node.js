/* eslint-disable no-plusplus */

import { resolve } from 'path';
import express from 'express';
// eslint-disable-next-line import/extensions
import { writeFile, existsSync, readFile } from './utils/fs-promise.js';

const chackNames = (user) => {
     const { fName } = user;
     const { lName } = user;
     if (fName.length < 4) {
          throw new Error('UserFirstName must be have 4 letter');
     }
     if (!(fName[0] >= 'A' && fName[0] <= 'Z')) {
          throw new Error('first letter must be started whit a capital letter');
     }
     for (let i = 1; i < fName.length; i++) {
          if (!(fName[i] >= 'a' && fName[i] <= 'z')) {
               throw new Error('The word must contain only letters ');
          }
     }
     if (lName.length < 4) {
          throw new Error('UserLastName must be have 4 letter');
     }
     if (!(lName[0] >= 'A' && lName[0] <= 'Z')) {
          throw new Error('first letter must be started whit a capital letter');
     }
     for (let i = 1; i < lName.length; i++) {
          if (!(lName[i] >= 'a' && lName[i] <= 'z')) {
               throw new Error('The word must contain only letters ');
          }
     }
};
const chackAge = (user) => {
     if (!(user.age > 0 && user.age < 150 && parseFloat(user.age))) {
          throw new Error('Error age');
     }
};

const createUser = async (path, users, user) => {
     const isUniqueUser = users.find((u) => u.username === user.username);
     if (isUniqueUser) {
          throw new Error('User exists');
     }
     await chackAge(user);
     await chackNames(user);

     users.push(user);
     writeFile(path, JSON.stringify(users));
};

const deleteUserByIndex = async (path, users, index) => {
     if (index >= users.length) {
          throw new Error('User not exists');
     }
     const deletedUser = users[index];
     const newUsers = users.filter((_, i) => i !== index);
     writeFile(path, JSON.stringify(newUsers));
     return deletedUser;
};
const updateUserByIndex = async (path, users, index, updProp) => {
     if (index >= users.length) {
          throw new Error('User not exists');
     }

     const updUser = users[index];
     await chackAge(updProp);
     await chackAge(updProp);
     Object.keys(updProp).forEach((key) => {
          if (key in updUser) {
               updUser[key] = updProp[key];
          } else {
               throw new Error('This property not a found');
          }
     });
     // eslint-disable-next-line no-param-reassign
     users[index] = updUser;
     writeFile(path, JSON.stringify(users));
     return updUser;
};

const tryParsFile = async (path) => {
     const users = JSON.parse(await readFile(path));
     if (!Array.isArray(users)) {
          return await writeFile(path, JSON.stringify([]));
     }
     return true;
};

const validateFile = async (path) => {
     if (!existsSync(path)) {
          return await writeFile(path, JSON.stringify([]));
     }
     try {
          await tryParsFile(path);
     } catch (err) {
          return await writeFile(path, JSON.stringify([]));
     }
     return true;
};

const app = express();
const path = resolve('users.json');
const port = 3000;

app.use(express.json());

app.get('/users/', async (req, res) => {
     try {
          await validateFile(path);
          const users = JSON.parse(await readFile(path));
          res.status(200).send(JSON.stringify(users));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});
app.get('/users/:index/', async (req, res) => {
     try {
          await validateFile(path);
          const { index } = req.params;
          const i = Number(index);
          const users = JSON.parse(await readFile(path));
          res.status(200).send(JSON.stringify(users[i]));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});
app.post('/users/', async (req, res) => {
     try {
          await validateFile(path);
          const users = JSON.parse(await readFile(path));
          await createUser(path, users, req.body);
          res.status(201).send(JSON.stringify(req.body));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});
app.delete('/users/:index/', async (req, res) => {
     try {
          await validateFile(path);
          const { index } = req.params;
          const i = Number(index);
          const users = JSON.parse(await readFile(path));
          const deleted = await deleteUserByIndex(path, users, i);
          res.status(200).send(JSON.stringify(deleted));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});
app.patch('/users/:index/', async (req, res) => {
     try {
          console.log('4546');
          await validateFile(path);
          const users = JSON.parse(await readFile(path));
          const index = +req.params.index;
          const updateProperty = req.body;
          const updUser = await updateUserByIndex(path, users, index, updateProperty);
          res.status(201).send(JSON.stringify(updUser));
     } catch (err) {
          res.status(500).send(JSON.stringify({ message: err.message }));
     }
});

app.listen(port, () => {
     console.log(`Example app listening on port ${port}!`);
});
