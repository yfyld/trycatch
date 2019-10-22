import * as React from 'react'
import { connect } from 'react-redux';
import { StoreState } from '@/store/reducers'
import ProjectListPane from "./components/ProjectListPane"
import {  IPage, IPageDataQuery } from "@/types"
import { IProjectListItem } from '@/api'
import ProjectAdd from "./components/ProjectAdd"
import { Empty, Button, Pagination } from "antd"
import * as actions from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { IAction } from '@/types';
import style from './ProjectList.less';

interface Props {
	projectList: IProjectListItem[],
	doAddProjectToggle: () => {},
	doDeleteProject: (projectId: number) => {},
	projectPage: IPage,
	doGetProjectList: (data: IPageDataQuery<any>) => {}
}


function ProjectList({ projectList, projectPage: { page, pageSize, totalCount},  ...props }: Props) {
	return (
		<div className={style.wrapper}>
			<div className={style.action}>
				<Button type='primary' onClick={props.doAddProjectToggle}>新建项目</Button>
			</div>

			<div className={style.content}>
				<div className={style.project}>
					{
						projectList.length === 0 ? <Empty /> : (
							projectList.map((project: IProjectListItem) => (
								<ProjectListPane onDelete={props.doDeleteProject} key={project.id} projectInfo={project} />
							))
						)
					}
				</div>
				{
					totalCount > pageSize ? (
						<div className={style.pagination}>
							<Pagination 
								current={page} 
								pageSize={pageSize} 
								total={totalCount}
								onChange={(page: number, pageSize: number) => { props.doGetProjectList({ page, pageSize })}}
							/>
						</div>
					) : null
				}
				
			</div>
			
			<ProjectAdd/>
		</div>
	)
}



const mapStateToProps = (state: StoreState) => ({
	projectList: state.project.projectList,
	projectPage: state.project.projectPage
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
	doAddProjectToggle: () => actions.doAddProjectToggle(true),
	doDeleteProject: (projectId: number) => actions.doDeleteProjectRequest(projectId),
	doGetProjectList: (data: IPageDataQuery<any>) => actions.doGetProjectListRequest(data)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ProjectList))
// export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);