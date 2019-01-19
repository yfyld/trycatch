import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import App from './App'
import store from '@/store/configureStore'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker'
import "@/styles/style.less"


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <App />
      </LocaleProvider>
    </Provider>
  </Router>,
  document.getElementById('app') as HTMLElement
)
registerServiceWorker()
