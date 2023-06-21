import { SchemaOptions } from 'mongoose';

const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

export default schemaOptions;
