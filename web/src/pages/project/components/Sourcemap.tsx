import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { Button, Table } from 'antd'
import style from './Sourcemap.less'
import SourcemapAdd from './SourcemapAdd'
import { IAction, IStoreState, ISourcemapList } from '@/types'
import * as actions from '@/store/actions'

interface Props {
  className: string,
  doVisible: () => void,
  sourcemap: ISourcemapList
}

function Sourcemap({ className, doVisible, sourcemap }: Props) {

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
      key: 'hash',
      render: (hash) => hash ? '是' : '否'
    }
  ]
  return (
    <div className={className}>
      <SourcemapAdd />
      <div className={style.action}>
        <Button type="primary" onClick={() => doVisible()}>
          上传sourcemap文件
        </Button>
        {/* <Button onClick={}>修改sourcemap</Button> */}
      </div>
      <Table columns={columns} pagination={false} dataSource={sourcemap.list}/>
    </div>
  )
}

const mapStateToProps = (state: IStoreState) => ({
  sourcemap: state.project.projectSourcemapList
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doVisible: () => actions.doAddProjectSourcemapToggle(true),
      // doCancel: () => actions.doAddProjectSourcemapToggle(false)
    },
    dispatch
  )


export default connect(mapStateToProps, mapDispatchToProps)(Sourcemap)
