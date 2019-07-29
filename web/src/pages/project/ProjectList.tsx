import * as React from 'react'
import { connect } from 'react-redux';
import { StoreState } from '@/store/reducers'
import ProjectListPane from "./components/ProjectListPane"
import { ProjectListItem } from "@/types"
import ProjectAdd from "./components/ProjectAdd"
import { Button, Empty } from "antd"
import * as actions from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { Action } from '@/types';
import style from './ProjectList.less';

interface Props {
	projectList: ProjectListItem[],
	doAddProjectToggle: () => {},
	doDeleteProject: (projectId: number) => {}
}


function ProjectList({ projectList, doAddProjectToggle, doDeleteProject }: Props) {
	return (
		<div className={style.wrapper}>
			<div className={style.action}>
				<Button type='primary' onClick={doAddProjectToggle}>新建项目</Button>
			</div>

			<div className={style.project}>
				{
					projectList.length === 0 ? <Empty /> : (
						projectList.map((project: ProjectListItem) => (
							<ProjectListPane onDelete={doDeleteProject} key={project.id} projectInfo={project} />
						))
					)
				}
			</div>

			<ProjectAdd></ProjectAdd>
		</div>
	)
}


const mapStateToProps = (state: StoreState) => ({
	projectList: state.project.projectList
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	doAddProjectToggle: () => actions.doAddProjectToggle(true),
	doDeleteProject: (projectId: number) => actions.doDeleteProjectRequest(projectId)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ProjectList))
