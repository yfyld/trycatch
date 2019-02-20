import { CACHE_TIME } from '@/constants';
import * as actions from '@/store/actions';
import {StoreState} from "@/types"

const exclude = ['', '/login', '/home', '/signup'];

export default {
  '/*': ({ pathname, search },state:StoreState) => {
 
    return [
      {
        action: actions.doGetUserInfoRequest(),
        ttl: CACHE_TIME,
        isExist: (!!state.app.userInfo.id) || (exclude.indexOf(pathname) > -1 || exclude.indexOf(`${pathname}/`) > -1),
        
      },
    ]
  }
};