var _$=function(t){this.nodeList=document.querySelectorAll(t)};_$.prototype.hide=function(t){for(var e=this.nodeList,n=0;n<e.length;n++)e[n].style.display="none";return this},_$.prototype.show=function(t){for(var e=this.nodeList,n=0;n<e.length;n++)e[n].style.display="block";return this},_$.prototype.removeClass=function(t){for(var e=this.nodeList,n=0;n<e.length;n++)e[n].classList.remove(t);return this},_$.prototype.addClass=function(t){for(var e=this.nodeList,n=0;n<e.length;n++)e[n].classList.add(t);return this},_$.prototype.bind=function(t,e){for(var n=this.nodeList,r=0;r<n.length;r++)n[r].addEventListener(t,function(t){e(t)});return this};var startTimeCount,$=function(t){return new _$(t)},showMaster=function(t){var e=$(".master-item."+t);$("#branch_wrap, .branch").hide(),$("#master_wrap").show(),$(".master-item").hide().removeClass("restore"),e.show(),setTimeout(function(){e.addClass("restore")},50)},showBranch=function(t){$("#master_wrap, .master-item").hide().removeClass("restore"),$("#branch_wrap").show(),$(".branch").hide(),$(".branch."+t).show()},restart=function(){var t=$(".page-wrap.start");$(".page-wrap").hide(),$("#master_wrap, .master-item").hide().removeClass("restore"),$("#branch_wrap, .branch").hide(),$(".page-wrap.start .start-text p").removeClass("show"),t.show(),setTimeout(function(){t.addClass("restore"),e(0)});var e=function(t){$(".page-wrap.start .start-text p:nth-child("+(t+1)+")").addClass("show"),++t<5&&(startTimeCount=setTimeout(function(){e(t)},1200))}},toFail=function(){$(".page-wrap").hide(),$("#master_wrap, .master-item").hide().removeClass("restore"),$("#branch_wrap, .branch").hide(),$(".page-wrap.fail").show()},showFormError=function(){var t=$(".page-wrap.form .info");t.show(),setTimeout(function(){t.hide()},2e3)};$(".page-wrap.start .btn").bind("click",function(){$(".page-wrap").hide(),$(".page-wrap.start").removeClass("restore"),clearTimeout(startTimeCount),showMaster("a")}),$(".page-wrap.success .btn").bind("click",function(){$(".page-wrap.success").hide(),$(".page-wrap.award").show()}),$(".page-wrap.award .btn").bind("click",function(){$(".page-wrap.award").hide(),$(".page-wrap.form").show()}),$(".page-wrap.form form").bind("submit",function(t){var e=document.querySelector('.page-wrap.form .form-input[name="name"]').value,n=document.querySelector('.page-wrap.form .form-input[name="tel"]').value,r=document.querySelector('.page-wrap.form .form-input[name="job"]').value;return e&&n&&r?($(".page-wrap.form").hide(),$(".page-wrap.end").show(),$(".music-wrap").hide()):showFormError(),t.preventDefault(),!1}),$(".page-wrap.fail .btn").bind("click",function(){restart()}),$(".master-item.a .btn.right span").bind("click",function(t){return showBranch("a"),t.preventDefault(),t.stopPropagation(),!1}),$(".master-item.b .btn.right span").bind("click",function(t){return showBranch("b"),t.preventDefault(),t.stopPropagation(),!1}),$(".master-item.c .btn.right span").bind("click",function(t){return showBranch("c"),t.preventDefault(),t.stopPropagation(),!1}),$(".master-item.d .btn.right span").bind("click",function(t){return showBranch("d"),t.preventDefault(),t.stopPropagation(),!1}),$(".master-item.e .btn.right span").bind("click",function(t){return showBranch("e"),t.preventDefault(),t.stopPropagation(),!1}),$(".master-item.f .btn.right span").bind("click",function(t){return showBranch("f"),t.preventDefault(),t.stopPropagation(),!1}),$(".btn.choice.wrong").bind("click",function(){toFail()}),$(".branch.a .btn, .master-item.a .btn.right").bind("click",function(){showMaster("b")}),$(".branch.b .btn, .master-item.b .btn.right").bind("click",function(){showMaster("c")}),$(".branch.c .btn, .master-item.c .btn.right").bind("click",function(){showMaster("d")}),$(".branch.d .btn, .master-item.d .btn.right").bind("click",function(){showMaster("e")}),$(".branch.e .btn, .master-item.e .btn.right").bind("click",function(){showMaster("f")}),$(".branch.f .btn, .master-item.f .btn.right").bind("click",function(){$("#master_wrap").hide(),$("#branch_wrap").hide(),$(".page-wrap.success").show()});var loadImg=function(t,e){var n="build/image/"+t,r=new XMLHttpRequest;r.open("GET",n,!0),r.responseType="arraybuffer",r.onload=function(t){var n=new Blob([this.response]),r=window.URL.createObjectURL(n);e&&e(r)},r.send()},loadImgOrder=function(t,e){loadImg("test_num_"+t+".png",function(t){"string"==typeof e&&(e=[e]);for(var n=0;n<e.length;n++){document.querySelector(".master-item."+e[n]+" .board-title-bg").style.backgroundImage="url("+t+")"}})},loadImgBoard=function(t,e){loadImg("test_ques_bg_"+t+".png",function(t){document.querySelector(".master-item."+e+" .board-wrap").style.backgroundImage="url("+t+")"})},loadImgBg=function(t,e,n){loadImg("test_bg_"+t+".png",function(t){document.querySelector(".master-item."+e).style.backgroundImage="url("+t+")",n&&n()})},loadImgAd=function(t,e,n){loadImg("poster_bg_"+t+".png",function(t){document.querySelector(".branch."+e+" .branch-bg").setAttribute("src",t),n&&n()})},loadImgGroup=function(t,e,n){loadImgOrder(t,e),loadImgBoard(t,e),loadImgBg(t,e,function(){loadImgAd(t,e,function(){n&&n()})})},setBgStyle=function(t,e){document.querySelector(t).style.backgroundImage="url("+e+")"},preloadImage=function(){loadImgOrder("one",["a","f"]),loadImgBoard("one","a"),loadImgBg("one","a",function(){loadImg("failed_bg.gif",function(t){setBgStyle(".page-wrap.fail",t)}),loadImgAd("one","a",function(){loadImgGroup("two","b",function(){loadImgGroup("three","c",function(){loadImgGroup("four","d",function(){loadImgGroup("five","e",function(){loadImgBoard("six","f"),loadImgBg("six","f"),loadImgAd("six","f",function(){loadImg("pass_bg.png",function(t){setBgStyle(".page-wrap.success",t),loadImg("reward_bg_reward.png",function(t){setBgStyle(".page-wrap.award",t),loadImg("reward_bg_two.png",function(t){setBgStyle(".page-wrap.form",t),setBgStyle(".page-wrap.end",t),loadImg("reward_icon_share.png",function(t){setBgStyle(".page-wrap.end .end-share-icon",t)}),loadImg("reward_erweima.png",function(t){document.querySelector(".page-wrap.end .end-nav-pic img").setAttribute("src",t)})})})})})})})})})})})},switchMusicIconToOn=function(t){$(".music-wrap .music-btn.off").removeClass("show"),$(".music-wrap .music-btn.on").addClass("show")},switchMusicIconToOff=function(t){$(".music-wrap .music-btn.on").removeClass("show"),$(".music-wrap .music-btn.off").addClass("show")},playMusic=function(){var t=new Audio("build/sound/bgm.mp3");t.loop=!0,$(".music-wrap .music-btn.on").bind("click",function(){switchMusicIconToOff(),t.pause()}),$(".music-wrap .music-btn.off").bind("click",function(e){switchMusicIconToOn(),t.play()}),t.addEventListener("play",function(){switchMusicIconToOn()}),document.addEventListener("WeixinJSBridgeReady",function(){t.play()},!1)};restart(),preloadImage(),playMusic();