/********************************$封装********************************/
	var _$ = function(selector) {
		this.nodeList = document.querySelectorAll(selector);
	};
	_$.prototype.hide = function(selector) {
		var nodeList = this.nodeList;
		for (var i = 0; i < nodeList.length; i ++) {
			nodeList[i].style.display = 'none';
		}
		return this;
	};
	_$.prototype.show = function(selector) {
		var nodeList = this.nodeList;
		for (var i = 0; i < nodeList.length; i ++) {
			nodeList[i].style.display = 'block';
		}
		return this;
	};
	_$.prototype.removeClass = function(className) {
		var nodeList = this.nodeList;
		for (var i = 0; i < nodeList.length; i ++) {
			nodeList[i].classList.remove(className);
		}
		return this;
	};
	_$.prototype.addClass = function(className) {
		var nodeList = this.nodeList;
		for (var i = 0; i < nodeList.length; i ++) {
			nodeList[i].classList.add(className);
		}
		return this;
	};
	_$.prototype.bind = function(eventName, callback) {
		var nodeList = this.nodeList;
		for (var i = 0; i < nodeList.length; i ++) {
			nodeList[i].addEventListener(eventName, function(e) {
				callback(e);
			});
		}
		return this;
	};
	var $ = function(selector) {
		return new _$(selector);
	};

/********************************视图切换********************************/
	// 主界面切换
	var showMaster = function(id) {
		$('#branch_wrap, .branch').hide();
		$('#master_wrap').show();
		$('.master-item').hide().removeClass('restore');
		$('.master-item.' + id).show().addClass('restore');
	};
	// 分支切换
	var showBranch = function(id) {
		$('#master_wrap, .master-item').hide().removeClass('restore');
		$('#branch_wrap').show();
		$('.branch').hide();
		$('.branch.' + id).show();
	};
	// 重新开始
	var restart = function() {
		$('.page-wrap').hide();
		$('#master_wrap, .master-item').hide().removeClass('restore');
		$('#branch_wrap, .branch').hide();
		$('.page-wrap.start').show();
	};
	// 失败
	var toFail = function() {
		$('.page-wrap').hide();
		$('#master_wrap, .master-item').hide().removeClass('restore');
		$('#branch_wrap, .branch').hide();
		$('.page-wrap.fail').show();
	};

restart();

/********************************事件绑定********************************/
	// 开始、失败、通关等界面事件绑定
	$('.page-wrap.start .btn').bind('click', function() {
		$('.page-wrap').hide();
		showMaster('a');
	});
	$('.page-wrap.success .btn').bind('click', function() {
		$('.page-wrap.success').hide();
		$('.page-wrap.form').show();
	});
	$('.page-wrap.form form').bind('submit', function(e) {
		$('.page-wrap.form').hide();
		$('.page-wrap.end').show();
		e.preventDefault();
		return false;
	});
	$('.page-wrap.fail .btn').bind('click', function() {
		restart();
	});

	// 点击正确答案
	$('.master-item.a .btn.a').bind('click', function() {
		showBranch('a');
	});
	$('.master-item.b .btn.a').bind('click', function() {
		showBranch('b');
	});
	$('.master-item.c .btn.a').bind('click', function() {
		showBranch('c');
	});
	$('.master-item.d .btn.a').bind('click', function() {
		showBranch('d');
	});
	$('.master-item.e .btn.a').bind('click', function() {
		showBranch('e');
	});
	$('.master-item.f .btn.a').bind('click', function() {
		showBranch('f');
	});

	// 点击错误答案
	$('.master-item .btn.b, .master-item .btn.c').bind('click', function() {
		toFail();
	});

	// 广告分支中点击下一题继续
	$('.branch.a .btn').bind('click', function() {
		showMaster('b');
	});
	$('.branch.b .btn').bind('click', function() {
		showMaster('c');
	});
	$('.branch.c .btn').bind('click', function() {
		showMaster('d');
	});
	$('.branch.d .btn').bind('click', function() {
		showMaster('e');
	});
	$('.branch.e .btn').bind('click', function() {
		showMaster('f');
	});
	$('.branch.f .btn').bind('click', function() {
		$('#branch_wrap').hide();
		$('.page-wrap.success').show();
	});

