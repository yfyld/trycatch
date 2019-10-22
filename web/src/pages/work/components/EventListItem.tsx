import * as React from 'react';
import * as moment from 'moment';
import { EventListDataItem } from '@/types';
import style from './EventListItem.less';

type Props = EventListDataItem;

function EventListItem(props: Props) {
    const { type, time, elapsedTime, request, url, name } = props.data;
    const isToday = (Date.now() - time) < (1000 * 60 * 60 * 24);
    const showUrl = type === 'HTTP_ERROR' ? request.url : url;
    const showType = type === 'HTTP_ERROR' ? request.method : (name||type)

    return (
        <div className={style.wrapper}>
            <div className={style.main}>
                <div className={style.type}>{showType}</div>
                <div className={style.url}>{showUrl}</div>
                <div className={style.hardware}>
                    <span>{props.clientInfo.os}</span>
                    <span>{props.clientInfo.device}</span>
                    <span>{props.clientInfo.browser}</span>
                </div>
            </div>
            <div className={style.other}>
                <div className={style.date}>{isToday ? moment(time).format('HH:mm') : moment(time).format('MM-DD')}</div>
                <div className={style.time}>{elapsedTime? `${elapsedTime.toFixed(2)}ms` : ' '}</div>
                <div className={style.location}>{props.location && props.location.region}</div>
            </div>
            
        </div>
    )
}

export default EventListItem;