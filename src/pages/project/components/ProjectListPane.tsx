import * as React from 'react';
import { Icon } from 'antd';
import {ProjectListItem} from "@/types";
import style from "./ProjectListPane.less";
import { Link } from 'react-router-dom';



interface Props {
  projectInfo: ProjectListItem,
  onDelete: (projectId: number) => {}
}



function ProjectListPane({projectInfo, onDelete}:Props){
  return (
      
    <div className={style.wrapper}>
    <h3>{projectInfo.name}<Icon type='delete' onClick={() => { onDelete(projectInfo.id) }}/></h3>
    <p><Icon type='warning' className='danger'/> <Link to={`/dashboard/${projectInfo.id}`}>查看项目异常信息</Link></p>
    <p><Icon type='profile' className='info'/> <Link to={`/project/${projectInfo.id}`}>查看项目信息</Link></p>
  </div>
  )
}


export default ProjectListPane
