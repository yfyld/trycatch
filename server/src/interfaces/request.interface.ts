export interface IPageData<T> {
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

export interface QueryListQuery<T> {
  // skip: number;
  // take: number;
  // query: T;
  // sort: {
  //   [propName: string]: Sort;
  // };
  line: number;
  offset: number;
  from: number;
  to: number;
  query: T;
}
