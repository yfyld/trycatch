import * as React from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane




function ProjectDetails(){
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="基本信息" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="预警设置" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="成员管理" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}



export default ProjectDetails