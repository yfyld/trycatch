import * as React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Card, Avatar } from 'antd'
import { ProjectListItem } from '@/types'
import style from './ProjectListPane.less'
import defaultImg from '@/assets/imgs/default.jpeg'

const { Meta } = Card

interface Props {
  projectInfo: ProjectListItem
  onDelete: (projectId: number) => {}
}

function ProjectListPane({ projectInfo, onDelete }: Props) {
  return (
    <div className={style.wrapper}>
      <Card
        actions={[
          <Link to={`/project/${projectInfo.id}`} key="project">
            <Icon type="edit" />
          </Link>,
          <Link to={`/dashboard/${projectInfo.id}`} key="error">
            <Icon type="exclamation-circle" />
          </Link>,
          <Icon
            type="delete"
            key="delete"
            onClick={() => {
              onDelete(projectInfo.id)
            }}
          />
        ]}
        cover={<img src={projectInfo.image || defaultImg} />}
      >
        <Meta
          avatar={<Avatar>{projectInfo.creator.nickname.substring(0, 3)}</Avatar>}
          title={projectInfo.name}
          description={projectInfo.description}
        />
      </Card>
    </div>
  )
}

export default ProjectListPane
