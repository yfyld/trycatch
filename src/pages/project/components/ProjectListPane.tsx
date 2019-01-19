import * as React from 'react'
import {ProjectListItem} from "@/types"
import style from "./ProjectListPane.less"
import { Link } from 'react-router-dom';



interface Props {
  projectInfo: ProjectListItem
}



function ProjectListPane({projectInfo}:Props){
  return (
      
    <div className={style.wrapper}>
    <h3>{projectInfo.name}</h3>
    <Link to={`/dashboard/${projectInfo.id}`}>查看项目异常信息</Link>
    <Link to={`/project/${projectInfo.id}`}>查看项目信息</Link>
  </div>
  )
}


export default ProjectListPane
