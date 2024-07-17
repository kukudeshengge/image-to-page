import RoutesElement from './routes'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import './share/reset.css'
import './share/global.css'

function App () {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1261ff'
        }
      }}
      locale={zhCN}
    >
      <RoutesElement/>
    </ConfigProvider>
  )
}

export default App
