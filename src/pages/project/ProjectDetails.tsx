import * as React from 'react'
import { Tabs,Form,Input,Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import {connect} from "react-redux"

import * as actions from '@/store/actions'
import { bindActionCreators,Dispatch } from 'redux'
import {Action,ProjectInfo,StoreState} from '@/types'
import ProjectMember from './components/ProjectMember';

const TabPane = Tabs.TabPane


interface Props{
  form:WrappedFormUtils,
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{},
  projectInfo:ProjectInfo,
  doProjectMembers: (projectId: number) => {},
  projectId: number | null,
  tabs: string[],
  activeKey: string
}


function onChange(activeKey: string, tabs: string[], func1, fun2, fun3) {
  const args = Array.prototype.slice.call(arguments, 2);
  const func = args[parseInt(activeKey, 10) - 1];
  return tabs.indexOf(activeKey) === -1 && func && func();

}
function ProjectDetails({form,doSubmit,projectInfo, doProjectMembers, projectId, tabs}:Props){
  const { getFieldDecorator,setFieldsValue } = form;
  React.useEffect(()=>{
    if(projectInfo.id){
      setFieldsValue({
        name:projectInfo.name
      })
    }
  },[projectInfo.id])
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={(activeKey) => { onChange(activeKey, tabs,  null, null, () => doProjectMembers(projectId))}}>
        <TabPane tab="基本信息" key="1">
          <Form onSubmit={e=>doSubmit(e,form)}>
            <Form.Item
              label="项目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '项目名称必填' }],
              })(
                <Input />
              )}
            </Form.Item>
            
            <Form.Item
              wrapperCol={{ span: 12, offset: 5 }}
            >
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="预警设置" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="成员管理" key="3">
          <ProjectMember />
        </TabPane>
      </Tabs>
    </div>
  )
}


const mapDispatchToProps = (dispatch: Dispatch<Action>)=>bindActionCreators({
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{
    e.preventDefault();
    return actions.doUpdateProjectDetailsRequest(form)
  },
  doProjectMembers: (projectId: number) => actions.doGetProjectMembersRequest(projectId)
  
},dispatch)


const mapStateToProps = (state:StoreState) => {
  const { projectInfo, projectId, projectDetail } = state.project;
  return {
  
      projectInfo,
      projectId,
      ...projectDetail
  
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ProjectDetails));