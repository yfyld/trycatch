import * as React from 'react'
import FilterBar from './components/FilterBar'
import { Button, Tooltip, Menu, Dropdown, List,Tabs } from 'antd'
import style from './ErrorDetails.less'
import * as actions from '@/store/actions'
import { connect } from 'react-redux'
// import {findOne} from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import { Action, ErrorChangeParams,EventListDataItem,PageData,EventInfo,ErrorInfo } from '@/types'
// import * as moment from "moment";
import { ERROR_STATUS } from '@/constants'
const {TabPane} =Tabs;
interface Props {
  eventListLoading: boolean
  doErrorChange: (params: ErrorChangeParams) => Action
  doGetEventListDataRequest:()=>Action
  doErrorDetails: any,
  eventInfo:EventInfo
  errorInfo:ErrorInfo
  eventListData:PageData<EventListDataItem>
}

const ErrorDetails = ({ errorInfo,eventInfo,eventListLoading,doErrorChange, doErrorDetails ,eventListData,doGetEventListDataRequest}: Props) => {
  const userMenu = (
    <Menu
      onClick={({ key }) =>
        doErrorChange({ updateData:{ownerId: Number(key)}, errorList: [errorInfo.id] })
      }
    >
      <Menu.Item key={1}>小王</Menu.Item>
    </Menu>
  )

  const statusMenu = (
    <Menu onClick={({ key }) => doErrorChange({ updateData:{status: key}, errorList: [errorInfo.id] })}>
      {ERROR_STATUS.map(status => (
        <Menu.Item key={status.value}>{status.text}</Menu.Item>
      ))}
    </Menu>
  )

  const selectionHandler = (
    <span>
      &emsp;
      <Dropdown trigger={['click']} overlay={userMenu}>
        <Tooltip placement="right" title="指派">
          <Button shape="circle" icon="user" />
        </Tooltip>
      </Dropdown>
      <Dropdown trigger={['click']} overlay={statusMenu}>
        <Tooltip placement="right" title="状态">
          <Button shape="circle" icon="setting" />
        </Tooltip>
      </Dropdown>
    </span>
  )


  const loadMore = !eventListLoading ? (
    <div style={{
      textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
    }}
    >
      <Button onClick={doGetEventListDataRequest}>加载更多</Button>
    </div>
  ) : null;

  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <FilterBar doGetErrorAllData={doErrorDetails} />
      </div>
      <div className={style.table}>{selectionHandler}</div>
      <div className={style.content}>
        <div className={style.list}>
          <List
            className="demo-loadmore-list"
            loading={eventListLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={eventListData.data}
            renderItem={item => (
              <List.Item>
                  <List.Item.Meta
                    title={item.type}
                    description={item.url}
                  />
              </List.Item>
            )}
          />
        </div>
        <div className={style.main}>
        <Tabs defaultActiveKey="1">
        <TabPane tab="基本信息" key="1">
              <div>
              {eventInfo.source}
              </div>
        </TabPane>
        <TabPane tab="用户行为" key="2">
        <div>
{eventInfo.source?JSON.stringify(JSON.parse(eventInfo.source).behavior):''}
        </div>
              
        </TabPane>
      </Tabs>
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
      }
    },
    dispatch
  )
})

const mapStateToprops = (state: StoreState) => {
  return {
    eventListLoading: state.work.eventListLoading,
    eventListData:state.work.eventListData,
    eventInfo:state.work.eventInfo,
    errorInfo:state.work.errorInfo
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(ErrorDetails)
