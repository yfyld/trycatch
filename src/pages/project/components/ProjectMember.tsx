import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators,Dispatch } from 'redux'
import { Table, Icon, Tooltip, Button } from 'antd';
import { StoreState, Member, Action } from '@/types';
import * as actions from "@/store/actions"
import ProjectMemberAdd from './ProjectMemberAdd';

interface Props {
    memberList: Member[],
    doAddProjectMemberToggle: () => {},
    projectMemberAddVisible: boolean
}

function renderColumns() {
    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile'
    }, {
        title: '角色',
        dataIndex: 'role',
        key: 'role'
    }, {
        title: '',
        dataIndex: 'id',
        key: 'action',
        render: () => (
            <div>
                <Tooltip title='删除'>
                    <Icon type='delete'/>
                </Tooltip>
            </div>
        )
    }]
    return columns;
}

function ProjectMember({memberList, doAddProjectMemberToggle, projectMemberAddVisible, ...props}: Props) {
    return (
        <div>
            <div>
                <Button type='primary' onClick={doAddProjectMemberToggle}>添加项目成员</Button>
            </div>
            <div>
                <Table 
                    pagination={false}
                    columns={renderColumns()}
                    rowKey='id'
                    dataSource={memberList}
                />
            </div>
        { projectMemberAddVisible && <ProjectMemberAdd /> }
        </div>
        
    )
}
const mapStateToProps = (state: StoreState) => {
    const { projectMembers: memberList, projectMemberAddVisible } = state.project;
    return {
        memberList,
        projectMemberAddVisible
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
    doAddProjectMemberToggle: () => actions.doAddProjectMemberToggle(true)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember)

