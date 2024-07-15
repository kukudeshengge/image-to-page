import React from 'react'
import { Button, Form, Input } from 'antd'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const cs = classNames.bind(styles)

const Login = () => {
  const nav = useNavigate()
  const onFinish = (values) => {
    nav('/')
  }
  
  return <div className={cs('login')}>
    <div className={cs('login-wrap')}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
        >
          <Input/>
        </Form.Item>
        
        <Form.Item
          label="密码"
          name="password"
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}
export default Login
