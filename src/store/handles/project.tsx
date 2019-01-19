import { CACHE_TIME } from '@/constants';
import * as actions from '@/store/actions';

export default {
  '/project': ({ pathname, search },state) => [
    {
      action: actions.doGetProjectList(),
      ttl: CACHE_TIME,
      isExist: false
    },
  ]
};