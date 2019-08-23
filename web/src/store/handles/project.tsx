import { CACHE_TIME } from '@/constants';
import * as actions from '@/store/actions';

export default {
  '/project': ({ pathname, search },state) => [
    {
      action: actions.doGetProjectListRequest({page: 1, pageSize: 20}),
      ttl: CACHE_TIME,
      isExist: false
    },
    
  ],
  '/project/:projectId': ({ pathname, search ,projectId},state) => [
    {
      action: actions.doGetProjectDetailsRequest(Number(projectId)),
      ttl: CACHE_TIME,
      isExist: false
    },
    // {
    //   action: actions.doGetProjectMembersRequest(Number(projectId)),
    //   ttl: CACHE_TIME,
    //   isExist: state.project.projectInfo.id===Number(projectId)&&state.project.projectMembers.length
    // },
  ]
};