import * as React from 'react'
import { connect } from 'react-redux';
import { StoreState } from '@/store/reducers'
import ProjectListPane from "./components/ProjectListPane"
import {ProjectListItem} from "@/types"


interface Props {
  doGetProjectList?: Function,
  projectList: ProjectListItem[]
}


function ProjectList({projectList}:Props){
  return (
    <div>
      {projectList.map(project=>(
        <ProjectListPane key={project.id} projectInfo={project}></ProjectListPane>
      ))}
    </div>
  )
}


const mapStateToProps = (state:StoreState):Props => ({
  projectList: state.project.projectList
});

export default connect(mapStateToProps)(ProjectList)
