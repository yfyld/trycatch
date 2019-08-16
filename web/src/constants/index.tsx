export const CACHE_TIME:number = 3000;

export const ERROR_STATUS = [
  {
    text: '未解决',
    color: 'red',
    value: 'UNSOLVED'
  },
  {
    text: '解决',
    color: 'green',
    value: 'SOLVED'
  },
  {
    text: '忽略',
    color: '#ccc',
    value: 'IGNORE'
  },
  {
    text: '处理中',
    color: 'orange',
    value: 'PROGRESS'
  }
]

export const ERROR_TYPE=[
  {
    text:"请求错误",
    value:"HTTP_ERROR"
  },
  {
    text:"JS错误",
    value:"JAVASCRIPT_ERROR"
  },
  {
    text:"VUE错误",
    value:"VUE_ERROR"
  },
  {
    text: "PROMISE错误",
    value: "PROMISE_ERROR"
  }, 
  {
    text: "资源错误",
    value: "RESOURCE_ERROR"
  }
]

export const ERROR_LEVEL=[
  {
    text:"一级",
    color: 'blue',
    value:1
  },
  {
    text:"二级",
    color: 'orange',
    value:2
  },
  {
    text:"三级",
    color: 'red',
    value:3
  }
]

