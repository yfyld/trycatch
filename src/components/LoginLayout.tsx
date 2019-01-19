import * as React from 'react'
import style from './LoginLayout.less'
interface Props {
  children: any
}
export default class LoginLayout extends React.Component<Props> {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.header}>header</div>
        <div className={style.content}>
          <div className={style.form}>{this.props.children}</div>
        </div>
        <div className={style.footer} />
      </div>
    )
  }
}
