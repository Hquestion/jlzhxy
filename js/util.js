/**
 * Created by 贺小雷 on 2017-09-07.
 */
(function(g){
	var DAY_ZH_MAP = ['一', '二', '三', '四', '五', '六', '日'];
	g.ZHJL_UTIL = {
		getZsByNum: function(num){
			var yu = Math.ceil(num / 10);
			return yu * 10;
		},
		/**
		 * 获取当前时间，一秒钟刷新一次
		 * @returns {string}
		 */
		getTime: function(){
			var time = new Date();
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();
			var hour = time.getHours();
			hour = hour < 10 ? ('0' + hour) : hour;
			var minute = time.getMinutes();
			minute = minute < 10 ? ('0' + minute) : minute;
			var second = time.getSeconds();
			second = second < 10 ? ('0' + second) : second;
			var day = time.getDay();
			return year + '年' + month + '月'+ date + '日 ' + hour + ':' + minute + ':' + second + ' 星期' + DAY_ZH_MAP[day - 1];
		},
		pluck: function(list, key){
			var res = [];
			for(var i = 0; i < list.length; i++) {
				res.push(list[i][key]);
			}
			return res;
		},
		getMaxFromObjList: function(list, key){
			var numList = this.pluck(list, key);
			return Math.max.apply(this, numList);
		}
	};
})(window);