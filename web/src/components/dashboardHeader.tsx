import * as React from 'react'
import style from './header.less'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from "react-redux"
import { Select } from 'antd';
import { StoreState, Project } from "@/types"
import RightHeader from './rightHeader';

const Option = Select.Option;

interface Props extends RouteComponentProps{
  projectId: number,
  projectList: Project[]
}

const DashboardHeader = ({ projectId, projectList, history }: Props) => {
  
  return (
    <div className={style.wrapper}>
      <div className={style.project}>
          <Select style={{width: 200}} value={projectId} onChange={(value) => { history.push(`/dashboard/${value}`)}}>
              {
                  projectList.map((item: Project) => <Option key={item.id+''} value={item.id}>{item.name}</Option>)
              }
          </Select>
          <Link to={`/dashboard/${projectId}`}>错误列表</Link>
      </div>
      <RightHeader />
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
    const { project, app } = state;
    const { projectId } = project
    const { projectList } = app;
    return {
        projectId,
        projectList
    }
};


export default withRouter(connect(mapStateToProps)(React.memo(DashboardHeader)));

