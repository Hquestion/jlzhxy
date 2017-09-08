/**
 * Created by 贺小雷 on 2017-09-07.
 * 参数配置
 */
(function(g){
	g.ZHJL_CONFIG = {
		heartbeat: 10 * 60 * 1000,
		gradeNoMap: {
			'1': '一年级',
			'2': '二年级',
			'3': '三年级',
			'4': '四年级',
			'5': '五年级',
			'6': '六年级',
			'7': '初一',
			'8': '初二',
			'9': '初三',
			'10': '高一',
			'11': '高二',
			'12': '高三'
		},
		autoplayInterval: 5000,
		swiperEffect: 'fade',
		lineChartCfg: {
			xAxis: {
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(150,150,150,0.4)'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(150,150,150,0.4)'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#ccc'
					}
				}
			},
			yAxis: {
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(150,150,150,0.4)'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(150,150,150,0.4)'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#ccc'
					}
				}
			},
			grid: {
				bottom: '15%',
				top: '5%',
				right: '10%',
				left: '10%',
				show: true,
				borderColor: 'rgba(150,150,150,0.4)'
			},
			series: {
				type: 'line',
				showSymbol: true,
				data: [],
				itemStyle: {
					normal: {
						color: 'rgba(250,250,250,0.6)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(255, 158, 68, .5)'
						}, {
							offset: 1,
							color: 'rgba(255, 70, 131, .5)'
						}])
					}
				}
			}
		},
		barChartCfg: {
			animation: false,
			grid: {
				top: '5%'
			},
			xAxis: {
				type : 'category',
				axisLabel: {
					textStyle: {
						color: '#ccc'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			yAxis: {
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#ccc'
					}
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(150,150,150,0.4)'
					}
				}
			},
			series: [
				{
					type: 'bar',
					itemStyle: {
						normal: {color: 'rgba(150,150,150,0.4)'}
					},
					barGap:'-100%',
					barCategoryGap:'40%',
					animation: false
				},
				{
					type: 'bar',
					itemStyle: {
						normal: {
							color: '#1bb8fb'
						}
					}
				}
			]
		}
	}
})(window);
