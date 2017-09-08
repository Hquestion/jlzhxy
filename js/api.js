/**
 * Created by 贺小雷 on 2017-09-07.
 */
(function(g){
	// var url = 'http://192.168.1.177:2123/Ajax/reportform.ashx';
	var url = 'http://wx.jlms.cn/report/Ajax/reportform.ashx';
	g.ZHJL_API = {
		getWXAccessLog: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getWxVisLog'
			}, scb, fcb);
		},
		getWebAccessLog: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getWebVisLog'
			}, scb, fcb);
		},
		getGradeAvgLog: function(data, scb, fcb){
			return $.get(url, {
				storename: 'Proc_getGradSubjectScHis',
				GradeNum: data.gradeNum,
				SubjectName: data.subjectName
			}, scb, fcb);
		},
		getBankResource: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getResourcesByCode',
				rescode: '001'
			}, scb, fcb);
		},
		getErrorResource: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getResourcesByCode',
				rescode: '002'
			}, scb, fcb);
		},
		getFileResource: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getResourcesByCode',
				rescode: '003'
			}, scb, fcb);
		},
		getBigDataResource: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getResourcesByCode',
				rescode: '004'
			}, scb, fcb);
		},
		getWxBindCount: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getWxBindUser'
			}, scb, fcb);
		},
		getWxWeekAccessCount: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getWxVisLogWeek'
			}, scb, fcb);
		},
		getPlatformTotalAccessCount: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getUserLogin'
			}, scb, fcb);
		},
		getPlatformMonthAccessCount: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getUserLoginMonth'
			}, scb, fcb);
		},
		getPlatformWeekAccessCount: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getUserLoginWeek'
			}, scb, fcb);
		},
		getPlatformDayAccessCount: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getUserLoginDay'
			}, scb, fcb);
		},
		getSubjectGradeList: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getGradeSubject'
			}, scb, fcb);
		},
		getStudyDataCollectSubject: function(data, scb, fcb){
			return $.get(url, {
				storename: 'Proc_getStudyDataCollectSubject',
				gradenum: data.gradeNum
			}, scb, fcb);
		},
		getStudyDataCollectTeacher: function(scb, fcb){
			return $.get(url, {
				storename: 'Proc_getStudyDataCollectTeacher'
			}, scb, fcb);
		},
		getClassExamOrder: function(data, scb, fcb){
			return $.get(url, {
				storename: 'Proc_getClassExam',
				gradenum: data.gradeNum,
				subjectname: data.subjectName
			}, scb, fcb);
		}
	};
})(window);