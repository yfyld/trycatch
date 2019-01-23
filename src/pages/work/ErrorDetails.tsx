import * as React from 'react'
import FilterBar from './components/FilterBar'
import { Button, Tooltip, Menu, Dropdown, List,Skeleton } from 'antd'
import style from './Dashboard.less'
import * as actions from '@/store/actions'
import { connect } from 'react-redux'
// import {findOne} from '@/utils'
import { bindActionCreators } from 'redux'
import { StoreState } from '@/store/reducers'
import { Dispatch } from 'redux'
import { Action, ErrorChangeParams } from '@/types'
// import * as moment from "moment";
import { ERROR_STATUS } from '@/constants'

interface Props {
  loading: boolean
  doErrorChange: (params: ErrorChangeParams) => Action
  doErrorDetails: any
}

const ErrorDetails = ({ loading,doErrorChange, doErrorDetails }: Props) => {
  const userMenu = (
    <Menu
      onClick={({ key }) =>
        doErrorChange({ userId: Number(key), errorList: [1] })
      }
    >
      <Menu.Item key={1}>小王</Menu.Item>
    </Menu>
  )

  const statusMenu = (
    <Menu onClick={({ key }) => doErrorChange({ status: key, errorList: [1] })}>
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
          <Button shape="circle" icon="user" />
        </Tooltip>
      </Dropdown>
    </span>
  )


  const loadMore = !loading ? (
    <div style={{
      textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
    }}
    >
      <Button>加载更多</Button>
    </div>
  ) : null;

  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <FilterBar doGetErrorAllData={doErrorDetails} />
      </div>
      <div className={style.table}>{selectionHandler}</div>
      <div>
        <div>
          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout="horizontal"
            loadMore={loadMore}
            // dataSource={list}
            renderItem={item => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title="HTTP_EOORE"
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
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
      }
    },
    dispatch
  )
})

const mapStateToprops = (state: StoreState) => {
  return {
    loading: state.work.loading
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(ErrorDetails)
