import * as React from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';




export default class Loading extends React.Component {
    componentDidMount() {
        NProgress.start();
    }
    componentWillUnmount() {
        NProgress.done();
    }
    render() {
        return null;
    }
}