import * as React from 'react'
import FilterBar from './components/FilterBar'
import { Button, Tooltip, Menu, Dropdown, List,Tabs,Spin } from 'antd'
import style from './ErrorDetails.less'
import * as actions from '@/store/actions'
import { connect } from 'react-redux'
// import {findOne} from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import { Action, ErrorChangeParams,EventListDataItem,PageData,EventInfo,ErrorInfo, Member } from '@/types'
// import * as moment from "moment";
import { ERROR_STATUS } from '@/constants'
import ErrorBehavior from './components/ErrorBehavior';
import ErrorBasicInfo from './components/ErrorBasicInfo';
const {TabPane} =Tabs;
interface Props {
  eventListLoading: boolean
  doErrorChange: (params: ErrorChangeParams) => Action
  doGetEventListDataRequest:()=>Action
  doGetEventInfoRequest:(eventId:number)=>Action
  doErrorDetails: any,
  eventInfo:EventInfo
  errorInfo:ErrorInfo
  eventListData:PageData<EventListDataItem>,
  eventListMoreShow:boolean
  eventInfoLoading:boolean,
  projectMembers: Member[]
}

const ErrorDetails = ({eventInfoLoading,doGetEventInfoRequest,eventListMoreShow, errorInfo,eventInfo,eventListLoading,doErrorChange, doErrorDetails ,eventListData,doGetEventListDataRequest,projectMembers}: Props) => {
  const userMenu = (
    <Menu 
    // onClick={({key})=>doErrorChange({guarderId: key, errorIds: keys, actionType: 'GUARDER'})}
    >
    {projectMembers.map(item=>(
      <Menu.Item key={item.id}>
        {item.nickName || item.username}
      </Menu.Item>
    ))}
  </Menu>
    
  )

  const statusMenu = (
    <Menu 
    // onClick={({ key }) => doErrorChange({ updateData:{status: key}, errorList: [errorInfo.id] })}
    >
      {ERROR_STATUS.map(status => (
        <Menu.Item key={status.value}>{status.text}</Menu.Item>
      ))}
    </Menu>
  )

  const selectionHandler = (
    <span className='handler'>
      &emsp;
      <Dropdown trigger={['click']} overlay={userMenu}>
        <Tooltip placement="right" title="指派">
          <Button shape="circle" icon="user" />
        </Tooltip>
      </Dropdown>
      <Dropdown trigger={['click']} overlay={statusMenu}>
        <Tooltip placement="right" title="状态">
          <Button shape="circle" icon="question" />
        </Tooltip>
      </Dropdown>
    </span>
  )


  const loadMore = !eventListLoading&&eventListMoreShow ? (
    <div style={{
      textAlign: 'center', paddingTop: 12, paddingBottom: 12, lineHeight: '32px',
    }}
    >
      <Button onClick={doGetEventListDataRequest}>加载更多</Button>
    </div>
  ) : null;
  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <FilterBar dashboard={false} doGetErrorAllData={doErrorDetails} />
      </div>
      <div className={style.handler}>{selectionHandler}</div>
      <div className={style.content}>
        <div className={style.list}>
          <List
            className="demo-loadmore-list"
            loading={eventListLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={eventListData.list}
            renderItem={item => (
              <List.Item className={item.id === eventInfo.id ? style.selected: ''} onClick={()=>doGetEventInfoRequest(item.id)}>
                  <List.Item.Meta
                    title={item.type}
                    description={item.url}
                  />
              </List.Item>
            )}
          />
        </div>
        <div className={style.main}>
          <Spin spinning={eventInfoLoading}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <div>
                  {eventInfo.source ? <ErrorBasicInfo /> : null}
                </div>
              </TabPane>
              <TabPane tab="用户行为" key="2">
              
                {
                  eventInfo.source ? <ErrorBehavior /> : null
                }
              </TabPane>
            </Tabs>
          </Spin>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  ...bindActionCreators(
    {
      doErrorChange: params => {
        return actions.doErrorChange(params)
      },
      doErrorDetails: params => {
        return actions.doErrorChange(params)
      },
      doGetEventListDataRequest:()=>{
          return actions.doGetEventListDataRequest({})
      },
      doGetEventInfoRequest:params=>actions.doGetEventInfoRequest(params)
    },
    dispatch
  )
})

const mapStateToprops = (state: StoreState) => {
  const { project, work } = state;
  const { projectMembers } = project;
  const { eventListLoading, eventListData, eventInfo, errorInfo, eventListMoreShow, eventInfoLoading } = work;
  return {
    eventListLoading,
    eventListData,
    eventInfo,
    errorInfo,
    eventListMoreShow,
    eventInfoLoading,
    projectMembers
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(ErrorDetails)
