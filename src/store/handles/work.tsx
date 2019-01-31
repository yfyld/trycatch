import { CACHE_TIME } from '@/constants'
import * as actions from '@/store/actions'

const errorSearchParams = {
  page: 1,
  pageSize: 20,
  startTime: Date.now() - 30 * 24 * 3600000,
  endTime: Date.now()
}

export default {
  '/dashboard/:projectId': ({ pathname, search, projectId }, state) => [
    // {
    //   action: actions.doGetErrorChartDataRequest({projectId}),
    //   ttl: CACHE_TIME,
    //   isExist: false
    // },
    {
      action: actions.doGetErrorListDataRequest({ ...errorSearchParams,projectId }),
      ttl: CACHE_TIME,
      isExist: false
    }
  ],
  '/error-details/:errorId': ({ pathname, search, errorId }, state) => [
    {
      action: actions.doGetEventListDataRequest({ errorId,...errorSearchParams}),
      ttl: CACHE_TIME,
      isExist: false
    }
  ]
}
