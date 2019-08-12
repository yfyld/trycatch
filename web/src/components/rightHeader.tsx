import * as React from 'react'
import style from './RightHeader.less'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Icon, Dropdown, Menu } from 'antd'
import { StoreState, UserInfo, Action } from "@/types"
import * as actions from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'

const MenuItem = Menu.Item;

interface Props {
  userInfo: UserInfo,
  doLogoutRequest: () => {}
}

const AppHeader = ({ userInfo, doLogoutRequest }: Props) => {
  const menu = (
    <Menu>
      <MenuItem>
        <a onClick={doLogoutRequest}>退出登录</a>
      </MenuItem>
    </Menu>
  )
  return (
    <ul className={style.nav}>
        <li className={style['nav-item']}>
          <Link to="/home" className={style.link}>首页</Link>
        </li>
        <li className={style['nav-item']}>
          <Link to="/project" className={style.link}>项目列表</Link>
        </li>

        <li className={style['nav-item']}>
          <Dropdown overlay={menu}>
            <span className={style.user}>
              <Icon type='user' className={style['user-icon']}/>
              {userInfo.nickName || userInfo.username}
            </span>
          </Dropdown>   
        </li>
      </ul>
  )
}

const mapStateToProps = (state: StoreState) => ({
  userInfo: state.app.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  doLogoutRequest: () => {
    return actions.doLogoutRequest()
  }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AppHeader));

