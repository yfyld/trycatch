import * as React from 'react';
import {DatePicker,Tag,Button} from 'antd'
import * as moment from "moment";
import { ErrorSearchParams,StoreState } from '@/types'
import {connect} from 'react-redux'

const {RangePicker} = DatePicker;
const dateFormat='YYYY/MM/DD';
const ButtonGroup=Button.Group

interface Props{
    doGetErrorAllData: (params:ErrorSearchParams) => any
    errorSearchParams:ErrorSearchParams
    dashboard?:boolean
}



const FilterBar =({dashboard=true,doGetErrorAllData,errorSearchParams}:Props)=>{
    const now=new Date().setHours(23,59,59,999);
    const oneDay=24*3600*1000;
    return (
        <div>
            {dashboard&&[
                errorSearchParams.level?<Tag key={errorSearchParams.level} onClose={()=>doGetErrorAllData({level:null})} closable={true} >{errorSearchParams.level}</Tag>:null,
                errorSearchParams.status?<Tag key={errorSearchParams.status} onClose={()=>doGetErrorAllData({status:null})} closable={true} >{errorSearchParams.status}</Tag>:null,
                errorSearchParams.type?<Tag key={errorSearchParams.type} onClose={()=>doGetErrorAllData({type:null})} closable={true} >{errorSearchParams.type}</Tag>:null,
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