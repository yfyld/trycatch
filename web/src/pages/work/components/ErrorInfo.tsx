import * as React from 'react';
import { connect } from 'react-redux';
import style from './ErrorInfo.less';
import { StoreState, ErrorInfo as IErrorInfo, Member, Action } from '@/types';
import { Dropdown, Tooltip, Menu, Button } from 'antd';
import { ERROR_STATUS, ERROR_LEVEL } from '@/constants';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '@/store/actions';

interface Props {
    projectMembers: Member[],
    errorInfo: IErrorInfo,
    errorId: number,
    doErrorChange: (params) => void
}

function ErrorInfo({errorInfo, projectMembers, errorId, ...props}: Props) {
    const userMenu=(keys:number[],doErrorChange:Function,projectMembers)=>(
        <Menu 
          onClick={({key})=>doErrorChange({guarderId: key, errorIds: keys, actionType: 'GUARDER', requestInfo: true})}>
          {projectMembers.map(item=>(
            <Menu.Item key={item.id}>
              {item.nickName || item.username}
            </Menu.Item>
          ))}
        </Menu>
      )
      
      
      const statusMenu=(keys:number[],doErrorChange:Function)=>(
        <Menu onClick={({key})=>doErrorChange({errorIds: keys, status: key, actionType: 'STATUS', requestInfo: true})}>
          {
            ERROR_STATUS.map(status=>(
              <Menu.Item key={status.value}>
                {status.text}
              </Menu.Item>
            ))
          }
        </Menu>
      )
      
      const levelMenu=(keys:number[],doErrorChange:Function)=>(
        <Menu onClick={({key})=>doErrorChange({errorIds:keys, level: key, actionType: 'LEVEL', requestInfo: true})}>
          {
            ERROR_LEVEL.map(level=>(
              <Menu.Item key={level.value}>
                {level.text}
              </Menu.Item>
            ))
          }
        </Menu>
      )
    
      const selectionHandler =(
        <span className='handler'>&emsp;
          <Dropdown trigger={["click"]} overlay={userMenu([errorId],props.doErrorChange,projectMembers)}>
              <Tooltip placement="right" title="指派"><Button shape="circle" icon="user" /></Tooltip>
          </Dropdown>
          <Dropdown trigger={["click"]} overlay={statusMenu([errorId],props.doErrorChange)}>
              <Tooltip placement="right" title="状态"><Button shape="circle" icon="question" /></Tooltip>
          </Dropdown>
          <Dropdown trigger={["click"]} overlay={levelMenu([errorId],props.doErrorChange)}>
              <Tooltip placement="right" title="错误等级"><Button shape="circle" icon="exclamation" /></Tooltip>
          </Dropdown>
        </span>
      );
    return(
        <div className={style.wrapper}>
            <div className={style.info}>
                <div>{errorInfo.url}</div>
                <div className={style.handler}>{selectionHandler}</div>
            </div>
            <div className={style.summary}>
                <div className={style.item}>
                    <p className={style.num}>{errorInfo.eventNum}</p>
                    <p className={style.name}>事件数</p>
                </div>
                <div className={style.item}>
                    <p className={style.num}>{errorInfo.userNum}</p>
                    <p className={style.name}>用户数</p>
                </div>
                <div className={style.item}>
                    <p className={style.num}>{errorInfo.version}</p>
                    <p className={style.name}>版本</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: StoreState) => {
    const { work, project } = state;
    return {
        errorInfo: work.errorInfo,
        projectMembers: project.projectMembers,
        errorId: work.errorId
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    ...bindActionCreators(
      {
        
        doErrorChange: (params) => {
          return actions.doErrorChange(params)
        },
      },
      dispatch
    )
  })

export default connect(mapStateToProps, mapDispatchToProps)(ErrorInfo);