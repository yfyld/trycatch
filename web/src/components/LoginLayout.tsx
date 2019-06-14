import * as React from 'react'
import style from './LoginLayout.less'
import logo from "@/assets/imgs/logo-b.png"
interface Props {
  children: any
}
export default class LoginLayout extends React.Component<Props> {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.logo}>
           <img src={logo} alt=""/>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.box}>
            <div className={style.form}>
            {this.props.children}
            </div>
          </div>
        </div>
        <div className={style.footer} />
      </div>
    )
  }
}
