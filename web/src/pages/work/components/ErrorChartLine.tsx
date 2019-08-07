import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts"

const getOption=(data)=>({
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
        formatter: params=>`日期:${params[0].data.name}<br>数量:${params[0].data.value[1]}`
    },
    xAxis: {
     
        type: 'time',
        boundaryGap: ['20%', '20%'],
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
        data,
        type: 'line',
        lineStyle:{
            color:"#09c"
        },
        areaStyle: {
            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#09c'
            }, {
                offset: 1,
                color: '#fff'
            }])
        },
        smooth:true
    }]
})

const ErrorChartLine=({data})=> {
    return (
        <ReactEcharts
        option={getOption(data)}
        notMerge={true}
        lazyUpdate={true}
        />
    )
}

export default  ErrorChartLine