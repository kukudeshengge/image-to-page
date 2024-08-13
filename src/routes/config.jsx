import { Navigate } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import Create from '../pages/create'
import MyProduct from '../pages/home/pages/myProduct'
import MyMatter from '../pages/home/pages/myMatter'
import DataView from '../pages/dataView'
import Preview from '../pages/preview'

/**
 * 路由配置
 * @type {Router}
 */
const routes = [
  {
    path: '/login',
    element: <Login/>,
    title: '登录'
  },
  {
    path: '/',
    element: <Home/>,
    title: '主页',
    children: [
      {
        path: '/',
        element: <Navigate to="/myProduct"/>
      },
      {
        path: '/myProduct',
        element: <MyProduct/>,
        title: '我的作品'
      },
      {
        path: '/myMatter',
        element: <MyMatter/>,
        title: '我的素材'
      }
    ]
  },
  {
    path: '/dataView',
    element: <DataView/>,
    title: '数据'
  },
  {
    path: '/preview',
    element: <Preview/>,
    title: '预览'
  },
  {
    path: '/create/:id',
    element: <Create/>,
    title: '新建页面'
  }
]

export default routes
