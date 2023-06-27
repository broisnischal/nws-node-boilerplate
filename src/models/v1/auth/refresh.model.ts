import ModelEnum from '@/enum/v1/model.enum';
import { MongooseId, Role } from '@/types/index.types';
import { Schema, Model, model } from 'mongoose';

interface IRefreshToken {
  token: string;
  id: MongooseId;
  role: Role;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  token: {
    type: String,
    required: true,
  },
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'role',
  },
  role: {
    type: String,
    required: true,
    enum: ModelEnum.refreshtoken.role,
  },
});

refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900000 }); // 15 minutes

const RefreshToken: Model<IRefreshToken> = model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
