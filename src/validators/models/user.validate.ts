/* eslint-disable arrow-body-style */
import { body, ValidationChain } from 'express-validator';

export const userValidation = (): ValidationChain[] => {
  return [body('email').not().isEmpty().withMessage('Email is required')];
};

export default userValidation;
