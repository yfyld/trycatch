import * as React from 'react'
import { lazy, Suspense } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import AuthRoute from './authRoute';
import DashboardLayout from '@/components/dashboardLayout';
import Loading from './routerLoading';


const Dashboard = lazy(() => import('@/pages/work/Dashboard'))
const ErrorDetails = lazy(() => import('@/pages/work/ErrorDetails'))




export default class Routes extends React.Component {
  public render() {
    return (
      <DashboardLayout>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <AuthRoute exact path="/dashboard/:projectId" component={Dashboard} />
            <AuthRoute exact path="/dashboard/:projectId/:errorId" component={ErrorDetails} />
            <Redirect from="*" to="/home" />
          </Switch>
        </Suspense>

      </DashboardLayout>
    )
    
  }
}
