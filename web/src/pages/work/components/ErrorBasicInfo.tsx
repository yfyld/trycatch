import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '@/types';
import style from './ErrorBasicInfo.less';

function ErrorInfo({type, name, message, url, stack, version, errorId, ...props}) {
    return (
        <div className={style.wrapper}>
            <div className={style.part}>
                <div className={style.title}>错误信息</div>
                <ul>
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
            <div className={style.part}>
                <div className={style.title}>其他信息</div>
                <ul>
                    <li className={style.item}>
                        <span className={style.name}>插件版本</span>
                        <span>{version}</span>
                    </li>
                    {/* <li className={style.item}>
                        <span className={style.name}>事件ID</span>
                        <span>{errorId}</span>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state: StoreState) => {
    const eventInfo = JSON.parse(state.work.eventInfo.source);
    return {
        ...eventInfo.data,
        ...eventInfo.authInfo
    }
}

export default connect(mapStateToProps)(ErrorInfo);