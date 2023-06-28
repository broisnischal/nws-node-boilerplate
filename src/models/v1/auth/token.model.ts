// eslint-disable-next-line object-curly-newline
import { Document, ObjectId, Schema, Types, Model, model } from 'mongoose';
import ModelEnum from '@/enum/v1/model.enum';
import { Token } from '@/types/index.types';

export interface IToken extends Document {
  user: Types.ObjectId | ObjectId;
  type: Token;
  userModel: string;
}

const tokenSchema = new Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    refPath: 'userModel',
    index: {
      unique: true,
      background: true,
    },
  },
  userModel: {
    type: String,
    enum: ['Agent', 'Admin', 'User'],
  },
  type: {
    type: String,
    enum: ModelEnum.token.type,
    required: true,
  },
});

const tokenModel: Model<IToken> = model<IToken>('Token', tokenSchema);

export default tokenModel;
