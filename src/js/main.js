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
		var $toShowMaster = $('.master-item.' + id);
		$('#branch_wrap, .branch').hide();
		$('#master_wrap').show();
		$('.master-item').hide().removeClass('restore');
		$toShowMaster.show();
		setTimeout(function() {
			$toShowMaster.addClass('restore');
		}, 50);
	};
	// 分支切换
	var showBranch = function(id) {
		$('#master_wrap, .master-item').hide().removeClass('restore');
		$('#branch_wrap').show();
		$('.branch').hide();
		$('.branch.' + id).show();
	};
	// setTimeout句柄，用于取消timeOut任务
	var startTimeCount;
	// 重新开始
	var restart = function() {
		var startPage = $('.page-wrap.start');
		$('.page-wrap').hide();
		$('#master_wrap, .master-item').hide().removeClass('restore');
		$('#branch_wrap, .branch').hide();
		$('.page-wrap.start .start-text p').removeClass('show');
		startPage.show();
		setTimeout(function() {
			startPage.addClass('restore');
			delayShowText(0);
		});
		var delayShowText = function(index) {
			$('.page-wrap.start .start-text p:nth-child(' + (index + 1) + ')').addClass('show');
			if (++ index < 5) {
				startTimeCount = setTimeout(function() {
					delayShowText(index);
				}, 1200);
			}
		};
	};
	// 失败
	var toFail = function() {
		$('.page-wrap').hide();
		$('#master_wrap, .master-item').hide().removeClass('restore');
		$('#branch_wrap, .branch').hide();
		$('.page-wrap.fail').show();
	};
	// 表单提示
	var showFormError = function(text) {
		var info = $('.page-wrap.form .info');
		info.nodeList[0].innerText = text;
		info.show();
		setTimeout(function() {
			info.hide();
		}, 2000);
	};

/********************************事件绑定********************************/
	// 开始、失败、通关等界面事件绑定
	$('.page-wrap.start .btn').bind('click', function() {
		$('.page-wrap').hide();
		$('.page-wrap.start').removeClass('restore');
		clearTimeout(startTimeCount);
		showMaster('a');
	});
	$('.page-wrap.success .btn').bind('click', function() {
		$('.page-wrap.success').hide();
		$('.page-wrap.award').show();
	});
	$('.page-wrap.award .btn').bind('click', function() {
		$('.page-wrap.award').hide();
		$('.page-wrap.form').show();
	});
	$('.page-wrap.form form').bind('submit', function(e) {
		var name = document.querySelector('.page-wrap.form .form-input[name="name"]').value;
		var tel = document.querySelector('.page-wrap.form .form-input[name="tel"]').value;
		var job = document.querySelector('.page-wrap.form .form-input[name="job"]').value;
		if (!name || !tel || !job) {
			showFormError('请把信息填写完整');
		}
		else {
			uploadUserInfo(name, tel, job, function() {
				$('.page-wrap.form').hide();
				$('.page-wrap.end').show();
				$('.music-wrap').hide();
			});
		}
		e.preventDefault();
		return false;
	});
	$('.page-wrap.fail .btn').bind('click', function() {
		restart();
	});

	// 点击广告链接
	$('.master-item.a .btn.right span').bind('click', function(e) {
		showBranch('a');
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	$('.master-item.b .btn.right span').bind('click', function(e) {
		showBranch('b');
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	$('.master-item.c .btn.right span').bind('click', function(e) {
		showBranch('c');
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	$('.master-item.d .btn.right span').bind('click', function(e) {
		showBranch('d');
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	$('.master-item.e .btn.right span').bind('click', function(e) {
		showBranch('e');
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	$('.master-item.f .btn.right span').bind('click', function(e) {
		showBranch('f');
		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	// 点击错误答案
	$('.btn.choice.wrong').bind('click', function() {
		toFail();
	});

	// 主分支中点击正确选项或广告分支中点击下一题继续
	$('.branch.a .btn, .master-item.a .btn.right').bind('click', function() {
		showMaster('b');
	});
	$('.branch.b .btn, .master-item.b .btn.right').bind('click', function() {
		showMaster('c');
	});
	$('.branch.c .btn, .master-item.c .btn.right').bind('click', function() {
		showMaster('d');
	});
	$('.branch.d .btn, .master-item.d .btn.right').bind('click', function() {
		showMaster('e');
	});
	$('.branch.e .btn, .master-item.e .btn.right').bind('click', function() {
		showMaster('f');
	});
	$('.branch.f .btn, .master-item.f .btn.right').bind('click', function() {
		$('#master_wrap').hide();
		$('#branch_wrap').hide();
		$('.page-wrap.success').show();
	});

/********************************图片加载********************************/
	// xhr加载图片
	var loadImg = function(imgFile, onComplete) {
		var imgUrl = 'build/image/' + imgFile;
		var xmlHTTP = new XMLHttpRequest();
		xmlHTTP.open('GET', imgUrl, true);
		xmlHTTP.responseType = 'arraybuffer';
		xmlHTTP.onload = function(e) {
			var blob = new Blob([this.response]);
			var url = window.URL.createObjectURL(blob);
			onComplete && onComplete(url);
		};
		xmlHTTP.send();
	};
	// 加载数字序号图
	var loadImgOrder = function(imgNum, place) {
		loadImg('test_num_' + imgNum + '.png', function(url) {
			if (typeof place === 'string') {
				place = [place];
			}
			for (var i = 0; i < place.length; i ++) {
				var node = document.querySelector('.master-item.' + place[i] + ' .board-title-bg');
				node.style.backgroundImage = 'url(' + url + ')';
			}
		});
	};
	// 加载题目面板背景图
	var loadImgBoard = function(imgNum, place) {
		loadImg('test_ques_bg_' + imgNum + '.png', function(url) {
			document.querySelector('.master-item.' + place + ' .board-wrap').style.backgroundImage = 'url(' + url + ')';
		});
	};
	// 加载题目页背景图
	var loadImgBg = function(imgNum, place, callback) {
		loadImg('test_bg_' + imgNum + '.png', function(url) {
			document.querySelector('.master-item.' + place).style.backgroundImage = 'url(' + url + ')';
			callback && callback();
		});
	};
	// 加载广告分支主题图
	var loadImgAd = function(imgNum, place, callback) {
		loadImg('poster_bg_' + imgNum + '.png', function(url) {
			document.querySelector('.branch.' + place + ' .branch-bg').setAttribute('src', url);
			callback && callback();
		});
	};
	// 加载一组图片
	var loadImgGroup = function(imgNum, place, callback) {
		loadImgOrder(imgNum, place);
		loadImgBoard(imgNum, place);
		loadImgBg(imgNum, place, function() {
			loadImgAd(imgNum, place, function() {
				callback && callback();
			});
		});
	};
	// 查找元素并设置背景图
	var setBgStyle = function(selector, url) {
		document.querySelector(selector).style.backgroundImage = 'url(' + url + ')';
	};

	// 预加载
	var preloadImage = function() {

		// 第一题
		loadImgOrder('one', ['a', 'f']);
		loadImgBoard('one', 'a');
		loadImgBg('one', 'a', function() {
			// 闯关失败
			loadImg('failed_bg.gif', function(url) {
				setBgStyle('.page-wrap.fail', url);
			});
			// 第一个广告
			loadImgAd('one', 'a', function() {
				// 二三四五题及广告
				loadImgGroup('two', 'b', function() {
					loadImgGroup('three', 'c', function() {
						loadImgGroup('four', 'd', function() {
							loadImgGroup('five', 'e', function() {
								// 第六题
								loadImgBoard('six', 'f');
								loadImgBg('six', 'f');
								loadImgAd('six', 'f', function() {
									// 闯关成功
									loadImg('pass_bg.png', function(url) {
										setBgStyle('.page-wrap.success', url);
										// 奖品
										loadImg('reward_bg_reward.png', function(url) {
											setBgStyle('.page-wrap.award', url);
											// 个人信息、结尾页背景
											loadImg('reward_bg_two.png', function(url) {
												setBgStyle('.page-wrap.form', url);
												setBgStyle('.page-wrap.end', url);
												// 结尾页
												loadImg('reward_icon_share.png', function(url) {
													setBgStyle('.page-wrap.end .end-share-icon', url);
												});
												loadImg('reward_erweima.png', function(url) {
													document.querySelector('.page-wrap.end .end-nav-pic img').setAttribute('src', url);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	};

/********************************音乐播放********************************/
	var switchMusicIconToOn = function(audio) {
		$('.music-wrap .music-btn.off').removeClass('show');
		$('.music-wrap .music-btn.on').addClass('show');
	};
	var switchMusicIconToOff = function(audio) {
		$('.music-wrap .music-btn.on').removeClass('show');
		$('.music-wrap .music-btn.off').addClass('show');
	};
	var playMusic = function() {
		var audio = new Audio('build/sound/bgm.mp3');
		audio.loop = true;
		$('.music-wrap .music-btn.on').bind('click', function() {
			switchMusicIconToOff();
			audio.pause();
		});
		$('.music-wrap .music-btn.off').bind('click', function(e) {
			switchMusicIconToOn();
			audio.play();
		});
		audio.addEventListener('play', function() {
			switchMusicIconToOn();
		});
		document.addEventListener('WeixinJSBridgeReady', function() {
			audio.play();
		}, false);
	};

/********************************上传用户信息********************************/
	var uploadUserInfo = function(name, tel, job, callback) {
		var url = 'http://nian.prod.deansel.com/nian/User/AddUserInfo2';
		var data = new FormData();
		var xhr = new XMLHttpRequest();
		data.append('name', name);
		data.append('phone', tel);
		data.append('profession', job);
		xhr.open('post', url, true);
		xhr.send(data);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					callback();
				}
			}
		};
		xhr.onerror = function() {
			showFormError('Sorry, net error');
		};
	};

restart();
preloadImage();
playMusic();
