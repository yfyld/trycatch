import * as React from 'react';
import style from "./layout.less"
import DashboardHeader from './dashboardHeader';
import * as actions from '@/store/actions';

const DashboardLayout=(props:{children:any})=>{
    React.useEffect(() => {
        console.log(1);
        actions.doGetProjectAllListRequest();
    }, [])
  return (
    <div className={style.wrapper}>
        <div className={style.header}>
          <DashboardHeader />
        </div>
        <div className={style.content}>
          {props.children}
        </div>
    </div>
  )
}



export default  DashboardLayout
