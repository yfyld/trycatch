import * as React from 'react'
import { Form,Input,Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import {connect} from "react-redux"
import * as actions from '@/store/actions'
import { bindActionCreators,Dispatch } from 'redux'
import {Action,ProjectInfo,StoreState} from '@/types'



interface Props{
  form:WrappedFormUtils,
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{},
  projectInfo:ProjectInfo,
  className?: string
}



function ProjectInfo({className,form,doSubmit,projectInfo}:Props){
  const { getFieldDecorator,setFieldsValue } = form;
  React.useEffect(()=>{
    if(projectInfo.id){
      setFieldsValue({
        name:projectInfo.name
      })
    }
  },[projectInfo.id])
  return (
    <Form className={className} onSubmit={e=>doSubmit(e,form)}>
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
  )
}


const mapDispatchToProps = (dispatch: Dispatch<Action>)=>bindActionCreators({
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{
    e.preventDefault();
    return actions.doUpdateProjectDetailsRequest(form)
  }
  
},dispatch)


const mapStateToProps = (state:StoreState) => {
  const { projectInfo } = state.project;
  return {
  
      projectInfo
  
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ProjectInfo));