import * as React from 'react';
import { useState } from 'react';
import style from './EventRation.less';
import { getPercentByNumber } from '@/utils';

function EventRation({data, totalCount, title}) {
    const [current, setCurrent] = useState(0);
    return (
        <div className={style.wrapper}>
            <div className={style.text}>
                <span className={style.title}>{title}</span>
                <span className={style.percent}>{data.length ? `${getPercentByNumber(data[current].count, totalCount)} ${data[current].name}` : ''}</span>
            </div>
            <div className={style.ration}>
                {
                    data.map((item, index) => <div className={`${style.item} ${current === index ? `${style.active}`: ''}`} onMouseEnter={() => { setCurrent(index); }} key={index} style={{width: getPercentByNumber(item.count, totalCount)}}></div>)
                }
            </div>
            
        </div>
    )
}

export default EventRation;