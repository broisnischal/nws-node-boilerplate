import { Document, Model, model, Schema, Types, ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id?: Types.ObjectId | ObjectId;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = model('User', userSchema);

export default User;
