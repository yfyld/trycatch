import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Modal, Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import findIndex from 'lodash/findIndex'
import { StoreState, User, Member, Action } from '@/types'
import * as actions from '@/store/actions'

const FormItem = Form.Item
const Option = Select.Option

interface Props {
  visible: boolean
  userList: User[]
  memberList: Member[]
  doCancel: () => {}
  form: WrappedFormUtils
  doSubmit: (form: WrappedFormUtils) => {}
}

function ProjectMemberAdd({ visible, userList, memberList, doCancel, doSubmit, form, ...props }: Props) {
  const { getFieldDecorator } = form
  return (
    <Modal title="添加项目成员" visible={visible} onCancel={doCancel} onOk={() => doSubmit(form)} maskClosable={false}>
      <Form>
        <FormItem>
          {getFieldDecorator('memberIds', {
            rules: [{ required: true, message: '项目成员必选' }]
          })(
            <Select mode="multiple" placeholder="请选择" showSearch>
              {userList
                .filter((item: User) => findIndex(memberList, (member: Member) => member.id === item.id) === -1)
                .map(item => (
                  <Option key={item.id + ''} value={item.id}>
                    {item.nickname || item.username}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    visible: state.project.projectMemberAddVisible,
    userList: state.app.userList,
    memberList: state.project.projectMembers
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      doCancel: () => actions.doAddProjectMemberToggle(false),
      doSubmit: (form: WrappedFormUtils) => actions.doAddProjectMemberRequest(form)
    },
    dispatch
  )

export default Form.create()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectMemberAdd)
)
