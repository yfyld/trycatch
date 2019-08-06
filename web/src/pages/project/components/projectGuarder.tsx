import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Select, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { StoreState, User } from '@/types';


const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends FormComponentProps {
    userList: User[],
    guarder: User,
    // projectInfo: ProjectInfo
}

function Guarder({form, userList, guarder}: Props) {
    const { getFieldDecorator
        , setFieldsValue
     } = form;
    React.useEffect(()=>{
        setFieldsValue({
            guarder: guarder.id
          })
    }, [guarder.id])
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
        <Form>
            <FormItem {...formItemLayout} label='项目预警人'>
                {
                    getFieldDecorator('guarder')(
                        <Select placeholder='请选择' showSearch>
                            {
                                userList.map((item: User) => <Option key={item.id} value={item.id}>{item.nickName}</Option>)
                            }
                        </Select>
                    )
                }
            </FormItem>
            <FormItem {...formItemOffsetLayout}>
                <Button>提交</Button>
            </FormItem>
        </Form>
    )
}

const mapStateToProps = (state: StoreState) => {
    return {
        userList: state.app.userList,
        guarder: state.project.projectGuarder,
        
    }
}

export default Form.create()(connect(mapStateToProps)(Guarder));