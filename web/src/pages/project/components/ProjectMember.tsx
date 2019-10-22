import * as React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Table, Button, Popover, Menu } from 'antd'
import findIndex from 'lodash/findIndex'
import { IStoreState, IAction  } from '@/types'
import * as actions from '@/store/actions'
import ProjectMemberAdd from './ProjectMemberAdd'
import style from './ProjectMember.less'
import { IProjectMemberUpdate,IProjectMemberOperate ,IMember} from '@/api'

interface Props {
  memberList: IMember[]
  doAddProjectMemberToggle: () => {}
  projectMemberAddVisible: boolean
  className?: string
  doSelectProjectMember: (selectedKeys: number[]) => {}
  selectedRowKeys: number[]
  doDeleteProjectMember: (data: IProjectMemberOperate) => {}
  doUpdateProjectMember: (data: IProjectMemberUpdate) => {}
  projectId: number
}

function renderColumns() {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '角色',
      dataIndex: 'roleCode',
      key: 'roleCode',
      render: (roleCode: String, record: IMember) => roleCode
    }
    // {
    //     title: '操作',
    //     dataIndex: 'id',
    //     key: 'action',
    //     render: (id) => (
    //         <div>
    //             <Tooltip title='删除'>
    //                 <Icon type='delete'/>
    //             </Tooltip>
    //         </div>
    //     )
    // }
  ]
  return columns
}

function ProjectMember({
  projectId,
  className,
  memberList,
  doAddProjectMemberToggle,
  projectMemberAddVisible,
  doSelectProjectMember,
  doDeleteProjectMember,
  doUpdateProjectMember,
  ...props
}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const rowSelection = {
    // selectedRowKeys,
    selectedRowKeys: selectedRowKeys.filter((i: number) => findIndex(memberList, (j: IMember): boolean => j.id === i) !== -1),
    onChange: selectedKeys => {
      //   doSelectProjectMember(selectedKeys);

      setSelectedRowKeys(selectedKeys)
    }
  }

  const UpdateMemberMemu = (
    <Menu
      onClick={({ key }) => {
        doUpdateProjectMember({
          memberIds: selectedRowKeys,
          projectId,
          roleCode: key
        })
      }}
    >
      <Menu.Item key="ADMIN">管理员</Menu.Item>
      <Menu.Item key="DEVELOPER">普通成员</Menu.Item>
    </Menu>
  )

  return (
    <div className={className}>
      <div className={style.action}>
        <Button type="primary" onClick={doAddProjectMemberToggle}>
          添加项目成员
        </Button>
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0}
          onClick={() => {
            doDeleteProjectMember({ memberIds: selectedRowKeys, projectId })
          }}
        >
          删除项目成员
        </Button>
        <Popover placement="bottom" content={UpdateMemberMemu} trigger="click">
          <Button type="primary" disabled={selectedRowKeys.length === 0}>
            修改项目成员权限
          </Button>
        </Popover>
      </div>
      <div>
        <Table pagination={false} columns={renderColumns()} rowKey="id" dataSource={memberList} rowSelection={rowSelection} />
      </div>
      {projectMemberAddVisible && <ProjectMemberAdd />}
    </div>
  )
}
const mapStateToProps = (state: IStoreState) => {
  const {
    projectMembers: memberList = [],
    projectMemberAddVisible,
    projectMemberSelectedKeys: selectedRowKeys,
    projectId
  } = state.project
  return {
    memberList,
    projectMemberAddVisible,
    selectedRowKeys,
    projectId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doAddProjectMemberToggle: () => actions.doAddProjectMemberToggle(true),
      doSelectProjectMember: (selectedKeys: number[]) => actions.doSelectProjectMember(selectedKeys),
      doDeleteProjectMember: (data: IProjectMemberOperate) => actions.doDeleteProjectMemberRequest(data),
      doUpdateProjectMember: (data: IProjectMemberUpdate) => actions.doUpdateProjectMemberRequest(data)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMember)
