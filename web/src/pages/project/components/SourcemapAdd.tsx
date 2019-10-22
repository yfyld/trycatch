import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Modal, Form, Upload, Button, Icon, Input, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { IStoreState, IAction } from '@/types'
import * as actions from '@/store/actions'

const FormItem = Form.Item

interface Props {
  visible: boolean
  doCancel: () => void
  form: WrappedFormUtils
  doSubmit: (form: WrappedFormUtils) => {}
}

function SourcemapAdd({ visible, doCancel, doSubmit, form, ...props }: Props) {
  const { getFieldDecorator } = form

  const uploadProps = {
    name: 'file',
    action: 'http://127.0.0.1:3300/common/upload',
    multiple: true,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    },
    onChange: ({ file, fileList }) => {
      console.log(file);
      if (file.status === 'done') {
        const fileName = file.name
        const url = file.response.result.url
        console.log(fileName)
        console.log(url)
        console.log([...fileList])
      }
    }
  }

  return (
    <Modal title="添加项目成员" visible={visible} onCancel={doCancel} onOk={() => doSubmit(form)} maskClosable={false}>
      <Form>
        <FormItem>
          {getFieldDecorator('files', {
            rules: [{ required: true, message: '至少选择一项' }]
          })(
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> 上传sourcemap文件
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('hash', {
            initialValue: true
          })(
            <Radio.Group>
              <Radio value={true}>带hash</Radio>
              <Radio value={false}>不带hash</Radio>
            </Radio.Group>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('version', {
            initialValue: ''
          })(<Input placeholder="请输入version" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state: IStoreState) => {
  return {
    visible: state.project.projectSourcemapAddVisible
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doSubmit: (form: WrappedFormUtils) => actions.doAddSourcemapRequest(form),
      doCancel: () => actions.doAddProjectSourcemapToggle(false)
    },
    dispatch
  )

export default Form.create()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SourcemapAdd)
)
