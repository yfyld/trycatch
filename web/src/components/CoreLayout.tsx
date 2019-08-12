import * as React from 'react';
import AppHeader from "./AppHeader"
import style from "./Layout.less"

const CoreLayout=(props:{children:any})=>{
  return (
    <div className={style.wrapper}>
        <div className={style.header}>
          <AppHeader />
        </div>
        <div className={style.content}>
          {props.children}
        </div>
    </div>
  )
}


export default  CoreLayout
