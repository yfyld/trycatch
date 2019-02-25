import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators,Dispatch } from 'redux'
import { Table, Button } from 'antd';
import { StoreState, Member, Action } from '@/types';
import * as actions from "@/store/actions"
import ProjectMemberAdd from './ProjectMemberAdd';


interface Props {
    memberList: Member[],
    doAddProjectMemberToggle: () => {},
    projectMemberAddVisible: boolean,
    className?: string,
    doSelectProjectMember: (selectedKeys: number[]) => {},
    selectedRowKeys: number[],
    doDeleteProjectMember: (params:object) => {}
}

function renderColumns() {
    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render :(name, record:Member) => name || record.mobile
    }, {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile'
    }, {
        title: '角色',
        dataIndex: 'role',
        key: 'role'
    }]
    return columns;
}

function ProjectMember({className, memberList, doAddProjectMemberToggle, projectMemberAddVisible, doSelectProjectMember, selectedRowKeys, doDeleteProjectMember, ...props}: Props) {
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
          doSelectProjectMember(selectedKeys);
        }
    };
    return (
        <div className={className}>
            <div>
                <Button type='primary' onClick={doAddProjectMemberToggle}>添加项目成员</Button>
                <Button type='primary' disabled={selectedRowKeys.length === 0} onClick={() => { doDeleteProjectMember({userIds: selectedRowKeys.join(',')}) }}>删除项目成员</Button>
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
    const { projectMembers: memberList, projectMemberAddVisible, projectMemberSelectedKeys: selectedRowKeys } = state.project;
    return {
        memberList,
        projectMemberAddVisible,
        selectedRowKeys
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
    doAddProjectMemberToggle: () => actions.doAddProjectMemberToggle(true),
    doSelectProjectMember: (selectedKeys: number[]) => actions.doSelectProjectMember(selectedKeys),
    doDeleteProjectMember: (params:object) => actions.doDeleteProjectMemberRequest(params) 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember)

