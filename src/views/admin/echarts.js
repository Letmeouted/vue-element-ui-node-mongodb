export var option = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '6%',
        right: '6%',
        bottom: '6%',
        containLabel: true
    },
    legend: {
        data: ['房屋浏览量', '房屋喜爱量'],
        left: '6%',
        top: 'top',
        itemWidth: 15, //图例图标的宽                    
        itemHeight: 15, //图例图标的高                    
        textStyle: {
            color: '#3a6186',
            fontSize: 20,
        }
    },
    toolbox: {
        show: true,
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        },
        right: '6%',
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        data: [],
        name: 'title',
        splitLine: { show: false }, //去除网格分割线                        
        axisTick: { //刻度                            
            show: false, //不显示刻度线 
        },
        axisLine: { //坐标线                            
            lineStyle: {
                type: 'solid',
                color: '#e7e7e7', //轴线的颜色                                
                width: '2' //坐标线的宽度                           
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
                color: '#3a6186', //坐标值的具体的颜色                           
            }
        },
        splitLine: {
            show: false //去掉分割线                       
        },
    }],
    yAxis: [{
        type: 'value',
        axisLine: { //线                           
            show: false
        },
        axisTick: { //刻度                           
            show: false
        },
        axisLabel: {

            textStyle: {
                color: '#3a6186', //坐标值的具体的颜色                           
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#e7e7e7'], //分割线的颜色                           
            }
        }
    }],
    series: [{
            name: '房屋浏览量',
            type: 'bar',
            barWidth: 20,
            data: [],
            itemStyle: {
                normal: {
                    color: '#00abf7', //设置柱子颜色                                
                    label: {
                        show: true, //柱子上显示值                                    
                        position: 'top', //值在柱子上方显示                                    
                        textStyle: {
                            color: '#00abf7', //值的颜色                                        
                            fontSize: 16,
                        }
                    }
                }
            },
        },
        {
            name: '房屋喜爱量',
            type: 'bar',
            barWidth: 20,
            data: [],
            itemStyle: {
                normal: {
                    color: '#ff4f76', //设置柱子颜色                                
                    label: {
                        show: true, //柱子上显示值                                    
                        position: 'top', //值在柱子上方显示                                    
                        textStyle: {
                            color: '#ff4f76', //值的颜色                                        
                            fontSize: 16,
                        }
                    }
                }
            },
        }
    ]
};