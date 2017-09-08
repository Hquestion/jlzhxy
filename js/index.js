/**
 * Created by 贺小雷 on 2017-09-06.
 */
(function(){
	var $time = document.querySelector('#time');
	/**
	 * 绘制时间
	 */
	function drawTime(){
		var time = ZHJL_UTIL.getTime();
		$time.innerText = time;
	}

	function getBankData(){
		ZHJL_API.getBankResource(function(res){
			var data = JSON.parse(res);
			var monthCount = data[0]['MONTHCOUNT'] || 0;
			$('#s-bank-count').text(data[0]['RESOURCESCOUNT'] || 0);
			$('#bank-raise-count').text(monthCount);
			if(monthCount > 0 ) {
				$('.s-bank').find('.up-icon').removeClass('hide');
			}
		});
	}
	function getFileData(){
		ZHJL_API.getFileResource(function(res){
			var data = JSON.parse(res);
			var monthCount = data[0]['MONTHCOUNT'] || 0;
			$('#s-file-count').text(data[0]['RESOURCESCOUNT'] || 0);
			$('#file-raise-count').text(data[0]['MONTHCOUNT'] || 0);
			if(monthCount > 0 ) {
				$('.s-file').find('.up-icon').removeClass('hide');
			}
		});
	}
	function getErrorData(){
		ZHJL_API.getErrorResource(function(res){
			var data = JSON.parse(res);
			var monthCount = data[0]['MONTHCOUNT'] || 0;
			$('#s-error-count').text(data[0]['RESOURCESCOUNT'] || 0);
			$('#error-raise-count').text(data[0]['MONTHCOUNT'] || 0);
			if(monthCount > 0 ) {
				$('.s-error').find('.up-icon').removeClass('hide');
			}
		});
	}

	function getBigDataSample(){
		ZHJL_API.getBigDataResource(function(res){
			var data = JSON.parse(res);
			$('#sample-count').text(data[0]['RESOURCESCOUNT'] || 0);
			$('#sample-raise').html('<span class="up-num">' + (data[0]['MONTHCOUNT'] || 0) + '</span><span><img class="up-icon" src="../img/up-s.png"></span>' );
		});
	}

	function getWxBindCount(){
		ZHJL_API.getWxBindCount(function(res){
			var data = JSON.parse(res);
			var count = data[0].BINDCOUNT;
			$('#wxbind-count').text(count);
		});
	}

	function getWxWeekAccessCount(){
		ZHJL_API.getWxWeekAccessCount(function(res){
			var data = JSON.parse(res);
			var count = data[0].WEEKCOUNT;
			$('#wxaccess-count').text(count);
		});
	}

	function getPlatformAccessTotal(){
		ZHJL_API.getPlatformDayAccessCount(function(dres){
			var ddata = JSON.parse(dres);
			var dcount = (ddata[0].USERSDAYCOUNT || 0);
			$('#access-raise span').text(dcount);
			$('#access-raise-m span').text(dcount);
			$('#access-raise-w span').text(dcount);
			ZHJL_API.getPlatformTotalAccessCount(function(res){
				var data = JSON.parse(res);
				var count = (data[0].USERCOUNT || 0) + '';
				renderPlatformAccessCount(count, $('#access-count-t'));
				ZHJL_API.getPlatformMonthAccessCount(function(res){
					var data = JSON.parse(res);
					var count = (data[0].USERMONTHCOUNT || 0) + '';
					renderPlatformAccessCount(count, $('#access-count-m'));
					ZHJL_API.getPlatformWeekAccessCount(function(res){
						var data = JSON.parse(res);
						var count = (data[0].USERWEEKCOUNT || 0) + '';
						renderPlatformAccessCount(count, $('#access-count-w'));
						initSwiper();
					});
				});
			});
		});
	}

	/**
	 * 初始化轮播效果
	 */
	function initSwiper(selector){
		if($('.access-count .swiper-container').get(0).swiper) {
			$('.access-count .swiper-container').get(0).swiper.destroy();
		}
		var accessSwiper = new Swiper('.access-count .swiper-container', {
			loop: false,
			autoplay: ZHJL_CONFIG.autoplayInterval,
			effect: ZHJL_CONFIG.swiperEffect,
			autoplayDisableOnInteraction: false,
			fade: {
				crossFade: true
			}
		});
	}

	function renderPlatformAccessCount(count, $container){
		var list = count.split('');
		$container.empty();
		for(var i = 0; i < list.length; i++) {
			$('<span class="access-count-num yellow"></span>').text(list[i]).appendTo($container);
		}
	}

	function getSubjectGradeList(){
		ZHJL_API.getSubjectGradeList(function(res){
			var list = JSON.parse(res);
			//根据年级学科列表初始化年级学科日志
			var gradeList = [];
			for(var i = 0; i < list.length; i++) {
				var gradeNum = list[i].GRADENUM;
				if(gradeList.indexOf(gradeNum) < 0) {
					gradeList.push(gradeNum)
				}
			}
			getGradeExamLog(list);
			getGradeSampleLog(gradeList);
			getClassExamOrder(list);
		});
	}

	function getGradeExamLog(list){
		var finishCount = 0;
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var $template = $('<div class="swiper-slide"><div class="chart-title">各个年级考试均分曲线</div>' +
				'<div class="chart-belong"><span class="grade-name"></span><span class="subject-name"></span></div>' +
				'<div class="avg-chart-container"></div></div>');
			$template.find('.grade-name').text(ZHJL_CONFIG.gradeNoMap[item.GRADENUM]);
			$template.find('.subject-name').text(item.SUBJECTNAME);
			(function(data, $node){
				var $chartBox = $node.find('.avg-chart-container');
				ZHJL_API.getGradeAvgLog({
					gradeNum: data.GRADENUM,
					subjectName: data.SUBJECTNAME
				}, function(res){
					finishCount++;
					var data = JSON.parse(res);
					if(data.length > 0) {
						var opt = JSON.parse(JSON.stringify(ZHJL_CONFIG.lineChartCfg));
						var xAxisData = [], value = [];
						var max = ZHJL_UTIL.getZsByNum(ZHJL_UTIL.getMaxFromObjList(data, 'AVERSCORE'));
						for(var i = 0; i < data.length; i++) {
							xAxisData.push(data[i]['EXAMTIME']);
							value.push(data[i]['AVERSCORE']);
						}
						opt.xAxis.data = xAxisData;
						opt.series.data = value;
						opt.series.symbolSize = 15;
						opt.series.symbol = 'circle';
						opt.series.itemStyle = {
							normal: {
								color: '#1bb8fb'
							}
						};
						delete opt.series.areaStyle;
						$chartBox.chartMeta = {
							option: opt,
							data: data
						};
						var chart = echarts.init($chartBox.get(0));
						$chartBox.chartObj = chart;
						chart.setOption(opt);
						$(window).on('resize', function(){
							setTimeout(function(){
								chart.resize()
							}, 100);
						});
					}else {
						$('<div class="no-data">暂无数据</div>').appendTo($chartBox);
					}
					if(finishCount === list.length) {
						if($('.avg-chart .swiper-container').get(0).swiper) {
							$('.avg-chart .swiper-container').get(0).swiper.destroy();
						}
						new Swiper('.avg-chart .swiper-container', {
							loop: false,
							autoplay: ZHJL_CONFIG.autoplayInterval,
							effect: ZHJL_CONFIG.swiperEffect,
							autoplayDisableOnInteraction: false,
							fade: {
								crossFade: true
							}
						});
					}
				}, function(){
					finishCount++;
					$('<div class="no-data">暂无数据</div>').appendTo($chartBox);
					if(finishCount === list.length) {
						if($('.avg-chart .swiper-container').get(0).swiper) {
							$('.avg-chart .swiper-container').get(0).swiper.destroy();
						}
						new Swiper('.avg-chart .swiper-container', {
							loop: false,
							autoplay: ZHJL_CONFIG.autoplayInterval,
							effect: ZHJL_CONFIG.swiperEffect,
							autoplayDisableOnInteraction: false,
							fade: {
								crossFade: true
							}
						});
					}
				});
			})(item, $template);
			$template.appendTo($('.avg-chart .swiper-wrapper'));
		}
	}

	function getGradeSampleLog(gradeList){
		var $container = $('.sample-chart .swiper-container');
		var finishCount = 0;
		$container.find('.swiper-wrapper').empty();
		for(var i = 0; i < gradeList.length; i++) {
			var $template = $('<div class="swiper-slide"><div class="chart-title">各学科大数据采样次数柱状图</div>' +
				'<div class="chart-belong"><span class="grade-name"></span></div>' +
				'<div class="sample-chart-container"></div></div>');
			var grade = gradeList[i];
			$template.find('.grade-name').text(ZHJL_CONFIG.gradeNoMap[grade]);
			$template.appendTo($('.sample-chart .swiper-wrapper'));
			(function(g, $node){
				ZHJL_API.getStudyDataCollectSubject({
					gradeNum: g
				}, function(res){
					finishCount++;
					var data = JSON.parse(res);
					var opt = JSON.parse(JSON.stringify(ZHJL_CONFIG.barChartCfg));
					var dataShadow = [], xAxisData = [], value = [];
					var max = ZHJL_UTIL.getZsByNum(ZHJL_UTIL.getMaxFromObjList(data, 'COLLECTTTIMES'));
					for(var i = 0; i < data.length; i++) {
						dataShadow.push(max);
						xAxisData.push(data[i]['SUBJECTNAME']);
						value.push(data[i]['COLLECTTTIMES']);
					}
					opt.xAxis.data = xAxisData;
					opt.series[0].data = dataShadow;
					opt.series[1].data = value;
					var $el = $node.find('.sample-chart-container');
					$el.chartMeta = {
						option: opt,
						data: data
					};
					var chart = echarts.init($el.get(0));
					$el.chartObj = chart;
					chart.setOption(opt);
					$(window).on('resize', function(){
						setTimeout(function(){
							chart.resize()
						}, 100);
					});
					if(finishCount === gradeList.length) {
						if($container.get(0).swiper) {
							$container.get(0).swiper.destroy();
						}
						new Swiper('.sample-chart .swiper-container', {
							loop: false,
							autoplay: ZHJL_CONFIG.autoplayInterval,
							effect: ZHJL_CONFIG.swiperEffect,
							autoplayDisableOnInteraction: false,
							fade: {
								crossFade: true
							}
						});
					}
				}, function(){
					finishCount++;
					if(finishCount === gradeList.length) {
						if($container.get(0).swiper) {
							$container.get(0).swiper.destroy();
						}
						new Swiper('.sample-chart .swiper-container', {
							loop: false,
							autoplay: ZHJL_CONFIG.autoplayInterval,
							effect: ZHJL_CONFIG.swiperEffect,
							autoplayDisableOnInteraction: false,
							fade: {
								crossFade: true
							}
						});
					}
				});
			})(grade, $template)
		}
	}

	function getClassExamOrder(list){
		var $container = $('#class-exam-loop .swiper-container');
		var finishCount = 0;
		$container.find('.swiper-wrapper').empty();
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var $template = $('<div class="swiper-slide"><div class="grade-sbj"></div><div class="yellow">考试班级排名</div><ul class="class-sort"></ul></div>');
			var $gradeSbj = $template.find('.grade-sbj');
			if(+item.GRADENUM < 7) {
				$gradeSbj.text(ZHJL_CONFIG.gradeNoMap[item.GRADENUM] + item.SUBJECTNAME);
			}else {
				$gradeSbj.text(ZHJL_CONFIG.gradeNoMap[item.GRADENUM] + '年级' + item.SUBJECTNAME);
			}
			$template.appendTo($container.find('.swiper-wrapper'));
			(function(data, $node){
				var $block = $node.find('ul.class-sort');
				ZHJL_API.getClassExamOrder({
					gradeNum: data.GRADENUM,
					subjectName: data.SUBJECTNAME
				}, function(res){
					var data = JSON.parse(res);
					finishCount += 1;
					if(data.length > 0) {
						for(var j = 0; j < data.length; j++) {
							var oItem = data[j];
							var $order = $('<li class="order-sort"><div class="sort-code"></div><div class="class-name"></div></li>');
							if(j >= 3) {
								$order.find('.sort-code').addClass('opacity');
							}
							$order.find('.sort-code').text(oItem.SORTCODE);
							$order.find('.class-name').text(oItem.CLASSNAME);
							$order.appendTo($block);
						}
					}else {
						$('<div class="no-data">暂无数据</div>').appendTo($block);
					}
					if(finishCount === list.length) {
						if($container.get(0).swiper) {
							$container.get(0).swiper.destroy();
						}
						new Swiper('#class-exam-loop .swiper-container', {
							loop: false,
							autoplay: ZHJL_CONFIG.autoplayInterval,
							effect: ZHJL_CONFIG.swiperEffect,
							autoplayDisableOnInteraction: false,
							fade: {
								crossFade: true
							}
						});
					}
				}, function(){
					finishCount += 1;
					$('<div class="no-data">暂无数据</div>').appendTo($block);
					if(finishCount === list.length) {
						if($container.get(0).swiper) {
							$container.get(0).swiper.destroy();
						}
						new Swiper('#class-exam-loop .swiper-container', {
							loop: false,
							autoplay: ZHJL_CONFIG.autoplayInterval,
							effect: ZHJL_CONFIG.swiperEffect,
							autoplayDisableOnInteraction: false,
							fade: {
								crossFade: true
							}
						});
					}
				});
			})(item, $template);
		}
	}

	function getDataCollectionSort(){
		ZHJL_API.getStudyDataCollectTeacher(function(res){
			var data = JSON.parse(res);
			var $block = $('#teacher-sort');
			$block.empty();
			for(var i = 0; i < data.length; i++) {
				var oItem = data[i];
				var $order = $('<li class="order-sort"><div class="sort-code"></div><div class="grade-sbj"></div><div class="teachername"></div></li>');
				if(i >= 3) {
					$order.find('.sort-code').addClass('opacity');
				}
				$order.find('.sort-code').text(i + 1);
				$order.find('.grade-sbj').text(ZHJL_CONFIG.gradeNoMap[oItem.GRADENUM] + oItem.SUBJECTNAME);
				$order.find('.teachername').text(oItem.TEACHERTNAME);
				$order.appendTo($block);
			}
		});
	}

	/**
	 * 获取图表数据
	 * 微信访问量
	 */
	function getWxAccessLog(){
		ZHJL_API.getWXAccessLog(function(res){
			var data = JSON.parse(res);
			var opt = JSON.parse(JSON.stringify(ZHJL_CONFIG.barChartCfg));
			var dataShadow = [], xAxisData = [], value = [];
			var max = ZHJL_UTIL.getZsByNum(ZHJL_UTIL.getMaxFromObjList(data, 'VNUMS'));
			for(var i = 0; i < data.length; i++) {
				dataShadow.push(max);
				xAxisData.push(data[i]['DAY']);
				value.push(data[i]['VNUMS']);
			}
			opt.xAxis.data = xAxisData;
			opt.series[0].data = dataShadow;
			opt.series[1].data = value;
			var $el = $('#wx-access-chart');
			$el.chartMeta = {
				option: opt,
				data: data
			};
			var chart = echarts.init($el.get(0));
			chart.setOption(opt);
			$(window).on('resize', function(){
				setTimeout(function(){
					chart.resize()
				}, 100);
			});
		});
	}

	/**
	 * 绘制智慧校园平台访问量日志
	 */
	function getWebAccessLog(){
		ZHJL_API.getWebAccessLog(function(res){
			var data = JSON.parse(res);
			var opt = JSON.parse(JSON.stringify(ZHJL_CONFIG.lineChartCfg));
			var xAxisData = [], value = [];
			var max = ZHJL_UTIL.getZsByNum(ZHJL_UTIL.getMaxFromObjList(data, 'VNUMS'));
			for(var i = 0; i < data.length; i++) {
				xAxisData.push(data[i]['DAY']);
				value.push(data[i]['VNUMS']);
			}
			opt.xAxis.data = xAxisData;
			opt.series.data = value;
			opt.series.smooth = true;
			opt.series.	symbol =  'none';
			opt.series.	sampling = 'average';
			var $el = $('#access-chart .access-chart-container');
			$el.chartMeta = {
				option: opt,
				data: data
			};
			var chart = echarts.init($el.get(0));
			chart.setOption(opt);
			$(window).on('resize', function(){
				setTimeout(function(){
					chart.resize()
				}, 100);
			});
		});
	}

	/**
	 * 页面初始化方法
	 */
	function init(){
		drawTime();
		getBankData();
		getFileData();
		getErrorData();
		getBigDataSample();
		getWxBindCount();
		getWxWeekAccessCount();
		getPlatformAccessTotal();
		getWxAccessLog();
		getWebAccessLog();
		getSubjectGradeList();
		getDataCollectionSort();
		setInterval(drawTime, 1000);
	}
	init();
	//启动心跳
	setInterval(function(){
		drawTime();
		getBankData();
		getFileData();
		getErrorData();
		getBigDataSample();
		getWxBindCount();
		getWxWeekAccessCount();
		getPlatformAccessTotal();
		getWxAccessLog();
		getWebAccessLog();
		getDataCollectionSort();
		getSubjectGradeList();
	}, ZHJL_CONFIG.heartbeat);
})();