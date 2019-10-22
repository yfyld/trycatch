import * as actions from '@/store/actions'
import { ActionType } from 'typesafe-actions'
import { StoreState } from '@/store/reducers'
export {
  IMember,
  IUser,
  IRole,
  IProjectListItem,
  IProject,
  IProjectInfo,
  IProjectDetail,
  ISourcemapList,
  IProjectMemberOperate,
  IUserInfo,
  IErrorChartDataItem,
  IErrorChartData,
  IOrder,
  IErrorSearchParams,
  IEventListParams,
  IErrorListDataItem,
  IErrorListData,
  IErrorChangeParams,
  IErrorInfo,
  IEventInfo,
  IBehaviorListItem,
  IStack,
  IHttpRequest,
  IHttpResponse,
  IError,
  EventListDataItem,
  IErrorPostData,
  ISource,
  ILocation,
  IClientInfo,
  ILibInfo,
  IInfo,
  IEventChartSearchData,
  IChartData,
  IEventChartData,
  IChartDateData,
  IChartCategoryDate
} from "@/api"

export interface IResponseOk<T> {
  message: string
  result: T
}

export interface IPageData<T> {
  totalCount: number,
  page?: number,
  pageSize?: number,
  list: T[]
}

export interface IListResult<T> {
  result: IPageData<T>
}
export interface IPageQuery {
  page?: number
  pageSize?: number
}

export interface IPageDataQuery<T> extends IPageQuery{
  data?: T
}
export interface IPage {
  page: number,
  pageSize: number,
  totalCount: number
}

export type IStoreState = StoreState

export type IAction = ActionType<typeof actions>

export interface IActionAny {
  type: string
  payload?: any
}

