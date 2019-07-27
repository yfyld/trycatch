import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import { history } from '@/utils'
import Suspense from './Suspense';
import CoreRouter from './CoreRouter'
import { ConnectedRouter } from 'connected-react-router'
const Home = React.lazy(() => import('@/pages/home/Home'))
const Login = React.lazy(() => import('@/pages/account/Login'))
const Signup = React.lazy(() => import('@/pages/account/Signup'))

export default class Routes extends React.Component {
  public render() {
    return (
      <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" component={Suspense(Login)} />
            <Route exact path="/signup" component={Suspense(Signup)} />
            <Route exact path="/home" component={Suspense(Home)} />
            <Route path="/" component={CoreRouter} />
          </Switch>
        </ConnectedRouter>
    )
  }
}
