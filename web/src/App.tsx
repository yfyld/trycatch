import * as React from 'react'
import style from './App.less'
import Routes from '@/router'


class App extends React.Component {
  public render() {
    return (
      <div className={style.app}>
        <Routes />
      </div>
    )
  }
}

export default App
