import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators,Dispatch } from 'redux'
import { Table, Button } from 'antd';
import findIndex from 'lodash/findIndex';
import { StoreState, Member, Action, ProjectMemberOperate, User } from '@/types';
import * as actions from "@/store/actions"
import ProjectMemberAdd from './ProjectMemberAdd';
import style from './ProjectMember.less';

interface Props {
    memberList: Member[],
    doAddProjectMemberToggle: () => {},
    projectMemberAddVisible: boolean,
    className?: string,
    doSelectProjectMember: (selectedKeys: number[]) => {},
    selectedRowKeys: number[],
    doDeleteProjectMember: (data: ProjectMemberOperate) => {},
    projectId: number
}



function renderColumns() {
    const columns = [{
        title: '姓名',
        dataIndex: 'user',
        key: 'nickname',
        render :(user: User, record:Member) => user && (user.nickname || user.username)
    }, {
        title: '用户名',
        dataIndex: 'user',
        key: 'username',
        render: (user: User, record: Member) => user && user.username
    }, {
        title: '角色',
        dataIndex: 'role',
        key: 'role'
    },
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
    return columns;
}

function ProjectMember({projectId, className, memberList, doAddProjectMemberToggle, projectMemberAddVisible, doSelectProjectMember, doDeleteProjectMember, ...props}: Props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        // selectedRowKeys,
        selectedRowKeys: selectedRowKeys.filter((i: number) => findIndex(memberList, (j: Member): boolean => j.id === i) !== -1),
        onChange: (selectedKeys) => {
        //   doSelectProjectMember(selectedKeys);
         
            setSelectedRowKeys(selectedKeys)
        }
    };
    return (
        <div className={className}>
            <div className={style.action}>
                <Button type='primary' onClick={doAddProjectMemberToggle}>添加项目成员</Button>
                <Button type='primary' disabled={selectedRowKeys.length === 0} onClick={() => { doDeleteProjectMember({memberIds: selectedRowKeys, projectId}) }}>删除项目成员</Button>
            </div>
            <div>
                <Table 
                    pagination={false}
                    columns={renderColumns()}
                    rowKey='id'
                    dataSource={memberList}
                    rowSelection={rowSelection}
                />
            </div>
        { projectMemberAddVisible && <ProjectMemberAdd/> }
        </div>
        
    )
}
const mapStateToProps = (state: StoreState) => {
    const { projectMembers: memberList = [], projectMemberAddVisible, projectMemberSelectedKeys: selectedRowKeys, projectId } = state.project;
    return {
        memberList,
        projectMemberAddVisible,
        selectedRowKeys,
        projectId
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
    doAddProjectMemberToggle: () => actions.doAddProjectMemberToggle(true),
    doSelectProjectMember: (selectedKeys: number[]) => actions.doSelectProjectMember(selectedKeys),
    doDeleteProjectMember: (data: ProjectMemberOperate) => actions.doDeleteProjectMemberRequest(data) 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember)

