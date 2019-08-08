import * as React from 'react';
import style from "./layout.less"
import DashboardHeader from './dashboardHeader';

const CoreLayout=(props:{children:any})=>{
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



export default  CoreLayout
