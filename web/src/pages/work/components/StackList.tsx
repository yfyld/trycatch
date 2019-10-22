import * as React from 'react';
import style from './StackList.less';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import { IStack } from '@/api';
hljs.registerLanguage('javascript', javascript);

interface Props{
    stacks:IStack[]
    onParseSourcemap:(param:IStack)=>any
}




const StackList =({stacks,onParseSourcemap}:Props)=>{
  React.useEffect(() => {
    document.querySelectorAll('.code:not(.hljs)').forEach((block) => {
      hljs.highlightBlock(block);
      const start=Number(block.getAttribute('data-line'))-3;
      block.innerHTML="<ol start='"+(start>0?start:1)+"'><li>" +block.innerHTML.replace(/\n/g,"\n</li><li>") +"\n</li></ol>";
    });
  
}, [stacks])



    if(!stacks){
      return null;
    }
    



    return (
      <div className={style.part}>
      <div className={style.title}>堆栈信息</div>
      <div className={style.wrapper}>
      {
          stacks.map((item, index) => (
              <ul key={item.url+item.line+item.column+(!!item.source)}>
                  <li className={style.item}>
                      <span className={style.name}>文件</span>
                      <span className={item.source?'':style.link} onClick={()=>onParseSourcemap(item)}>{item.url}</span>
                  </li>
                  <li className={style.item}>
                      <span className={style.name}>方法</span>
                      <span>{item.func}</span>
                  </li>
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
                  {item.source&&<li className={style.item}>
                      <span className={style.name}>源码</span>
                      <span> <strong>{item.source.name}</strong>&emsp;@ {item.source.sourceUrl}({item.source.line}:{item.source.column})</span>
                      <div>
                      <pre className={'hljs '+'error-line-'+(item.source.line>3?4:item.source.line)}>
                              <code data-line={item.source.line} className='code'>{item.source.code}</code>
                          </pre>
                      </div>
                  </li>}
                  
                  
              </ul>
          ))
      }
      </div>
  </div>
    )
}

export default StackList