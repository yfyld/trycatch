import * as React from 'react';
import { connect } from 'react-redux';
import { Timeline } from 'antd';
import * as moment from 'moment';
import { StoreState } from '@/types';
import style from './ErrorBehavior.less';

function ErrorBehavior({behaviorList, ...props}) {
    return (
        <Timeline className={style.wrapper}>
            {
                behaviorList.map((item, index) => (
                    <Timeline.Item key={index}>
                        <ul className={style.behavior}>
                            <li className={style.type}>{item.type}</li>
                            {item.page ? <li className={style.item}><span className={style.name}>page：</span><span>{item.page}</span></li> : null}
                            {item.method ? <li className={style.item}><span className={style.name}>method：</span><span>{item.method}</span></li> : null}
                            {item.url ? <li className={style.item}><span className={style.name}>url：</span><span>{item.url}</span></li> : null}
                            {
                                item.html ? <li className={style.item}><span className={style.name}>html：</span><span>{item.html}</span></li> : null
                            }
                            <li className={style.time}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</li>
                        </ul>
                        
                    </Timeline.Item>
                ))
            }
        </Timeline>
    )
}

const mapStateToProps = (state: StoreState) => {
    const behaviorList = JSON.parse(state.work.eventInfo.source).behavior
    return {
        behaviorList
    }
}

export default connect(mapStateToProps)(ErrorBehavior);