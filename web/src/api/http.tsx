import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager } from 'axios'
import store from '@/store/configureStore'
import { doChangeLoadingStatus } from '@/store/actions'
// import { isNotEmpty } from '@/utils/util';
import config from '@//config'

const Loading = {
  loadingNum: 0,
  add(type: string = 'GET'): void {
    if (this.loadingNum === 0) {
      this.dispatch(true, type)
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
  dispatch(loading: boolean, type: string = 'GET'): void {
    store.dispatch(doChangeLoadingStatus(loading, type))
  }
}

interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: AxiosRequestConfig): AxiosPromise
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T>
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

const instance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 0,
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + (localStorage.getItem('accessToken') || '')
  }
  // transformRequest: [function(data, headers) {
  //     if (data && typeof data === 'string') {
  //         headers['Content-Type'] = 'application/json';
  //         return data;
  //     }
  //     return (data && !(data instanceof FormData)) ? Object.keys(data).filter((item: string) => data[item] !== undefined).map((item: string) => `${item}=${encodeURIComponent(data[item])}`).join('&') : data;
  // }],
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      !(
        (config.params && (config.params as any).showLoading === false) ||
        (config.data && (config.data as any).showLoading === false)
      )
    ) {
      Loading.add(config.method && config.method.toUpperCase())
    }
    return config
  },
  (error: any) => {
    Loading.remove()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (
      !(
        (response.config.params && (response.config.params as any).showLoading === false) ||
        (response.config.data && (response.config.data as any).showLoading === false)
      )
    ) {
      Loading.remove()
    }
    if (response.data.status === 200 || response.data.status === 404) {
      response.data = response.data.result
    } else {
      return Promise.reject({ message: response.data.message || '操作失败' })
    }

    return response
  },
  (error: any) => {
    if (error && error.response && error.response.status === 403) {
      window.location.replace('/login')
    }
    Loading.remove()
    return Promise.reject(error)
  }
)

const getFn = instance.get
instance.get = function(url: string, data: object = {}, config: AxiosRequestConfig = {}): AxiosPromise {
  // const newData = {};
  // for (const d in data) {
  //     if (isNotEmpty(data[d])) {
  //         newData[d] = data[d];
  //     }
  // }
  // config.params = newData;
  config.params = data
  return getFn(url, config)
}

const postFn = instance.post
instance.post = function(url: string, data: any = {}): AxiosPromise {
  if (data.dataType === 'formData') {
    const formData = new FormData()
    for (const key in data) {
      if (key !== 'dataType' && data.hasOwnProperty(key) && data[key] !== undefined && data[key] !== null) {
        if (data[key] instanceof Array) {
          // data[key].forEach((k: any) => {
          //     formData.append(key, k);
          // })
          for (const k of data[key]) {
            if (k instanceof Object) {
              formData.append(key, k)
              continue
            } else {
              formData.append(key, data[key])
              break
            }
          }
        } else {
          formData.append(key, data[key])
        }
      }
    }
    return postFn(url, formData)
  }
  return postFn(url, data)
}

export default instance
