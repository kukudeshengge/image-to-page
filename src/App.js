import RoutesElement from './routes'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import './share/reset.css'
import './share/global.css'

message.config({ maxCount: 1 })

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
