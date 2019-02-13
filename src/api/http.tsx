import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  
} from 'axios'
import config from '@/config'
import {message} from "antd"

const Loading = {
  loadingNum: 0,
  add(): void {
    if (this.loadingNum === 0) {
      this.dispatch(true)
    }
    this.loadingNum++
  },
  remove(): void {
    this.loadingNum--
    if (this.loadingNum <= 0) {
      this.loadingNum = 0
      this.dispatch(false)
    }
  },
  dispatch(loading: boolean) {
    console.log(1)
  }
}

let curMes = ''
const errorMessage = (mes: string) => {
  if (mes === curMes) {
    return
  }
  message.error(mes,()=>{
    curMes=''
  })
  curMes = mes
}

// 实例
const instance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    Loading.add()
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    Loading.remove()
    if(response.data.status===2000){
      response.data=response.data.data;
      return Promise.resolve(response)
    }else{
      errorMessage(response.data.msg)
      return Promise.reject(response)
    }
  },
  (error: AxiosError) => {
    Loading.remove()

    if (error.code === 'ECONNABORTED') {
      errorMessage('网络连接超时')
    } else {
      errorMessage('请求失败')
    }

    return Promise.reject(error)
  }
)

// 重写instance.get
const getFn = instance.get
instance.get = (
  url,
  data?: object,
  config: AxiosRequestConfig = {}
): AxiosPromise => {
  config.params = data
  return getFn(url, config)
}

export default instance
