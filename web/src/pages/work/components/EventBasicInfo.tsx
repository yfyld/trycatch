import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, EventListDataItem } from '@/types';
import style from './EventBasicInfo.less';
import { eventInfoSelector } from '@/store/selectors'



function EventInfo({ data, ua, location, libInfo }: EventListDataItem) {
    return (
        <div className={style.wrapper}>
            <div className={style.info}>
                <div className={style.part}>
                    <div className={style.title}>错误信息</div>
                    <ul>
                        <li className={style.item}>
                            <span className={style.name}>时间</span>
                            <span>{data.time}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>类型</span>
                            <span>{data.type}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>名称</span>
                            <span>{data.name}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>信息</span>
                            <span>{data.message}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>文件</span>
                            <span>{data.url}</span>
                        </li>
                    </ul>
                </div>
                {
                    data.type === 'HTTP_ERROR' && (
                        <div className={style.part}>
                            <div className={style.title}>请求信息</div>
                            <div>
                                <ul>
                                    <li className={style.item}>
                                        <span className={style.name}>method</span>
                                        <span></span>
                                    </li>
                                    <li className={style.item}>
                                        <span className={style.name}>url</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li className={style.item}>
                                        <span className={style.name}>status</span>
                                        <span></span>
                                    </li>
                                    <li className={style.item}>
                                        <span className={style.name}>url</span>
                                        <span></span>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    )
                }
                {
                    data.stack && data.stack.length && (
                        <div className={style.part}>
                            <div className={style.title}>堆栈信息</div>
                            {
                                data.stack.map((item, index) => (
                                    <ul key={index}>
                                        <li className={style.item}>
                                            <span className={style.name}>args</span>
                                            {/* <span>{JSON.stringify(item.args)}</span> */}
                                        </li>
                                        <li className={style.item}>
                                            <span className={style.name}>行号</span>
                                            <span>{item.line}</span>
                                        </li>
                                        <li className={style.item}>
                                            <span className={style.name}>列号</span>
                                            <span>{item.column}</span>
                                        </li>
                                        <li className={style.item}>
                                            <span className={style.name}>方法</span>
                                            <span>{item.func}</span>
                                        </li>
                                        <li className={style.item}>
                                            <span className={style.name}>文件</span>
                                            <span>{item.url}</span>
                                        </li>
                                    </ul>
                                ))
                            }
                        </div>
                    )
                }
                
            </div>
            
           <div className={style.common}>
            <div className={style.part}>
                    <div className={style.title}>设备信息</div>
                    <ul>
                        <li className={style.item}>
                            <span className={style.name}>浏览器</span>
                            <span>{ua.browser}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>JS引擎</span>
                            <span>{ua.browserVersion}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>操作系统</span>
                            <span>{ua.os}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>设备</span>
                            <span>{ua.device}</span>
                        </li>
                    </ul>
                </div>
                <div className={style.part}>
                    <div className={style.title}>位置信息</div>
                    <ul>
                        {/* <li className={style.item}>
                            <span className={style.name}>IP</span>
                            <span>{location.ip}</span>
                        </li> */}
                        <li className={style.item}>
                            <span className={style.name}>地点</span>
                            <span>{location.region}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>运营商</span>
                            <span>{location.isp}</span>
                        </li>
                        
                    </ul>
                </div>
                <div className={style.part}>
                    <div className={style.title}>其他信息</div>
                    <ul>
                        <li className={style.item}>
                            <span className={style.name}>插件版本</span>
                            <span>{libInfo.libVersion}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>事件ID</span>
                            <span>{data.errorId}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>userAgent</span>
                            <span>{ua.ua}</span>
                        </li>
                    </ul>
                </div>
           </div>
            
            
        </div>
    )
}

const mapStateToProps = (state: StoreState) => {
    const eventInfo = eventInfoSelector(state) || {};
    console.log(eventInfo);
    const { data, libInfo, ua, location, info } = eventInfo;
    return {
        data, libInfo, ua, location, info
    }
}

export default connect(mapStateToProps)(EventInfo);