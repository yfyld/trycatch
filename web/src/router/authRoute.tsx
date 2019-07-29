import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { StoreState } from '@/types';


function AuthRoute({isLogin, ...props}) {
    return isLogin ? <Route {...props}/> : <div className='loading-wrapper'><Spin /></div>
}

const mapStateToProps = (state: StoreState) => ({
    isLogin: state.app.isLogin
})

export default connect(mapStateToProps)(AuthRoute);

