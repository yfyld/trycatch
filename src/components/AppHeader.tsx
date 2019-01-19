import * as React from 'react'
import style from './AppHeader.less'
import { Link } from 'react-router-dom'
interface Props {
  name?: string
}
export default class AppHeader extends React.Component<Props> {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.back}>
          <Link to="/dashboard">控制台</Link>
        </div>
        <div className="fl">
          <div  className={style.project}>项目</div>
          <ul className={style.nav}>
            <li>
              <Link to="/project">项目列表</Link>
            </li>
            <li>
              <Link to="/dashboard">错误列表</Link>
            </li>
            <li>
              <Link to="/dashboard">项目设置</Link>
            </li>
          </ul>
        </div>
        <div className="fr">
          <ul className={style.nav}>
            <li>
              <Link to="/home">首页</Link>
            </li>
            <li>
              <Link to="/home">文档</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
