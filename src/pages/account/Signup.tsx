import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux'
import * as actions from '@/store/actions'
import LoginLayout from '@/components/LoginLayout'
import {Link} from "react-router-dom";

import {Action} from "@/types"
interface Props {
  form:WrappedFormUtils,
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{}
}


const Signup=({form,doSubmit}:Props)=>{
  const { getFieldDecorator } = form
  return (
    <LoginLayout>
      <Form onSubmit={(e)=>doSubmit(e,form)} className="login-form">
        <Form.Item>
          {getFieldDecorator('mobile', {
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
            注册
          </Button>
          没有账号 <Link to="/login">登录</Link>
          <Link to="/home"> test</Link>
        </Form.Item>
      </Form>
    </LoginLayout>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>)=>bindActionCreators({
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{
    e.preventDefault();
    return actions.doSignupRequest(form)
  }
},dispatch)

export default connect(null,mapDispatchToProps)(Form.create()(Signup));