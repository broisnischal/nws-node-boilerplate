/* eslint-disable class-methods-use-this */
import { Schema, model, Document, Error as MongooseError, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import MyClass from '@/models/v1/baseModel';
import schemaOptions from '@/models/schemaOptions';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phone?: number;
  comparePassword(password: string): boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number },
  },
  schemaOptions,
);

class UserModel extends Model<IUser> {
  myMethod(this: IUser) {
    return 42;
  }
}

userSchema.loadClass(UserModel);
userSchema.loadClass(MyClass);

// eslint-disable-next-line func-names, consistent-return
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') && this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error as MongooseError);
    }
  }
  next();
});

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
const User = model<IUser>('User', userSchema);

export default User;
