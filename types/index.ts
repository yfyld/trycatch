
export interface PageQuery{
  page:number,
  pageSize:number
}


export interface ProjectModel{
  id:number,
  name:number
}


export interface CreateLogParams{
  type:string
  page:string
  projectId:number
  version:string
  errorId:number
  source:string
  name?:string
  message?:string
  status?:number
  url?:string
}

export interface LogRequestBody {
  authInfo: {
    apikey: string
    version: string
  }
  data: {
    type: string
    page: string
    errorId: number
    level: number
    time: number
    name: string
    message: string
    response?: {
      status: number
      statusText: string
      description: string
    }
    request?: {
      method: string
      url: string
      data: any
    }
    stack:any[]
  }
  behavior: [
    {
      type: string
      page: string
      method?: string
      url?: string
      time?: string
    }
  ]
}