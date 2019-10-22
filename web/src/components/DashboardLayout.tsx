import * as React from 'react';
import { connect } from 'react-redux';
import style from "./Layout.less"
import DashboardHeader from './DashboardHeader';
import * as actions from '@/store/actions';
import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';

interface Props {
  children: any,
  doGetProjectAllList: () => void
}

const DashboardLayout=(props:Props)=>{
    React.useEffect(() => {
        props.doGetProjectAllList();
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

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  ...bindActionCreators(
    {
      doGetProjectAllList () {
        return actions.doGetProjectAllListRequest()
      },
     
    },
    dispatch
  )
})

export default  connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)
