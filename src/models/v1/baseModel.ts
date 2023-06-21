import { Document, Model } from 'mongoose';

class MyClass {
  static myMethod(this: Document): number {
    return 42;
  }

  static myStatic(this: Model<Document>): number {
    return 42;
  }
}

export default MyClass;
