import ModelEnum from '@/enum/v1/model.enum';
import schemaOptions from '@/models/schemaOptions';
import { MongooseId, Role } from '@/types/index.types';
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IIpReputation extends Document {
  userId: MongooseId;
  role: Role;
  ipAddress: string;
  reputationScore: number;
  lastSeen: Date;
  totalRequests: number;
  last15MinutesRequests: number;
  blocked: boolean;
  strikes: number;
  requestDetails: {
    timestamp: Date;
    path: string;
    method: string;
    [key: string]: any;
  }[];
  warning: boolean;
  warningExpiry: Date;
  lastWarningTime: Date | null;
}

const IpRepurationSchema = new Schema<IIpReputation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      refPath: 'role',
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ModelEnum.role,
    },
    ipAddress: {
      type: String,
      required: true,
      //   unique: true,
    },
    reputationScore: {
      type: Number,
      default: 0,
    },
    lastSeen: {
      type: Date,
      default: new Date(),
    },
    totalRequests: {
      type: Number,
      default: 0,
    },
    last15MinutesRequests: {
      type: Number,
      default: 0,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    requestDetails: {
      type: [],
      default: [],
    },
    warning: {
      type: Boolean,
      default: false,
    },
    warningExpiry: {
      type: Date,
    },
    lastWarningTime: {
      type: Date,
    },
    strikes: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions,
);

const IpReputation: Model<IIpReputation> = mongoose.model<IIpReputation>('IpReputation', IpRepurationSchema);

export default IpReputation;
