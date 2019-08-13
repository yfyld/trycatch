import * as React from 'react';
import { Upload, Button, Icon } from 'antd';

interface Props {
    className: string
}

function Sourcemap({ className}: Props) {
    const props = {
        name: 'file',
        action: 'http://127.0.0.1:3300/common/upload',
        multiple: true,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    }
    return (
        <div className={className}>
            <Upload {...props}>
                <Button>
                    <Icon type='upload'/> 上传sourcemap文件
                </Button>    
            </Upload>
        </div>
        
    )
}

export default Sourcemap;