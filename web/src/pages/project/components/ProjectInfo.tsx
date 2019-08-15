import * as React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import { connect } from "react-redux"
import * as actions from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { Action, ProjectInfo, StoreState, User } from '@/types'


const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends FormComponentProps{
	doSubmit: (e: React.FormEvent, form: WrappedFormUtils) => {},
	projectInfo: ProjectInfo,
	className?: string,
	userList: User[]
}



function ProjectInfo({ className, form, doSubmit, projectInfo, userList }: Props) {
	const { getFieldDecorator } = form;
	React.useEffect(() => {
		if (projectInfo.id) {
			form.setFieldsValue({
				name: projectInfo.name,
				guarderId: projectInfo.guarder && projectInfo.guarder.id
			})
		}
	}, [projectInfo.id])
	const formItemLayout = {
        wrapperCol: {
            span: 12
        },
        labelCol: {
            span: 5
        }
    }
    const formItemOffsetLayout = {
        wrapperCol: {
            span: 12,
            offset: 5
        }
    }
	return (
		<Form className={className} onSubmit={e => doSubmit(e, form)}>
			<FormItem
				label="项目名称"
				{...formItemLayout}
			>
				{getFieldDecorator('name', {
					rules: [{ required: true, message: '项目名称必填' }],
				})(
					<Input placeholder='请输入'/>
				)}
			</FormItem>
			<FormItem label='项目预警人' {...formItemLayout}>
				{
					getFieldDecorator('guarderId', {
						rules: [{
							required: true,
							message: '项目预警人必选'
						}]
					})(
						<Select placeholder='请选择' showSearch>
							{
								userList.map((item: User) => <Option key={item.id+''} value={item.id}>{item.nickname || item.username}</Option>)
							}
						</Select>
					)
				}
			</FormItem>
			<FormItem label='项目描述' {...formItemLayout}>
				{
					getFieldDecorator('description')(
						<Input.TextArea />
					)
				}
			</FormItem>
			<FormItem
				{...formItemOffsetLayout}
			>
				<Button type="primary" htmlType="submit">
					保存
        </Button>
			</FormItem>
		</Form>
	)
}


const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	doSubmit: (e: React.FormEvent, form: WrappedFormUtils) => {
		e.preventDefault();
		return actions.doUpdateProjectDetailsRequest(form)
	}

}, dispatch)


const mapStateToProps = (state: StoreState) => {
	const { userList } = state.app;
	const { projectInfo } = state.project;
	return {

		projectInfo,
		userList

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProjectInfo));