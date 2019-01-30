import { CACHE_TIME } from '@/constants';
import * as actions from '@/store/actions';
import {StoreState} from "@/types"

export default {
  '/*': ({ pathname, search },state:StoreState) => {
    return [
      {
        action: actions.doGetUserInfoRequest(),
        ttl: CACHE_TIME,
        isExist: !!state.app.userInfo.id
      },
    ]
  }
};