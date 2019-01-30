import * as React from 'react';
import {DatePicker,Button} from 'antd'
import * as moment from "moment";
import { ErrorSearchParams } from '@/types'
const {RangePicker} = DatePicker;
const dateFormat='YYYY/MM/DD';


interface Props{
    doGetErrorAllData: (params:ErrorSearchParams) => any
}

const FilterBar =({doGetErrorAllData}:Props)=>{
    return (
        <div>
            <RangePicker
                defaultValue={[moment(new Date().setHours(0,0,0,0)-24*3600000*30), moment(new Date().setHours(0,59,59,999))]}
                format={dateFormat}
            />

            <Button onClick={()=>doGetErrorAllData({})}>查询</Button>
        </div>
    )
}

export default FilterBar