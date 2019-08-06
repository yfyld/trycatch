import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import App from './App'
import store from '@/store/configureStore'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from './registerServiceWorker'
import { history } from '@/utils'
import "@/styles/style.less"


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App />
      </LocaleProvider> 
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app') as HTMLElement
)
registerServiceWorker()
