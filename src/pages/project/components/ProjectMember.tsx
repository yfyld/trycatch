import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Tooltip, Button } from 'antd';
import { StoreState, Member } from '@/types';

interface Props {
    memberList: Member[]
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

function ProjectMember({memberList, ...props}: Props) {
    return (
        <div>
            <div>
                <Button type='primary'>添加项目成员</Button>
            </div>
            <div>
                <Table 
                    pagination={false}
                    columns={renderColumns()}
                    rowKey='id'
                    dataSource={memberList}
                />
            </div>
            
        </div>
        
    )
}
const mapStateToProps = (state: StoreState) => {
    const memberList = state.project.projectMembers;
    return {
        memberList
    }
}

export default connect(mapStateToProps)(ProjectMember)

