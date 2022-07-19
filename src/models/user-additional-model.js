import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserAdditionalSchema = new Schema({
     job: String,
     gender: String,
     blood: {
          type: String,
          default: 'no',
     },
});

const UserAdditional = mongoose.model('user-additions', UserAdditionalSchema);

export default UserAdditional;
