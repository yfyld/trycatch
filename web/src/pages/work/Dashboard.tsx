import * as React from 'react'
import FilterBar from './components/FilterBar'
// import ErrorTable from './components/ErrorTable'
import ErrorChartLine from './components/ErrorChartLine'
import { Table, Tag,Button,Tooltip,Menu, Dropdown,Icon } from 'antd'
import style from './Dashboard.less'
import * as actions from '@/store/actions'
import {connect} from 'react-redux'
import { parseDate ,findOne} from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import { Action, ErrorSearchParams, Order,ErrorChangeParams ,ErrorListData,Member} from '@/types'
import { Link } from 'react-router-dom';
import * as moment from "moment";
import {ERROR_STATUS,ERROR_TYPE,ERROR_LEVEL} from "@/constants"
import {projectMembersMapSelector} from "@/store/selectors"

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
  projectId:number,
  projectMembers:Member[]
  projectMembersMap:{[props:number]:Member}
  doErrorListSelectionChange:(params:number[])=>Action,
  doErrorChange:(params:ErrorChangeParams)=>Action,
  errorSearchParams:ErrorSearchParams
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
    pageSize: pagination.pageSize,
    status:null,
    order:null,
    orderKey:null,
    type:null,
    level:null
  }
  for (const i in filters) {

    if (filters.hasOwnProperty(i)) {
      params[i] = filters[i][0]
    }
  }
  if (sorter.field) {
    params.orderKey=sorter.field;
    params.order=sorter.order
  }
  console.log(params,filters,
    sorter)
  return params
}


const userMenu=(keys:number[],doErrorChange:Function,projectMembers)=>(
  <Menu 
    onClick={({key})=>doErrorChange({guarderId: key, errorIds: keys, actionType: 'GUARDER'})}>
    {projectMembers.map(item=>(
      <Menu.Item key={item.id}>
        {item.nickname || item.username}
      </Menu.Item>
    ))}
  </Menu>
)


const statusMenu=(keys:number[],doErrorChange:Function)=>(
  <Menu onClick={({key})=>doErrorChange({errorIds: keys, status: key, actionType: 'STATUS'})}>
    {
      ERROR_STATUS.map(status=>(
        <Menu.Item key={status.value}>
          {status.text}
        </Menu.Item>
      ))
    }
  </Menu>
)

const levelMenu=(keys:number[],doErrorChange:Function)=>(
  <Menu onClick={({key})=>doErrorChange({errorIds:keys, level: key, actionType: 'LEVEL'})}>
    {
      ERROR_LEVEL.map(level=>(
        <Menu.Item key={level.value}>
          {level.text}
        </Menu.Item>
      ))
    }
  </Menu>
)



const Dashboard = ({errorSearchParams,projectMembers,projectMembersMap,projectId, errorListLoading, doGetErrorAllData,errorChartData ,errorListData,rowSelectionKeys,doErrorListSelectionChange,doErrorChange}: Props) => {



  const selectionHandler =(
    <span className='handler'>&emsp;
      <Dropdown trigger={["click"]} overlay={userMenu(rowSelectionKeys,doErrorChange,projectMembers)}>
          <Tooltip placement="right" title="指派"><Button shape="circle" icon="user" /></Tooltip>
      </Dropdown>
      <Dropdown trigger={["click"]} overlay={statusMenu(rowSelectionKeys,doErrorChange)}>
          <Tooltip placement="right" title="状态"><Button shape="circle" icon="question" /></Tooltip>
      </Dropdown>
      <Dropdown trigger={["click"]} overlay={levelMenu(rowSelectionKeys,doErrorChange)}>
          <Tooltip placement="right" title="错误等级"><Button shape="circle" icon="exclamation" /></Tooltip>
      </Dropdown>
    </span>
  );
  
  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <FilterBar doGetErrorAllData={doGetErrorAllData} />
      </div>
      <div className={style.content}>
      <div className={style.chart}>
        <ErrorChartLine data={errorChartData} />
      </div>
      <div className={style.table}>
        <Table rowSelection={{
          selectedRowKeys:rowSelectionKeys,
          onChange: doErrorListSelectionChange
          }} 
          rowKey="id" 
          loading={errorListLoading} 
          dataSource={errorListData.list} 
          onChange={(pagination:any, filters:any, sorter:any)=>doGetErrorAllData(mapTableSearchParamsToParam({pagination, filters, sorter}))}
        >
          <Column
            width={400}
            title={<div>全选{rowSelectionKeys.length?selectionHandler:''}</div>}
            dataIndex="name"
            key="name"
            render={(text, record: any, index) => (
              <div>
                <Link to={`/dashboard/${projectId}/${record.id}`}>
                  <strong>{record.type}</strong>
                  <p className={style.url}>{record.url}</p>
                  <p>{record.name}</p>
                  <p>{record.message}</p>
                </Link>
                <div>
                  <span>
                    {moment(record.created_at).fromNow()}~{moment(record.updated_at).fromNow()}
                  </span>
                  <span>
                  <Dropdown trigger={["click"]} overlay={userMenu([record.id],doErrorChange,projectMembers)}>
                      <Tag><Icon type="user" />{record.guarder&&record.guarder.name}</Tag>
                  </Dropdown>
                  </span>
                </div>
              </div>
            )}
          />
          <Column
            filterMultiple={false}
            filters={ERROR_LEVEL}
            filteredValue={errorSearchParams.level?[errorSearchParams.level]:[]}
            title="错误等级"
            dataIndex="level"
            key="level"
            render={(level,record:any) =>{
              const item=findOne(ERROR_LEVEL,level);
              return (
                <Dropdown trigger={["click"]} overlay={levelMenu([record.id],doErrorChange)}>
                    <Tag color={item ?item.color: undefined} >{item ? item.text : level}</Tag>
                </Dropdown>
              )
            }}
          />
          <Column
            filterMultiple={false}
            filters={ERROR_TYPE}
            filteredValue={errorSearchParams.type?[errorSearchParams.type]:[]}
            title="错误类型"
            dataIndex="type"
            key="type"
            render={type => {
              const item = findOne(ERROR_TYPE,type);
              return (
                <Tag>{item ? item.text : type}</Tag>
              )
            }}
          />
          <Column
            filterMultiple={false}
            filters={ERROR_STATUS}
            filteredValue={errorSearchParams.status?[errorSearchParams.status]:[]}
            title="状态"
            dataIndex="status"
            key="status"
            render={(status,record:any) =>{
              const item = findOne(ERROR_STATUS,status);
              return (
                <Dropdown trigger={["click"]} overlay={statusMenu([record.id],doErrorChange)}>
                    <Tag color={item ? item.color : undefined}>{item ?item.text: status}</Tag>
                </Dropdown>
              )
            }}
          />
          <Column sorter title="时间" dataIndex="updated_at" key="updated_at" render={
            (date)=>(moment(date).fromNow())
          } />

          <Column
            sorter
            title="事件数"
            dataIndex="eventNum"
            key="eventNum"
          />

          <Column sorter title="用户数" dataIndex="userNum" key="userNum" />
          <Column
            filterMultiple={false}
            filters={[
              {
                text: 'all',
                value: 'all'
              },
              {
                text: 'production',
                value: 'production'
              }
            ]}
            title="版本"
            dataIndex="version"
            key="version"
          />
        </Table>
      </div>
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
    errorListLoading: state.work.errorListLoading,
    rowSelectionKeys:state.work.rowSelectionKeys,
    errorListData:state.work.errorListData,
    projectId:Number(state.router.location.pathname.split("/")[2]),
    projectMembers:state.project.projectMembers,
    projectMembersMap:projectMembersMapSelector(state),
    errorSearchParams:state.work.errorSearchParams
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Dashboard)
