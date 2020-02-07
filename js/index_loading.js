var preload = new createjs.LoadQueue(); //新建loading对象
var bgm;//全局音乐对象
preload.installPlugin(createjs.Sound); //加载音乐插件
var isOpen = false;
var isOne = true;

$(function () {
	//加载图片、音乐

	// preload.loadManifest(['./img/arrow.png',{id:"bgm", src:"./music/bgm.mp3"}]);
	preload.loadManifest(['./img/arrow.png', './img/yue.png', './img/yue2.png']);

	//加载过程执行
	preload.on("progress", loadProgress);

	//加载完成执行
	preload.on("complete", loadComplete);
	$('.mus').click(function () {
		if (isOpen) {
			// 播放音乐
			$('.mus').attr('src', './img/yue.png');
			$('.mus').addClass('rotate');
			bgm.play();
			isOpen = false;
		} else {
			// 关闭音乐
			$('.mus').attr('src', './img/yue2.png');
			$('.mus').removeClass('rotate');
			bgm.paused = true;
			isOpen = true;
		}
	});
});

function loadProgress() {
	document.querySelector(".progress").innerText = (preload.progress * 100 | 0) + " %";
}
function loadComplete() {
	Init();
}

function Init() {
	// bgm = createjs.Sound.play('bgm'); //播放bgm.mp3
	// bgm.loop = -1; //loop为播放次数，-1为循环播放，默认1次
	// bgm.paused = true;
	/* bgm1.paused -> bool值，暂停状态
	   bgm1.paused = true; -> 暂停
	   bgm1.play(); -> 播放
	   bgm1.stop(); -> 停止
	*/
	if (isOne) {
		$('.loading').fadeOut();
		$('.guide-bg').fadeIn();
		setTimeout(() => {
			$('.guide-bg').fadeOut();
			$('.home').fadeIn();
		}, 3000);
		isOne = false;
	}


}

function isWeixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

//随机数
function fnRand(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}



















