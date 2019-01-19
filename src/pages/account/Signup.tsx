import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';

import LoginLayout from '@/components/LoginLayout'

interface Props {
    form: WrappedFormUtils
}



class Login extends React.Component<Props> {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <LoginLayout>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: '请输入手机号' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="请输入手机号"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            没有账号 <a href="">注册!</a>
          </Form.Item>
        </Form>
      </LoginLayout>
    )
  }
}


export default Form.create({})(Login);