
function main() {
    var myChart = echarts.init(document.getElementById('main'));
    var dateCategory = data.map((item) => { return item.date })
    var macd = calculateMACD(data.map((item) => { return parseFloat(item.close) }))

    // 指定图表的配置项和数据
    /** @type EChartsOption */
    var option = {
        legend: {
            data: ['MA70', 'MA250']
        },
        visualMap: [
            {
                show: false,
                seriesIndex: 4,
                dimension: 2,
                pieces: [
                    {
                        value: 1,
                        color: UP_COLOR,
                    },
                    {
                        value: -1,
                        color: DOWN_COLOR
                    }
                ]
            },
        ],
        grid: [
            {
                left: '10%',
                right: '8%',
                height: '40%'
            },
            {
                left: '10%',
                right: '8%',
                top: '50%',
                height: '15%'
            },
            {
                left: '10%',
                right: '8%',
                top: '70%',
                height: '15%'
            }
        ],
        xAxis: [{
            type: "category",
            data: dateCategory
        }, {
            type: "category",
            gridIndex: 1,
            data: dateCategory,
        }, {
            type: "category",
            gridIndex: 2,
            data: dateCategory,
        }],
        yAxis: [{
            scale: true,
            splitArea: {
                show: true,
            },
        }, {
            scale: true,
            gridIndex: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        }, {
            scale: true,
            gridIndex: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1, 2],
                startValue: data.length - DEFAULT_KLINE_NUM,
                endValue: data.length,
            },
            {
                type: 'slider',
                xAxisIndex: [0, 1, 2],
                startValue: data.length - DEFAULT_KLINE_NUM,
                endValue: data.length,
            },
        ],
        series: [
            {
                type: 'candlestick',
                data: data.map((item) => { return [item.open, item.close, item.low, item.high] }),
                itemStyle: {
                    color: '#fff',
                },
                markPoint: {
                    label: {
                        formatter: function (param) {
                            console.log(param)
                            return param != null ? Math.round(param.value) + '' : '';
                        }
                    },
                    data: [
                        { type: "max", valueDim: 'highest'},
                        { type: "min", valueDim: 'lowest' },
                    ],
                },
            },
            {
                name: 'MA70',
                type: 'line',
                data: MA(data.map((item) => { return [item.close] }), 70),
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    opacity: 0.5,
                    width: 1.5,
                },
            },
            {
                name: 'MA250',
                type: 'line',
                data: MA(data.map((item) => { return [item.close] }), 250),
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    opacity: 0.5,
                    width: 1.5,
                },
            },
            {
                name: '成交量',
                type: 'bar',
                data: data.map((item) => { 
                    let color = item.close > item.open ? '#fff' : DOWN_COLOR
                    let borderColor = item.close > item.open ? UP_COLOR : DOWN_COLOR
                    return {value: item.volume, itemStyle: {color: color, borderColor: borderColor}} 
                }),
                xAxisIndex: 1,
                yAxisIndex: 1,
            },
            {
                name: 'macd',
                type: 'bar',
                barWidth: 1,
                data: macd.macd.map((item, index) => { return [index, item, item > 0 ? 1 : -1] }),
                xAxisIndex: 2,
                yAxisIndex: 2,
            },
            {
                name: 'dea',
                type: 'line',
                data: macd.dea,
                xAxisIndex: 2,
                yAxisIndex: 2,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    opacity: 0.5,
                    width: 1.5,
                    color: "#ffa32a",
                },
            },
            {
                name: 'dif',
                type: 'line',
                data: macd.dif,
                xAxisIndex: 2,
                yAxisIndex: 2,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    opacity: 0.5,
                    width: 1.5,
                    color: "#3787d7",
                },
            },
        ]

    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


console.log('hello main.js')