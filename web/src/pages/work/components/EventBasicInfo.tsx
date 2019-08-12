import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '@/types';
import style from './EventBasicInfo.less';

function ErrorInfo({type, name, message, url, stack, version, errorId, ua, time, ...props}) {
    return (
        <div className={style.wrapper}>
            <div className={style.info}>
                <div className={style.part}>
                    <div className={style.title}>错误信息</div>
                    <ul>
                        <li className={style.item}>
                            <span className={style.name}>时间</span>
                            <span>{time}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>类型</span>
                            <span>{type}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>名称</span>
                            <span>{name}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>信息</span>
                            <span>{message}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>文件</span>
                            <span>{url}</span>
                        </li>
                    </ul>
                </div>
                {
                    type === 'HTTP_ERROR' && (
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
                    stack && stack.length && (
                        <div className={style.part}>
                            <div className={style.title}>堆栈信息</div>
                            {
                                stack.map((item, index) => (
                                    <ul key={index}>
                                        <li className={style.item}>
                                            <span className={style.name}>args</span>
                                            <span>{JSON.stringify(item.args)}</span>
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
                            <span>{type}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>JS引擎</span>
                            <span>{name}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>操作系统</span>
                            <span>{message}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>设备</span>
                            <span>{url}</span>
                        </li>
                    </ul>
                </div>
                <div className={style.part}>
                    <div className={style.title}>位置信息</div>
                    <ul>
                        <li className={style.item}>
                            <span className={style.name}>IP</span>
                            <span>{type}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>地点</span>
                            <span>{name}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>运营商</span>
                            <span>{message}</span>
                        </li>
                        
                    </ul>
                </div>
                <div className={style.part}>
                    <div className={style.title}>其他信息</div>
                    <ul>
                        <li className={style.item}>
                            <span className={style.name}>插件版本</span>
                            <span>{version}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>事件ID</span>
                            <span>{errorId}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>userAgent</span>
                            <span>{ua}</span>
                        </li>
                    </ul>
                </div>
           </div>
            
            
        </div>
    )
}

const mapStateToProps = (state: StoreState) => {
    return {
        ...state.work.eventInfo
    }
}

export default connect(mapStateToProps)(ErrorInfo);