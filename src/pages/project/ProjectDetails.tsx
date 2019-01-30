import * as React from 'react'
import { Tabs,Form,Input,Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import {connect} from "react-redux"

import * as actions from '@/store/actions'
import { bindActionCreators,Dispatch } from 'redux'
import {Action,ProjectInfo,StoreState} from '@/types'
const TabPane = Tabs.TabPane


interface Props{
  form:WrappedFormUtils,
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{},
  projectInfo:ProjectInfo
}



function ProjectDetails({form,doSubmit,projectInfo}:Props){
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
      <Tabs defaultActiveKey="1">
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
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}


const mapDispatchToProps = (dispatch: Dispatch<Action>)=>bindActionCreators({
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{
    e.preventDefault();
    return actions.doUpdateProjectDetailsRequest(form)
  }
},dispatch)


const mapStateToProps = (state:StoreState) => ({
  projectInfo: state.project.projectInfo
});

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ProjectDetails));