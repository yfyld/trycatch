import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CoreLayout from '@/components/CoreLayout';


const ProjectList = React.lazy(() => import('@/pages/project/ProjectList'))
const ProjectDetails = React.lazy(() => import('@/pages/project/ProjectDetails'))
const Dashboard = React.lazy(() => import('@/pages/work/Dashboard'))
const ErrorDetails = React.lazy(() => import('@/pages/work/ErrorDetails'))

export default class Routes extends React.Component {
  public render() {
    return (
      <CoreLayout>
        <Switch>
            
            <Route exact path="/project" component={ProjectList} />
            <Route exact path="/project/:projectId" component={ProjectDetails} />
            <Route exact path="/dashboard/:projectId" component={Dashboard} />
            <Route exact path="/dashboard/:projectId/:errorId" component={ErrorDetails} />
            <Redirect from="*" to="/home" />
          </Switch>
      </CoreLayout>
    )
  }
}
