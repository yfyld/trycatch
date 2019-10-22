import * as React from 'react'
import { Form, Input, Button, Select, Switch } from 'antd'
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form'
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { IAction, IStoreState } from '@/types'
import {  IProjectInfo, IMember } from '@/api'
const FormItem = Form.Item
const Option = Select.Option

interface Props extends FormComponentProps {
  doSubmit: (e: React.FormEvent, form: WrappedFormUtils) => {}
  projectInfo: IProjectInfo
  className?: string
  // userList: User[],
  projectMembers: IMember[]
}

function ProjectInfo({ className, form, doSubmit, projectInfo, projectMembers }: Props) {
  const { getFieldDecorator } = form
  React.useEffect(() => {
    if (projectInfo.id) {
      form.setFieldsValue({
        name: projectInfo.name,
        guarderId: projectInfo.guarder && projectInfo.guarder.id,
        language: projectInfo.language,
        version: projectInfo.version,
        description: projectInfo.description,
        alarmType: projectInfo.alarmType,
        alarmHookUrl: projectInfo.alarmHookUrl,
        sourcemapOnline: projectInfo.sourcemapOnline
      })
    }
  }, [projectInfo.id])
  const formItemLayout = {
    wrapperCol: {
      span: 12
    },
    labelCol: {
      span: 5
    }
  }
  const formItemOffsetLayout = {
    wrapperCol: {
      span: 12,
      offset: 5
    }
  }
  return (
    <Form className={className} onSubmit={e => doSubmit(e, form)}>
      <FormItem label="项目名称" {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '项目名称必填' }]
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem label="项目预警人" {...formItemLayout}>
        {getFieldDecorator('guarderId', {
          rules: [
            {
              required: true,
              message: '项目预警人必选'
            }
          ]
        })(
          <Select placeholder="请选择" showSearch>
            {projectMembers.map((item: IMember) => (
              <Option key={item.id + ''} value={item.id}>
                {item.nickname || item.username}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem label="项目语言" {...formItemLayout}>
        {getFieldDecorator('language', {
          rules: [
            {
              required: true,
              message: '项目语言必选'
            }
          ]
        })(
          <Select placeholder="请选择" showSearch>
            <Option value="JS">JS</Option>
            <Option value="React">React</Option>
            <Option value="Vue">Vue</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="项目版本" {...formItemLayout}>
        {getFieldDecorator('version')(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem label="预警方式" {...formItemLayout}>
        {getFieldDecorator('alarmType')(
          <Select placeholder="请选择">
            <Option value="dingding">钉钉</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="预警地址" {...formItemLayout}>
        {getFieldDecorator('alarmHookUrl')(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem label="生产模式使用sourcemap" {...formItemLayout}>
        {getFieldDecorator('sourcemapOnline', { valuePropName: 'checked' })(<Switch />)}
      </FormItem>

      <FormItem label="项目描述" {...formItemLayout}>
        {getFieldDecorator('description')(<Input.TextArea placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemOffsetLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </FormItem>
    </Form>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doSubmit: (e: React.FormEvent, form: WrappedFormUtils) => {
        e.preventDefault()
        return actions.doUpdateProjectDetailsRequest(form)
      }
    },
    dispatch
  )

const mapStateToProps = (state: IStoreState) => {
  // const { userList } = state.app;
  const { projectInfo, projectMembers } = state.project
  return {
    projectInfo,
    // userList,
    projectMembers
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ProjectInfo))
