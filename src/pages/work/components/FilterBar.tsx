import * as React from 'react';
import {DatePicker,Tag,Button} from 'antd'
import * as moment from "moment";
import { ErrorSearchParams,StoreState } from '@/types'
import {connect} from 'react-redux'
import {ERROR_STATUS,ERROR_TYPE,ERROR_LEVEL} from "@/constants"
import { findOne } from "@/utils";

const {RangePicker} = DatePicker;
const dateFormat='YYYY/MM/DD';
const ButtonGroup=Button.Group

interface Props{
    doGetErrorAllData: (params:ErrorSearchParams) => any
    errorSearchParams:ErrorSearchParams
    dashboard?:boolean
}

function SearchParamsTag({ERROR, value, ...props}) {
    let newValue: string | number = value;
    if (/\d+/.test(value)) {
        newValue = parseInt(value, 10);
    }
    const item = findOne(ERROR, newValue);

    return (
        <Tag {...props}>{item ? item.text : value}</Tag>
    )
}


const FilterBar =({dashboard=true,doGetErrorAllData,errorSearchParams}:Props)=>{
    const now=new Date().setHours(23,59,59,999);
    const oneDay=24*3600*1000;

    return (
        <div>
            {dashboard&&[
                errorSearchParams.level?<SearchParamsTag ERROR={ERROR_LEVEL} value={errorSearchParams.level}  key={errorSearchParams.level} onClose={()=>doGetErrorAllData({level:null})} closable={true} />:null,
                errorSearchParams.status?<SearchParamsTag ERROR={ERROR_STATUS} value={errorSearchParams.status} key={errorSearchParams.status} onClose={()=>doGetErrorAllData({status:null})} closable={true} />:null,
                errorSearchParams.type?<SearchParamsTag ERROR={ERROR_TYPE} value={errorSearchParams.type} key={errorSearchParams.type} onClose={()=>doGetErrorAllData({type:null})} closable={true} />:null,
            ]}
            <ButtonGroup>
                <Button onClick={()=>doGetErrorAllData({startTime:now-oneDay+1,endTime:now})}>今天</Button>
                <Button onClick={()=>doGetErrorAllData({startTime:now-oneDay * 7+1,endTime:now})}>7天</Button>
                <Button onClick={()=>doGetErrorAllData({startTime:now-oneDay * 30+1,endTime:now})}>30天</Button>
                <Button onClick={()=>doGetErrorAllData({startTime:now-oneDay * 90+1,endTime:now})}>90天</Button>
            </ButtonGroup>
            <RangePicker
                allowClear={false}
                value={[moment(errorSearchParams.startTime), moment(errorSearchParams.endTime)]}
                format={dateFormat}
                onChange={dates=>{doGetErrorAllData({startTime:dates[0].toDate().setHours(0,0,0,0),endTime:dates[1].toDate().setHours(23,59,59,999)})}}
            />

        </div>
    )
}



const mapStateToprops = (state: StoreState) => {
    return {
        errorSearchParams:state.work.errorSearchParams
    }
  }
  
  export default connect(
    mapStateToprops
  )(FilterBar)