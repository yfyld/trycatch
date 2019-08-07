import { CACHE_TIME } from '@/constants'
import * as actions from '@/store/actions'

const errorSearchParams = {
  page: 1,
  pageSize: 20,
  startTime: new Date().setHours(0,0,0,0) - 30 * 24 * 3600000,
  endTime: new Date().setHours(23,59,59,999)
}

export default {
  '/dashboard/:projectId': ({ pathname, search, projectId }, state) => [
    {
      action: actions.doGetErrorListDataRequest({ ...errorSearchParams,projectId:Number(projectId) }),
      ttl: CACHE_TIME,
      isExist: false
    },
    {
      action: actions.doGetProjectDetailsRequest(Number(projectId)),
      ttl: CACHE_TIME,
      isExist: state.project.projectId===Number(projectId)&&state.project.projectMembers.length
    },
    {
      action: actions.doGetErrorChartDataRequest({ ...errorSearchParams,projectId:Number(projectId) }),
      ttl: CACHE_TIME,
      isExist: false
    }
  ],
  '/dashboard/:projectId/:errorId': ({ pathname, search,projectId, errorId }, state) => [
    {
      action: actions.doGetEventListDataRequest({ errorId,...errorSearchParams}),
      ttl: CACHE_TIME,
      isExist: false
    },
    {
      action: actions.doGetProjectDetailsRequest(Number(projectId)),
      ttl: CACHE_TIME,
      isExist: state.project.projectId===Number(projectId)&&state.project.projectMembers.length
    }
  ]
}
