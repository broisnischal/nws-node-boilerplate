import { Request, Response, NextFunction } from 'express';

interface PaginationData {
  page: number;
  limit: number;
  offset: number;
  skipped: number;
  skip: number;
  startIndex: number;
  endIndex: number;
  next: null;
  previous: null;
}

const pagination = (req: Request, res: Response, next: NextFunction): void => {
  const { page, limit, skip, offset } = req.query;

  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(limit as string, 10) || 10;
  const skipValue = parseInt(skip as string, 10) || 0;
  const offsetValue = parseInt(offset as string, 10) || 0;

  const skipSize = (pageNumber - 1) * pageSize;

  const startIndex = (pageNumber - 1) * pageSize + skipValue;
  const endIndex = pageNumber * pageSize + skipValue;

  const paginationData: PaginationData = {
    page: pageNumber,
    limit: pageSize,
    offset: offsetValue,
    skipped: skipValue,
    skip: skipSize,
    startIndex,
    endIndex,
    next: null,
    previous: null,
  };

  res.locals.pagination = paginationData;

  next();
};

export default pagination;
