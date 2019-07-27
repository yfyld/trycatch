export interface PageData<T> {
  totalCount: number;
  list: T[];
}

export type PageQuery<T> = {
  page: number;
  pageSize: number;
} & T;

export enum Sort {
  DESC = 'DESC',
  ASC = 'ASC',
  DEFAULT = '',
}

export interface SortQuery {
  sort: Sort;
  sortKey: string;
}

export interface QueryListResult<T> {
  skip: number;
  take: number;
  query: T;
  sort: {
    [propName: string]: Sort;
  };
}
