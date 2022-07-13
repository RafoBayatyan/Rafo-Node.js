import { verify, sign } from '../../utils/JWT.js';
import { ServisError } from '../../utils/custom-errors.js';
import { errorSignIn } from '../../constants/constants-error.js';
import { createUserS, getUserByEmailS, updateUserS } from '../users/users-servis.js';
import { sendEmail } from '../../utils/nodemailer.js';
import { comparePassword } from '../../utils/bcrypt.js';

export const signInS = async (user) => {
     const { email, password } = user;
     const got = await getUserByEmailS(email);
     if (!got) throw new ServisError(401, undefined, errorSignIn);
     if (!(await comparePassword(password, got.password))) {
          throw new ServisError(404, undefined, errorSignIn);
     }
     if (!got.isVerifiedEmail) {
          const token = sign({ id: user.id }, '5m');
          await sendEmail(user.email, 'Verification', `Your verification token -> ${token}`);
     }

     const token = sign({ id: got.id }, '1h');
     return { token };
};
export const signUpS = async (user) => {
     const created = await createUserS(user);
     const token = sign({ id: created.id }, '5m');
     await sendEmail(created.email, 'Verification', `Your verification token -> ${token}`);
};

export const verifyEmailS = async (token) => {
     const verified = verify(token);

     console.log('verified', verified);
     await updateUserS(verified.id, { isVerifiedEmail: true });
};
