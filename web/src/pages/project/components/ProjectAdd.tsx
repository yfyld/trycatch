import * as React from 'react'
import { Modal,Form ,Input} from 'antd'
import {StoreState} from "@/store/reducers"
import {connect} from "react-redux"
import { bindActionCreators,Dispatch } from 'redux'
import * as actions from "@/store/actions"
import { WrappedFormUtils } from 'antd/lib/form/Form';
import {Action} from "@/types"

interface Props {
  visible: boolean
  doCancel:()=>{}
  doSubmit: (form:WrappedFormUtils) => {}
  form:WrappedFormUtils
}

const ProjectAdd = ({ visible, doSubmit, doCancel ,form}: Props) => {
  const {getFieldDecorator}=form;
  return (
    <Modal
      title='添加项目'
      visible={visible}
      onOk={e=>doSubmit(form)}
      onCancel={doCancel}
    >
      <Form>
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
          label="项目描述"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('description')(
            <Input.TextArea />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>)=>bindActionCreators({
  doSubmit:(form:WrappedFormUtils)=>{
    return actions.doAddProjectRequest(form)
  },
  doCancel:()=>{

    return actions.doAddProjectToggle(false)
  }
},dispatch)

const mapStateToProps = (state:StoreState) => ({
  visible: state.project.projectAddVisible
});

export default Form.create()(connect(mapStateToProps,mapDispatchToProps)(React.memo(ProjectAdd)))
