var _$=function(e){this.nodeList=document.querySelectorAll(e)};_$.prototype.hide=function(e){for(var t=this.nodeList,r=0;r<t.length;r++)t[r].style.display="none";return this},_$.prototype.show=function(e){for(var t=this.nodeList,r=0;r<t.length;r++)t[r].style.display="block";return this},_$.prototype.removeClass=function(e){for(var t=this.nodeList,r=0;r<t.length;r++)t[r].classList.remove(e);return this},_$.prototype.addClass=function(e){for(var t=this.nodeList,r=0;r<t.length;r++)t[r].classList.add(e);return this},_$.prototype.bind=function(e,t){for(var r=this.nodeList,n=0;n<r.length;n++)r[n].addEventListener(e,function(e){t(e)});return this};var $=function(e){return new _$(e)},showMaster=function(e){var t=$(".master-item."+e);$("#branch_wrap, .branch").hide(),$("#master_wrap").show(),$(".master-item").hide().removeClass("restore"),t.show(),setTimeout(function(){t.addClass("restore")})},showBranch=function(e){$("#master_wrap, .master-item").hide().removeClass("restore"),$("#branch_wrap").show(),$(".branch").hide(),$(".branch."+e).show()},restart=function(){$(".page-wrap").hide(),$("#master_wrap, .master-item").hide().removeClass("restore"),$("#branch_wrap, .branch").hide(),$(".page-wrap.start").show()},toFail=function(){$(".page-wrap").hide(),$("#master_wrap, .master-item").hide().removeClass("restore"),$("#branch_wrap, .branch").hide(),$(".page-wrap.fail").show()},showFormError=function(){var e=$(".page-wrap.form .info");e.show(),setTimeout(function(){e.hide()},2e3)};$(".page-wrap.start .btn").bind("click",function(){$(".page-wrap").hide(),showMaster("a")}),$(".page-wrap.success .btn").bind("click",function(){$(".page-wrap.success").hide(),$(".page-wrap.form").show()}),$(".page-wrap.form form").bind("submit",function(e){var t=document.querySelector('.page-wrap.form .form-input[name="name"]').value,r=document.querySelector('.page-wrap.form .form-input[name="tel"]').value,n=document.querySelector('.page-wrap.form .form-input[name="job"]').value;return t&&r&&n?($(".page-wrap.form").hide(),$(".page-wrap.end").show()):showFormError(),e.preventDefault(),!1}),$(".page-wrap.fail .btn").bind("click",function(){restart()}),$(".master-item.a .btn.a").bind("click",function(){showBranch("a")}),$(".master-item.b .btn.a").bind("click",function(){showBranch("b")}),$(".master-item.c .btn.a").bind("click",function(){showBranch("c")}),$(".master-item.d .btn.a").bind("click",function(){showBranch("d")}),$(".master-item.e .btn.a").bind("click",function(){showBranch("e")}),$(".master-item.f .btn.a").bind("click",function(){showBranch("f")}),$(".btn.choice.b, .btn.choice.c").bind("click",function(){toFail()}),$(".branch.a .btn").bind("click",function(){showMaster("b")}),$(".branch.b .btn").bind("click",function(){showMaster("c")}),$(".branch.c .btn").bind("click",function(){showMaster("d")}),$(".branch.d .btn").bind("click",function(){showMaster("e")}),$(".branch.e .btn").bind("click",function(){showMaster("f")}),$(".branch.f .btn").bind("click",function(){$("#branch_wrap").hide(),$(".page-wrap.success").show()});var loadImg=function(e,t){var r="build/image/"+e,n=new XMLHttpRequest;n.open("GET",r,!0),n.responseType="arraybuffer",n.onload=function(e){var r=new Blob([this.response]),n=window.URL.createObjectURL(r);t&&t(n)},n.send()},loadImgOrder=function(e,t){loadImg("test_num_"+e+".png",function(e){if(t){"string"==typeof t&&(t=[t]);for(var r=0;r<t.length;r++){document.querySelector(".master-item."+t[r]+" .board-title-bg").style.backgroundImage="url("+e+")"}}})},loadImgBoard=function(e,t){loadImg("test_ques_bg_"+e+".png",function(e){t&&(document.querySelector(".master-item."+t+" .board-wrap").style.backgroundImage="url("+e+")")})},loadImgBg=function(e,t){loadImg("test_bg_"+e+".png",function(e){t&&(document.querySelector(".master-item."+t).style.backgroundImage="url("+e+")")})},loadImgAd=function(e,t){loadImg("poster_bg_"+e+".png",function(e){t&&document.querySelector(".branch."+t+" .branch-bg").setAttribute("src",e)})},loadImgGroup=function(e,t){loadImgOrder(e,t),loadImgBoard(e,t),loadImgBg(e,t),loadImgAd(e,t)},setBgStyle=function(e,t){document.querySelector(e).style.backgroundImage="url("+t+")"},preloadImage=function(){loadImg("failed_bg.gif",function(e){setBgStyle(".page-wrap.fail",e)}),loadImgOrder("one",["a","f"]),loadImgBoard("one","a"),loadImgBg("one","a"),loadImgAd("one","a"),loadImgGroup("two","b"),loadImgGroup("three","c"),loadImgGroup("four","d"),loadImgGroup("five","e"),loadImgBoard("six","f"),loadImgBg("six","f"),loadImgAd("six","f"),loadImg("pass_bg.png",function(e){setBgStyle(".page-wrap.success",e)}),loadImg("reward_bg_two.png",function(e){setBgStyle(".page-wrap.form",e),setBgStyle(".page-wrap.end",e)}),loadImg("reward_icon_share.png",function(e){setBgStyle(".page-wrap.end .end-share-icon",e)}),loadImg("reward_erweima.png",function(e){document.querySelector(".page-wrap.end .end-nav-pic img").setAttribute("src",e)})};restart(),preloadImage();