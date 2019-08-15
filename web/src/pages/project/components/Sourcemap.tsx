import * as React from 'react';
import { Upload, Button, Icon, Table } from 'antd';

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
        },
        onChange: ({file, fileList}) => {
            if (file.status !== 'uploading') {
                const fileName = file.name;
                const url = file.response.result.url;
                console.log(fileName);
                console.log(url);
                console.log([...fileList]);
            }
            
        }
    }
    const columns = [{
        title: '文件名',
        dataIndex: 'fileName',
        key: 'fileName'
    }, {
        title: 'url',
        dataIndex: 'url',
        key: 'url'
    }]
    return (
        <div className={className}>
            <Upload {...props}>
                <Button>
                    <Icon type='upload'/> 上传sourcemap文件
                </Button>    
            </Upload>
            <Table columns={columns} pagination={false}/>
        </div>
        
    )
}

export default Sourcemap;