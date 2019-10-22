import * as React from 'react'
import style from './Header.less'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from "react-redux"
import { Select } from 'antd';
import { IStoreState, IProject } from "@/types"
import RightHeader from './RightHeader';

const Option = Select.Option;

interface Props extends RouteComponentProps{
  projectId: number,
  projectList: IProject[]
}

const DashboardHeader = ({ projectId, projectList, history }: Props) => {
  
  return (
    <div className={style.wrapper}>
      <div className={style.project}>
          <Select style={{width: 200}} value={projectId} onChange={(value) => { history.push(`/dashboard/${value}`)}}>
              {
                  projectList.map((item: IProject) => <Option key={item.id+''} value={item.id}>{item.name}</Option>)
              }
          </Select>
          <Link className={style.error} to={`/dashboard/${projectId}`}>错误列表</Link>
      </div>
      <RightHeader />
    </div>
  )
}

const mapStateToProps = (state: IStoreState) => {
    const { project, app } = state;
    const { projectId } = project
    const { projectList } = app;
    return {
        projectId,
        projectList
    }
};


export default withRouter(connect(mapStateToProps)(React.memo(DashboardHeader)));

