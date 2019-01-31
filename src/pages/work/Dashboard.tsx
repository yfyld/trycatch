import * as React from 'react'
import FilterBar from './components/FilterBar'
// import ErrorTable from './components/ErrorTable'
import ErrorChartLine from './components/ErrorChartLine'
import { Table, Tag,Button,Tooltip,Menu, Dropdown } from 'antd'
import style from './Dashboard.less'
import * as actions from '@/store/actions'
import {connect} from 'react-redux'
import { parseDate ,findOne} from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import { Action, ErrorSearchParams, Order,ErrorChangeParams ,ErrorListData} from '@/types'
import { Link } from 'react-router-dom';
import * as moment from "moment";
import {ERROR_STATUS,ERROR_TYPE} from "@/constants"

const { Column } = Table

interface ChartData{
  name:string
  value:number[]
}
 
interface Props {
  doGetErrorAllData: (params:ErrorSearchParams) => any
  errorListLoading: boolean,
  errorChartData:ChartData[],
  errorListData:ErrorListData,
  rowSelectionKeys:number[],
  doErrorListSelectionChange:(params:number[])=>Action,
  doErrorChange:(params:ErrorChangeParams)=>Action
}

interface TableSearchParams {
  pagination: { current: number; pageSize: number }
  filters: { type: string; status: string[] }
  sorter: { field: string; order: Order }
}

const mapTableSearchParamsToParam = ({
  pagination,
  filters,
  sorter
}: TableSearchParams): ErrorSearchParams => {
  const params: ErrorSearchParams = {
    page: pagination.current,
    pageSize: pagination.pageSize
  }
  for (const i in filters) {
    if (filters.hasOwnProperty(filters[i])) {
      params[i] = filters[i][0]
    }
  }
  if (sorter.field) {
    params[sorter.field] = sorter.order
  }

  return params
}


const userMenu=(keys:number[],doErrorChange:Function)=>(
  <Menu onClick={({key})=>doErrorChange({userId:Number(key),errorList:keys})}>
    <Menu.Item key={1}>
      小王
    </Menu.Item>
  </Menu>
)


const statusMenu=(keys:number[],doErrorChange:Function)=>(
  <Menu onClick={({key})=>doErrorChange({status:key,errorList:keys})}>
    {
      ERROR_STATUS.map(status=>(
        <Menu.Item key={status.value}>
          {status.text}
        </Menu.Item>
      ))
    }
  </Menu>
)




const Dashboard = ({ errorListLoading, doGetErrorAllData,errorChartData ,errorListData,rowSelectionKeys,doErrorListSelectionChange,doErrorChange}: Props) => {



  const selectionHandler =(
    <span>&emsp;
      <Dropdown trigger={["click"]} overlay={userMenu(rowSelectionKeys,doErrorChange)}>
          <Tooltip placement="right" title="指派"><Button shape="circle" icon="user" /></Tooltip>
      </Dropdown>
      <Dropdown trigger={["click"]} overlay={statusMenu(rowSelectionKeys,doErrorChange)}>
          <Tooltip placement="right" title="状态"><Button shape="circle" icon="setting" /></Tooltip>
      </Dropdown>
    </span>
  );

  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <FilterBar doGetErrorAllData={doGetErrorAllData} />
      </div>
      <div className={style.chart}>
        <ErrorChartLine data={errorChartData} />
      </div>
      <div className={style.table}>
        <Table rowSelection={{
          selectedRowKeys:rowSelectionKeys,
          onChange: doErrorListSelectionChange
          }} rowKey="id" loading={errorListLoading} dataSource={errorListData.list} onChange={(pagination:any, filters:any, sorter:any)=>doGetErrorAllData(mapTableSearchParamsToParam({pagination, filters, sorter}))}>
          <Column
            width={400}
            title={<div>全选{rowSelectionKeys.length?selectionHandler:''}</div>}
            dataIndex="name"
            key="name"
            render={(text, record: any, index) => (
              <div>
                <Link to={`/error-details/${record.id}`}>
                  <strong>{record.type}</strong>
                  {record.url}
                  <p>{record.name}</p>
                  <p>{record.message}</p>
                </Link>
                <div>
                  <span>
                    {moment(record.created_at).fromNow()}~{moment(record.updated_at).fromNow()}
                  </span>
                  <span>
                  <Dropdown trigger={["click"]} overlay={userMenu([record.id],doErrorChange)}>
                      <Tag color="blue">{record.ownerName}</Tag>
                  </Dropdown>
                  </span>
                </div>
              </div>
            )}
          />
          <Column
            filterMultiple={false}
            filters={ERROR_TYPE}
            title="错误类型"
            dataIndex="type"
            key="type"
            render={type => <Tag color="blue">{findOne(ERROR_TYPE,type).text}</Tag>}
          />
          <Column
            filterMultiple={false}
            filters={ERROR_STATUS}
            title="状态"
            dataIndex="status"
            key="status"
            render={(status,record:any) =>(
              <Dropdown trigger={["click"]} overlay={statusMenu([record.id],doErrorChange)}>
                  <Tag>{findOne(ERROR_STATUS,status).text}</Tag>
              </Dropdown>
            )}
          />
          <Column sorter title="时间" dataIndex="updated_at" key="updated_at" render={
            (date)=>(moment(date).fromNow())
          } />

          <Column
            sorter
            title="事件数"
            dataIndex="eventCount"
            key="eventCount"
          />

          <Column sorter title="用户数" dataIndex="userCount" key="userCount" />
          <Column
            filterMultiple={false}
            filters={[
              {
                text: 'Joe',
                value: 'Joe'
              },
              {
                text: 'Jim',
                value: 'Jim'
              }
            ]}
            title="版本"
            dataIndex="version"
            key="version"
          />
        </Table>
      </div>
    </div>
  )
}



const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  ...bindActionCreators(
    {
      doGetErrorAllData: (params) => {
        return actions.doGetErrorAllData(params)
      },
      doErrorListSelectionChange: (params) => {
        return actions.doErrorListSelectionChange(params)
      },
      doErrorChange: (params) => {
        return actions.doErrorChange(params)
      },
    },
    dispatch
  )
})

const mapStateToprops = (state: StoreState) => {
  return {
    errorChartData: state.work.errorChartData.list.map(item=>({name:parseDate(item.date,'yyyy-MM-dd'),value:[item.date,item.count]})),
    errorListLoading: state.work.errorListLoading,
    rowSelectionKeys:state.work.rowSelectionKeys,
    errorListData:state.work.errorListData
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Dashboard)
