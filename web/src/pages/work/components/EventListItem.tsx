import * as React from 'react';
import { EventListDataItem } from '@/types';
import style from './EventListItem.less';

type Props = EventListDataItem;

function EventListItem(props: Props) {
    return (
        <div>
            
            <div className={style.hardware}>
                <span>{props.os}</span>
                <span>{props.device}</span>
                <span>{props.browser}</span>
            </div>
            <div>
                <div className={style.date}>{props.createTime}</div>
                <div className={style.time}></div>
                <div className={style.location}>{props.location && props.location.region}</div>
            </div>
            
        </div>
    )
}

export default EventListItem;