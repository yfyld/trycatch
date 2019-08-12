import * as React from 'react'
import style from './Header.less'
import { Link } from 'react-router-dom'
import logo from "@/assets/imgs/logo-b.png"
import RightHeader from './RightHeader';





const AppHeader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <RightHeader />
    </div>
  )
}

export default AppHeader;

