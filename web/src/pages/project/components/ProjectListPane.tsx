import * as React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Card, Avatar, Modal } from 'antd'
import { IProjectListItem } from '@/api'
import style from './ProjectListPane.less'
import defaultImg from '@/assets/imgs/default.jpeg'

const { Meta } = Card
const { confirm } = Modal

interface Props {
  projectInfo: IProjectListItem
  onDelete: (projectId: number) => {}
}

function ProjectListPane({ projectInfo, onDelete }: Props) {
  const handleDelete = (projectId: number) => {
    confirm({
      title: '提示?',
      content: '确定要删除该项目吗',
      okType: 'danger',
      onOk() {
        onDelete(projectId)
      }
    })
  }
  return (
    <div className={style.wrapper}>
      <Link to={`/dashboard/${projectInfo.id}`}>
        <Card
          actions={[
            <Link to={`/project/${projectInfo.id}`} key="project">
              <Icon type="edit" />
            </Link>,
            <Icon type="exclamation-circle" key="error" />,
            <Icon
              type="delete"
              key="delete"
              onClick={e => {
                e.preventDefault()
                handleDelete(projectInfo.id)
              }}
            />
          ]}
          cover={
            <div className={style.image}>
              <img src={projectInfo.image || defaultImg} />
            </div>
          }
        >
          <Meta
            avatar={<Avatar>{projectInfo.creator.nickname.substring(0, 3)}</Avatar>}
            title={projectInfo.name}
            description={projectInfo.description}
          />
        </Card>
      </Link>
    </div>
  )
}

export default ProjectListPane
