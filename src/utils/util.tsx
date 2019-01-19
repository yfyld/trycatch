import { connect as connectComponent } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { matchPath } from 'react-router-dom';



export const connect = (mapStateToProps?: any, actions?: any) => {
  return (target: any) => (
    connectComponent(mapStateToProps, actions)(target) as any
  );
};


export const history = createHistory()



 export const mapLocationIntoActions = ({ pathname, search }:any, handlers:any) => (Object as any).entries(handlers)
  .map(([expectedPath, handler]) => {
    const match = matchPath(pathname, { path: expectedPath, exact: true });
    console.log(match,99909)
    return match
      ? handler({ pathname, search, ...match.params })
      : [];
  })
  .reduce((a, b) => a.concat(b),[]);


  export const validateCache = (fetchTime, cacheTTL) => (new Date()).getTime() - fetchTime < cacheTTL;
