import * as React from 'react'
import style from './AppHeader.less'
import { Link } from 'react-router-dom'
import {connect} from "react-redux"
import {StoreState,UserInfo,Action} from "@/types"

import * as actions from '@/store/actions'
import { bindActionCreators,Dispatch } from 'redux'

interface Props {
  userInfo:UserInfo
  doLogoutRequest:()=>{}
}

const AppHeader=({userInfo,doLogoutRequest}:Props)=>{
  return  (
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
          {/* <li>
            <Link to="/dashboard/1">错误列表</Link>
          </li> */}

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
          
          <li>
            {
              userInfo.id ? (
                              <div>
                                {userInfo.mobile}&nbsp;&nbsp;
                                <a onClick={doLogoutRequest}>退出登录</a>
                              </div>
                            ) : <Link to="/login">登录</Link>
            }
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state:StoreState) => ({
  userInfo: state.app.userInfo
});

const mapDispatchToProps = (dispatch: Dispatch<Action>)=>bindActionCreators({
  doLogoutRequest:()=>{
    return actions.doLogoutRequest()
  }
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(AppHeader));

