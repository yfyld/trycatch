export const errorStatus=(type:string):string=>{
  if(type === 'UNSOLVED'){
    return "未解决"
  }else if(type === 'SOLVED'){
    return "解决"
  }else if(type === 'IGNORE'){
    return "忽略"
  }else{
    return "处理中"
  }
}