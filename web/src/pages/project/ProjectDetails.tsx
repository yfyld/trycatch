import * as React from 'react'
import { Tabs } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from "react-redux"
import * as actions from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { IAction, IStoreState } from '@/types'
import ProjectMember from './components/ProjectMember';
import ProjectInfo from './components/ProjectInfo';
import Sourcemap from './components/Sourcemap';
import style from './ProjectDetails.less';

const TabPane = Tabs.TabPane


interface Props {
	doProjectMembers: (projectId: number) => {},
	projectId: number | null,
	tabs: string[],
	activeKey: string
}


// function onChange(activeKey: string, tabs: string[], func1, fun2, fun3) {
//   const args = Array.prototype.slice.call(arguments, 2);
//   const func = args[parseInt(activeKey, 10) - 1];
//   return tabs.indexOf(activeKey) === -1 && func && func();

// }
function ProjectDetails({ doProjectMembers, projectId, tabs }: Props) {

	return (
		<div className={style.wrapper}>
			<Tabs defaultActiveKey="1" tabPosition="left">
				<TabPane tab="基本信息" key="1">
					<div className={style.content}>
						<ProjectInfo />
					</div>
				</TabPane>
				<TabPane tab="成员管理" key="3">
					<ProjectMember className={style.content} />
				</TabPane>
				<TabPane tab="sourmap上传" key="4">
					<Sourcemap className={style.content}/>
				</TabPane>
			</Tabs>
		</div>
	)
}


const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
	doSubmit: (e: React.FormEvent, form: WrappedFormUtils) => {
		e.preventDefault();
		return actions.doUpdateProjectDetailsRequest(form)
	},
	doProjectMembers: (projectId: number) => actions.doGetProjectMembersRequest(projectId)

}, dispatch)


const mapStateToProps = (state: IStoreState) => {
	const { projectId, projectDetail } = state.project;
	return {

		projectId,
		...projectDetail

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);