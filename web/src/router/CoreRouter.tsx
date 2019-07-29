import * as React from 'react'
import { Suspense, lazy } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import AuthRoute from './authRoute';
import CoreLayout from '@/components/CoreLayout';
import Loading from './routerLoading';


const ProjectList = lazy(() => import('@/pages/project/ProjectList'))
const ProjectDetails = lazy(() => import('@/pages/project/ProjectDetails'))
const Dashboard = lazy(() => import('@/pages/work/Dashboard'))
const ErrorDetails = lazy(() => import('@/pages/work/ErrorDetails'))




export default class Routes extends React.Component {
  public render() {
    return (
      <CoreLayout>
        <Suspense fallback={Loading}>
          <Switch>

            <AuthRoute exact path="/project" component={ProjectList} />
            <AuthRoute exact path="/project/:projectId" component={ProjectDetails} />
            <AuthRoute exact path="/dashboard/:projectId" component={Dashboard} />
            <AuthRoute exact path="/dashboard/:projectId/:errorId" component={ErrorDetails} />
            <Redirect from="*" to="/home" />
          </Switch>
        </Suspense>

      </CoreLayout>
    )
  }
}
