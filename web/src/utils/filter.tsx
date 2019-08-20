import {ERROR_STATUS} from "@/constants"
export const errorStatus=(type:number):typeof ERROR_STATUS[0]=>{
  return ERROR_STATUS.find(item=>item.value===type)
}

