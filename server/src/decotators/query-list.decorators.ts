import { QueryListQuery } from '@/interfaces/request.interface';
import { createParamDecorator } from '@nestjs/common';

export const QueryList = createParamDecorator(
  (data, req): QueryListQuery<any> => {
    const { page, pageSize, sortKey, sortType, ...query } = req.query;
    return {
      skip: (Number(page || 1) - 1) * Number(pageSize || 20),
      take: Number(pageSize || 20),
      sort: {
        key: sortKey,
        value: sortType,
      },
      query,
    };
  },
);
