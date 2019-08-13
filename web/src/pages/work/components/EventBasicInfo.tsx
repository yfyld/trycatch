import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { StoreState, IError, LibInfo, ClientInfo, Location, Source } from '@/types';
import style from './EventBasicInfo.less';
import { eventInfoSelector } from '@/store/selectors'
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('javascript', javascript);

interface Props {
    data: IError,
    clientInfo: ClientInfo,
    location: Location,
    libInfo: LibInfo,
    source: Source
}


function EventInfo({ data, clientInfo, location, libInfo, source }: Props) {
    React.useEffect(() => {
        if (source.code) {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
              });
        }
    }, [source.code])
    return (
        <div className={style.wrapper}>
            <div className={style.info}>
                <div className={style.part}>
                    <div className={style.title}>概要信息</div>
                    <ul>
                        <li className={style.item}>
                            <span className={style.name}>时间</span>
                            <span>{data.time && moment(data.time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>类型</span>
                            <span>{data.type}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>URL</span>
                            <span>{data.url}</span>
                        </li>
                        {
                            (data.type === 'LOG_ERROR' || data.type === 'PROMISE_ERROR') && (
                                <li className={style.item}>
                                    <span className={style.name}>信息</span>
                                    <span>{data.message}</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
                {
                    data.type === 'HTTP_ERROR' && (
                        <div className={style.part}>
                            <div className={style.title}>请求信息</div>
                            <div>
                                <div className={style.request}>Request</div>
                                <ul>
                                    <li className={style.item}>
                                        <span className={style.name}>method</span>
                                        <span>{data.request && data.request.method}</span>
                                    </li>
                                    <li className={style.item}>
                                        <span className={style.name}>url</span>
                                        <span>{data.request && data.request.url}</span>
                                    </li>
                                    {
                                        data.request && data.request.data && (
                                            <li className={style.item}>
                                                <span className={style.name}>body</span>
                                                <span>{data.request && data.request.data}</span>
                                            </li>
                                        )
                                    }
                                    {
                                        data.request && data.request.params && (
                                            <li className={style.item}>
                                                <span className={style.name}>params</span>
                                                <span>{data.request && data.request.params}</span>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div>
                                <div className={style.response}>Response</div>
                                <ul>
                                    <li className={style.item}>
                                        <span className={style.name}>status</span>
                                        <span>{data.response && data.response.status}</span>
                                    </li>
                                    <li className={style.item}>
                                        <span className={style.name}>response</span>
                                        <span>{data.response && data.response.statusText}</span>
                                    </li>
                                    <li className={style.item}>
                                        <span className={style.name}>description</span>
                                        <span>{data.response && data.response.description}</span>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    )
                }
                {
                    data.type === 'JAVASCRIPT_ERROR' && (
                        <div className={style.part}>
                            <div className={style.title}>错误信息</div>
                            <ul>
                                <li className={style.item}>
                                    <span className={style.name}>名称</span>
                                    <span>{data.name}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>信息</span>
                                    <span>{data.message}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>行号</span>
                                    <span>{data.line}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>列号</span>
                                    <span>{data.column}</span>
                                </li>
                            </ul>
                        </div>
                    )
                }
                {
                    data.type === 'RESOURCE_ERROR' && (
                        <div className={style.part}>
                            <div className={style.title}>资源信息</div>
                            <ul>
                                <li className={style.item}>
                                    <span className={style.name}>outerHTML</span>
                                    <span>{data.outerHTML}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>tagName</span>
                                    <span>{data.tagName}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>src</span>
                                    <span>{data.src}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>timeStamp</span>
                                    <span>{data.timeStamp}</span>
                                </li>
                            </ul>
                        </div>
                    )
                }
                
                {
                    source && (
                        <div className={style.part}>
                            <div className={style.title}>SourceMap信息</div>
                            <ul>
                                <li className={style.item}>
                                    <span className={style.name}>行号</span>
                                    <span>{source.line}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>列号</span>
                                    <span>{source.column}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>文件</span>
                                    <span>{source.sourceUrl}</span>
                                </li>
                                <li className={style.item}>
                                    <span className={style.name}>源码</span>
                                    <span>
                                        <pre className='javascript'>
                                            <code>{source.code}</code>
                                        </pre>
                                    </span>
                                </li>
                            </ul>
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
                            <span>{clientInfo.browser}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>JS引擎</span>
                            <span>{clientInfo.browserVersion}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>操作系统</span>
                            <span>{clientInfo.os}</span>
                        </li>
                        <li className={style.item}>
                            <span className={style.name}>设备</span>
                            <span>{clientInfo.device}</span>
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
                            <span>{clientInfo.ua}</span>
                        </li>
                    </ul>
                </div>
           </div>
            
            
        </div>
    )
}

const mapStateToProps = (state: StoreState) => {
    const eventInfo = eventInfoSelector(state);
    const { data, libInfo, clientInfo, location, info, source } = eventInfo;
    return {
        data, libInfo, clientInfo, location, info, source
    }
}

export default connect(mapStateToProps)(EventInfo);