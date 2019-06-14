import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '@/types';


function AuthRoute({auth, ...props}) {
    return auth ? <Route {...props}/> : <Redirect to='/login'/>
}

const mapStateToProps = (state: StoreState) => ({
    auth: state.app.userInfo.id !== undefined && state.app.userInfo.id !== null
})

export default connect(mapStateToProps)(AuthRoute);

