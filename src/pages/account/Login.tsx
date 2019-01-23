import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux'
import * as actions from '@/store/actions'
import LoginLayout from '@/components/LoginLayout'
import {Link} from "react-router-dom";

import {Action,UserInfo} from "@/types"
interface Props {
    form: WrappedFormUtils,
    doLoginRequest:Function
}

const handleSubmit = (e:any,form:WrappedFormUtils,doLoginRequest:Function) => {
  e.preventDefault()
    form.validateFields((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values)
      doLoginRequest(values)
    }
  })
}

const Login=({form,doLoginRequest}:Props)=>{
  const { getFieldDecorator } = form
  return (
    <LoginLayout>
      <Form onSubmit={(e)=>handleSubmit(e,form,doLoginRequest)} className="login-form">
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
          <Link to="/home"> test</Link>
        </Form.Item>
      </Form>
    </LoginLayout>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>)=>bindActionCreators({
  doLoginRequest: (params:UserInfo)=>actions.doLoginRequest(params)
},dispatch)

export default connect(null,mapDispatchToProps)(Form.create()(Login));