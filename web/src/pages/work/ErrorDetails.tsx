import * as React from 'react'
import FilterBar from './components/FilterBar'
import { Button, List,Tabs,Spin } from 'antd'
import style from './ErrorDetails.less'
import * as actions from '@/store/actions'
import { connect } from 'react-redux'
// import {findOne} from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import { IAction, IErrorChangeParams,EventListDataItem,IPageData,IEventInfo,IErrorInfo, IMember, IEventChartData } from '@/types'
// import * as moment from "moment";
import ErrorBehavior from './components/ErrorBehavior';
import EventBasicInfo from './components/EventBasicInfo';
import EventChartBar from './components/EventChartBar';
import EventRation from './components/EventRation';
import ErrorInfo from './components/ErrorInfo';
import EventListItem from './components/EventListItem';

const {TabPane} =Tabs;
interface Props extends IEventChartData{
  eventListLoading: boolean
  doErrorChange: (params: IErrorChangeParams) => IAction
  doGetEventListDataRequest:()=>IAction
  doGetEventInfoRequest:(eventId:number)=>IAction,
  doSetEventInfo: (param: IEventInfo) => IAction,
  doErrorDetails: any,
  eventInfo:IEventInfo
  errorInfo:IErrorInfo
  eventListData:IPageData<EventListDataItem>,
  eventListMoreShow:boolean
  eventInfoLoading:boolean,
  projectMembers: IMember[],
  eventId: number,
}

const ErrorDetails = ({eventInfoLoading,doSetEventInfo,eventListMoreShow, errorInfo,eventInfo,eventListLoading,doErrorChange, doErrorDetails ,eventListData,doGetEventListDataRequest,projectMembers, trendStat, deviceStat, osStat, browserStat, eventId}: Props) => {
 

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
      <div className={style.content}>
        <div>
          <ErrorInfo />
        </div>
        <div className={style.stat}>
          <div className={style.chart}>
            <EventChartBar data={trendStat.data}/>
          </div>
          <div className={style.ration}>
            <EventRation {...deviceStat} title='设备'/>
            <EventRation {...osStat} title='操作系统'/>
            <EventRation {...browserStat} title='浏览器'/>
          </div>
        </div>
        <div className={style.event}>
          <div className={style.list}>
            <List
              className="demo-loadmore-list"
              loading={eventListLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={eventListData.list}
              renderItem={item => (
                <List.Item className={item.id === eventId ? style.selected: ''} onClick={()=>doSetEventInfo(item)}>
                    <EventListItem {...item}/>
                </List.Item>
              )}
            />
          </div>
          <div className={style.main}>
          <Spin spinning={eventInfoLoading}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <div>
                  <EventBasicInfo />
                </div>
              </TabPane>
              <TabPane tab="用户行为" key="2">
                <div>
                  <ErrorBehavior />
                </div>
              </TabPane>
            </Tabs>
          </Spin>
        </div>
        </div>
      </div>
      
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
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
      doGetEventInfoRequest:params=>actions.doGetEventInfoRequest(params),
      doSetEventInfo: (param: IEventInfo) => actions.doSetEventInfo(param)
    },
    dispatch
  )
})

const mapStateToprops = (state: StoreState) => {
  const { project, work } = state;
  const { projectMembers } = project;
  const { eventListLoading, eventListData, eventInfo, errorInfo, eventListMoreShow, eventInfoLoading, eventChartData, eventId } = work;
  return {
    eventListLoading,
    eventListData,
    eventInfo,
    errorInfo,
    eventListMoreShow,
    eventInfoLoading,
    projectMembers,
    eventId,
    ...eventChartData,
    
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(ErrorDetails)
