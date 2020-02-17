import { QueryListQuery } from '@/interfaces/request.interface';
import { createParamDecorator } from '@nestjs/common';

export const QueryList = createParamDecorator(
  (data, req): QueryListQuery<any> => {
    const { page, pageSize, beginDate, endDate, ...other } = req.query;
    const nowDate = Math.floor(Date.now() / 1000)
    return {
      line: Number(pageSize || 20),
      offset: Number(pageSize || 20) * (Number(page || 1) - 1),
      from: nowDate - 7 * 24 * 3600,
      to: nowDate,
      query: other,
    }
  },
);
