import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import 'particles.js'
import data from './data'
import { login } from '../../api/user'
import md5 from 'spark-md5'

const cs = classNames.bind(styles)

const Login = () => {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    window.particlesJS('particles', data)
  }, [])
  
  const onFinish = async (values) => {
    try {
      setLoading(true)
      const data = {
        username: md5.hash(values.username),
        password: md5.hash(values.password)
      }
      const res = await login(data)
      localStorage.setItem('authorization', res)
      nav('/')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      message.warning(err.message)
    }
  }
  return <div id={'particles'} className={cs('login')}>
    <div className={cs('login-wrap')}>
      <h1>搭建H5页面</h1>
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
          rules={[
            {
              required: true,
              message: '请输入账号'
            }
          ]}
        >
          <Input placeholder="请输入账号" maxLength={11}/>
        </Form.Item>
        
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        >
          <Input.Password placeholder="请输入密码" maxLength={20}/>
        </Form.Item>
        <Form.Item
          className={cs('footer')}
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button loading={loading} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}
export default Login
