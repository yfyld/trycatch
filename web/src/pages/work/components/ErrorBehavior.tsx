import * as React from 'react';
import { connect } from 'react-redux';
import { Timeline } from 'antd';
import * as moment from 'moment';
import { StoreState, BehaviorListItem } from '@/types';
import style from './ErrorBehavior.less';
import { eventInfoSelector } from '@/store/selectors';

interface Props {
    behavior: BehaviorListItem[]
}

function ErrorBehavior({behavior}: Props) {
    return (
        <Timeline className={style.wrapper}>
            {
                behavior.map((item, index) => (
                    <Timeline.Item key={index}>
                        <ul className={style.behavior}>
                            <li className={style.type}>{item.type}</li>
                            {item.page ? <li className={style.item}><span className={style.name}>page：</span><span>{item.page}</span></li> : null}
                            {item.method ? <li className={style.item}><span className={style.name}>method：</span><span>{item.method}</span></li> : null}
                            {item.url ? <li className={style.item}><span className={style.name}>url：</span><span>{item.url}</span></li> : null}
                            {
                                item.newURL ? <li className={style.item}><span className={style.name}>url：</span><span>{item.newURL}</span></li> : null
                            }
                            {
                                item.oldURL ? <li className={style.item}><span className={style.name}>oldURL：</span><span>{item.oldURL}</span></li> : null
                            }
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
    const eventInfo = eventInfoSelector(state);
    return {
        behavior: eventInfo.behavior || []
    }
}

export default connect(mapStateToProps)(ErrorBehavior);