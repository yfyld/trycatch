import * as React from 'react'
import FilterBar from './components/FilterBar'
// import ErrorTable from './components/ErrorTable'
import ErrorChartLine from './components/ErrorChartLine'
import { Table, Tag,Button,Tooltip,Menu, Dropdown } from 'antd'
import style from './Dashboard.less'
import * as actions from '@/store/actions'
import {connect} from 'react-redux'
import { parseDate } from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import { Action, ErrorListParams, Order,ErrorChangeParams ,ErrorListData} from '@/types'
import { Link } from 'react-router-dom';
import * as moment from "moment";

const { Column } = Table

interface ChartData{
  name:string
  value:number[]
}
interface Props {
  doGetErrorAllData: (params:ErrorListParams) => any
  loading: boolean,
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
}: TableSearchParams): ErrorListParams => {
  const params: ErrorListParams = {
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






const Dashboard = ({ loading, doGetErrorAllData,errorChartData ,errorListData,rowSelectionKeys,doErrorListSelectionChange,doErrorChange}: Props) => {

  const userMenu=(
    <Menu onClick={({key})=>doErrorChange({userId:Number(key),errorList:rowSelectionKeys})}>
      <Menu.Item key={1}>
        小王
      </Menu.Item>
    </Menu>
  )

  const statusMenu=(
    <Menu onClick={({key})=>doErrorChange({status:key,errorList:rowSelectionKeys})}>
      <Menu.Item key="UNSOLVED">
        未解决
      </Menu.Item>
    </Menu>
  )

  const selectionHandler =(
    <span>&emsp;
      <Dropdown trigger={["click"]} overlay={userMenu}>
          <Tooltip placement="right" title="指派"><Button shape="circle" icon="user" /></Tooltip>
      </Dropdown>
      <Dropdown trigger={["click"]} overlay={statusMenu}>
          <Tooltip placement="right" title="状态"><Button shape="circle" icon="user" /></Tooltip>
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
          }} rowKey="id" loading={loading} dataSource={errorListData.data} onChange={(pagination:any, filters:any, sorter:any)=>doGetErrorAllData(mapTableSearchParamsToParam({pagination, filters, sorter}))}>
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
                  <p>{record.desc}</p>
                </Link>
                <div>
                  <span>
                    {moment(record.dateStart).fromNow()}~{moment(record.dateEnd).fromNow()}
                  </span>
                  <span>
                  <Dropdown trigger={["click"]} overlay={userMenu}>
                      <Tooltip placement="right" title="指派"><Tag color="blue">{record.ownerName}</Tag></Tooltip>
                  </Dropdown>
                  </span>
                </div>
              </div>
            )}
          />
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
            title="错误类型"
            dataIndex="type"
            key="type"
            render={type => <Tag color="blue">{type}</Tag>}
          />
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
            title="状态"
            dataIndex="status"
            key="status"
            render={status => <Tag color="blue">{status}</Tag>}
          />
          <Column sorter title="时间" dataIndex="date" key="date" />

          <Column
            sorter
            title="事件数"
            dataIndex="eventTotal"
            key="eventTotal"
          />

          <Column sorter title="用户数" dataIndex="userTotal" key="userTotal" />
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
    errorChartData: state.work.errorChartData.data.map(item=>({name:parseDate(item.date,'yyyy-MM-dd'),value:[item.date,item.count]})),
    loading: state.work.loading,
    rowSelectionKeys:state.work.rowSelectionKeys,
    errorListData:state.work.errorListData
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Dashboard)
