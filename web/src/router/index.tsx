import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Spin } from 'antd'
import { history } from '@/utils'
import CoreRouter from './CoreRouter'
import { ConnectedRouter } from 'connected-react-router'
const Home = React.lazy(() => import('@/pages/home/Home'))
const Login = React.lazy(() => import('@/pages/account/Login'))
const Signup = React.lazy(() => import('@/pages/account/Signup'))

export default class Routes extends React.Component {
  public render() {
    return (
      <React.Suspense
        fallback={
          <div className="loading-wrapper">
            <Spin tip="loading" />
          </div>
        }
      >
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={Home} />
            <Route path="/" component={CoreRouter} />
          </Switch>
        </ConnectedRouter>
      </React.Suspense>
    )
  }
}
