import * as React from 'react'
import { lazy, Suspense } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import AuthRoute from './AuthRoute';
import CoreLayout from '@/components/CoreLayout';
import Loading from './Loading';

const ProjectList = lazy(() => import('@/pages/project/ProjectList'))
const ProjectDetails = lazy(() => import('@/pages/project/ProjectDetails'))




export default class Routes extends React.Component {
  public render() {
    return (
      <CoreLayout>
        <Suspense fallback={<Loading/>}>
          <Switch>

            <AuthRoute exact path="/project" component={ProjectList} />
            <AuthRoute exact path="/project/:projectId" component={ProjectDetails} />
            
            <Redirect from="*" to="/home" />
          </Switch>
        </Suspense>

      </CoreLayout>
    )
    
  }
}
