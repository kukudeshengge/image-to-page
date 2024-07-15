import Login from '../pages/login'
import Home from '../pages/home'
import Create from '../pages/create'
import MyProduct from '../pages/home/pages/myProduct'
import MyMatter from '../pages/home/pages/myMatter'

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
    path: '/create',
    element: <Create/>,
    title: '新建页面',
  }
]

export default routes
