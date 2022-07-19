import { verify, sign } from '../../utils/JWT.js';
import { ServerError } from '../../utils/custom-errors.js';
import { errorEmailVerification, errorSignIn } from '../../constants/constants-error.js';
import { createUserS, getUserByEmailS, updateUserS } from '../users/users-service.js';
import mailer, { messageMail } from '../../utils/nodemailer.js';
import { comparePassword, toHashPassword } from '../../utils/bcrypt.js';

export const signInS = async (user) => {
     const { email, password } = user;
     const got = await getUserByEmailS(email);
     if (!got) throw new ServerError(401, undefined, errorSignIn);

     if (!(await comparePassword(password, got.password))) {
          throw new ServerError(404, undefined, errorSignIn);
     }
     if (!got.isVerifiedEmail) {
          const token = sign({ id: got.id }, '5h');
          await mailer(messageMail(got.email, 'Verification', token));
          throw new ServerError(404, undefined, errorEmailVerification);
     }

     const token = sign({ id: got.id }, '5h');
     return { token };
};
export const signUpS = async (user) => {
     const created = await createUserS(user);
     const token = sign({ id: created.id }, '5h');
     await mailer(messageMail(created.email, 'Verification', token));
};

export const verifyEmailS = async (token) => {
     const verified = verify(token);

     console.log('verified', verified);
     await updateUserS(verified.id, { isVerifiedEmail: true });
     return { message: 'verification access' };
};
export const forgotPasswordS = async (email) => {
     const got = await getUserByEmailS(email);
     if (!got) {
          throw new ServerError(404, '', 'User not a found ');
     }
     const token = sign({ id: got.id }, '5h');
     await mailer(messageMail(got.email, 'chang forgot password ', token));
};
export const changeForgotS = async (id, newPassword) => {
     const hashPassword = await toHashPassword(newPassword);
     await updateUserS(id, { password: hashPassword });
     return { message: 'password recovered' };
};
