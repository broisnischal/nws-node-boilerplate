/* eslint-disable arrow-body-style */
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { ControllerFunction } from '@/types/index.types';

// eslint-disable-next-line arrow-body-style
// const asyncHandler = (controller: ControllerFunction) => {
//   // eslint-disable-next-line consistent-return
//   return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     let session: mongoose.ClientSession | null = null;

//     try {
//       session = await mongoose.startSession();
//       session.startTransaction();

//       await controller(req, res, next, session);

//       await session.commitTransaction();
//     } catch (error) {
//       if (session) {
//         await session.abortTransaction();
//       }
//       return next(error);
//     } finally {
//       if (session) {
//         session.endSession();
//       }
//     }
//   };
// };
const asyncHandler = (controller: ControllerFunction) => {
  // eslint-disable-next-line consistent-return
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let session: mongoose.ClientSession | null = null;

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      await controller.apply(null, [req, res, next, session]);

      await session.commitTransaction();
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }
      return next(error);
    } finally {
      if (session) {
        session.endSession();
      }
    }
  };
};

export default asyncHandler;
