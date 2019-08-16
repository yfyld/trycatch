import * as React from 'react'
import { Button, Table } from 'antd'
import style from './Sourcemap.less'
import SourcemapAdd from './SourcemapAdd'

interface Props {
  className: string
}

function Sourcemap({ className }: Props) {
  const [addSourcemapVisible, setAddSourcemapVisible] = React.useState(false)

  //   const [operateSourcemapVisible, setoperateSourcemapVisible] = React.useState(false)

  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName'
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: '是否带hash',
      dataIndex: 'hash',
      key: 'hash'
    }
  ]
  return (
    <div className={className}>
      <SourcemapAdd
        visible={addSourcemapVisible}
        doCancel={() => setAddSourcemapVisible(false)}
      />
      <div className={style.action}>
        <Button type="primary" onClick={() => setAddSourcemapVisible(true)}>
          上传sourcemap文件
        </Button>
        {/* <Button onClick={}>修改sourcemap</Button> */}
      </div>
      <Table columns={columns} pagination={false} />
    </div>
  )
}

export default Sourcemap
