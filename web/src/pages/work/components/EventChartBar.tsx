import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as moment from 'moment';

const getOption=(data)=>{
    const xData = data.map(item => moment(item.date).format('YYYY-MM-DD HH:mm:ss'));
    const yData = data.map(item => item.count);
    return {
        grid:{
            left:10,
            top:10,
            bottom:50,
            right:10
        },
        tooltip:{
            backgroundColor:"#09c",
            textStyle:{
                color:"#fff"
            },
            trigger:'axis',
            // formatter: params=>`日期:${params[0].data.name}<br>事件数:${params[0].data.value[1]}`
        },
        xAxis: {
         
            type: 'category',
            boundaryGap: ['20%', '20%'],
            data: xData,
            splitLine:false,
            axisLine:{
                lineStyle:{
                    color:"#999"
                }
            }
        },
        yAxis: {
            show:false,
            type: 'value',
            splitLine:false
        },
        series: [{
            data: yData,
            type: 'bar',
            // lineStyle:{
            //     color:"#09c"
            // },
        }]
    }
}

const EventChartBar=({data})=> {
    return (
        <ReactEcharts
        option={getOption(data)}
        notMerge={true}
        lazyUpdate={true}
        style={{height: 240}}
        />
    )
}

export default  EventChartBar