import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  blockchainAddress: { type: String, required: true }
});

const User = models.User || model('Users', userSchema);

export default User;