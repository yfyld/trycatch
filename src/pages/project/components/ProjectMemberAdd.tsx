import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select } from 'antd';
import { StoreState } from '@/types';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props {
    visible: boolean
}

function ProjectMemberAdd({visible, ...props}: Props) {
    
    return (
        <Modal
            title='添加项目成员'
            visible={visible}

        >    
            <Form>
                <FormItem>
                    <Select>
                        <Option value='122'>122</Option>
                    </Select>
                </FormItem>
            </Form>
        
        </Modal>
    )
}

const mapStateToProps = (state: StoreState) => {
    return {
        visible: state.project.projectMemberAddVisible
    }
}

export default connect(mapStateToProps)(ProjectMemberAdd);