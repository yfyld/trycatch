import { CACHE_TIME } from '@/constants';
import * as actions from '@/store/actions';

export default {
  '/dashboard/:projectId': ({ pathname, search ,projectId},state) => [
    {
      action: actions.doGetErrorChartDataRequest({projectId}),
      ttl: CACHE_TIME,
      isExist: false
    },
    {
      action: actions.doGetErrorListDataRequest({projectId}),
      ttl: CACHE_TIME,
      isExist: false
    },
  ]
};