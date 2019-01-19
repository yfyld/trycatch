import * as React from 'react'
import FilterBar from './components/FilterBar'
// import ErrorTable from './components/ErrorTable'
import ErrorChartLine from './components/ErrorChartLine'
import { Table, Tag } from 'antd'
import style from './Dashboard.less'
import  * as actions from '@/store/actions'
import { connect } from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import {Action,ErrorListParams} from "@/types"

const { Column } = Table

interface Props {
    doGetErrorAllData: Function,
}

const data = [
  {
    key: '1',
    type: 'John',
    status: 'Brown',
    date: 32,
    eventTotal: 11,
    userTotal: 2,
    version: '版本',
    name: '',
    appointer: '小王'
  },
  {
    key: '2',
    type: 'John',
    status: 'Brown',
    date: 32,
    eventTotal: 111,
    userTotal: 22,
    version: '版本',
    name: '',
    appointer: '小王'
  }
]


@connect(
    (state: StoreState) => {
      console.log(state)
      return {
        projectList: state.project.projectList
      }
    },
    (dispatch: Dispatch<Action>) =>bindActionCreators({
        doGetErrorAllData: (params:ErrorListParams)=>actions.doGetErrorAllData(params)
    },dispatch)
  )
export default class Dashboard extends React.Component<Props> {
  state={
    loading:false
  }
  hanldeTableChange=(pagination, filters, sorter)=>{
    console.log(pagination, filters, sorter)
    this.props.doGetErrorAllData({})
  }
 
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.filter}>
          <FilterBar />
        </div>
        <div className={style.chart}>
          <ErrorChartLine />
        </div>
        <div className={style.table}>
          <Table loading={this.state.loading} dataSource={data} onChange={this.hanldeTableChange}>
            <Column
              width={400}
              title="概要"
              dataIndex="name"
              key="name"
              render={(text, record: any, index) => (
                <div>
                  <div>
                    <strong>{record.type}</strong>
                    {record.url}
                  </div>
                  <div>
                    <span>{record.desc}</span>
                  </div>
                  <div>
                    <span>
                      {record.dateStart}~{record.dateEnd}
                    </span>
                    <span>{record.appointer}</span>
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

            <Column
              sorter
              title="用户数"
              dataIndex="userTotal"
              key="userTotal"
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
              title="版本"
              dataIndex="version"
              key="version"
            />
          </Table>
        </div>
      </div>
    )
  }
}
