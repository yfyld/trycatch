import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux'
import * as actions from '@/store/actions'
import LoginLayout from '@/components/LoginLayout'
import {Link} from "react-router-dom";

import {IAction} from "@/types"
import style from "./Account.less"
interface Props {
  form:WrappedFormUtils,
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{}
}



const Login=({form,doSubmit}:Props)=>{
  const { getFieldDecorator } = form
  return (
    <LoginLayout>
      <h2 className={style.title}>登录</h2>
      <Form onSubmit={(e)=>doSubmit(e,form)} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名' }
            ]
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="请输入用户名"
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
            className={style.btn}
          >
            登&emsp;&emsp;录
          </Button>
          <div className={style.text}>
          没有账号 <Link to="/signup">马上注册!</Link>
          </div>
        </Form.Item>
      </Form>
    </LoginLayout>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>)=>bindActionCreators({
  doSubmit:(e:React.FormEvent,form:WrappedFormUtils)=>{
    e.preventDefault();
    return actions.doLoginRequest(form)
  }
},dispatch)

export default connect(null,mapDispatchToProps)(Form.create()(Login));