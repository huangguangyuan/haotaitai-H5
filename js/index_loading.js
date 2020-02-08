var preload = new createjs.LoadQueue(); //新建loading对象
var bgm;//全局音乐对象
preload.installPlugin(createjs.Sound); //加载音乐插件
var isOpen = false;
var isOne = true;//是否加载了一次
var clickType = 0;//点击类型 1 => 闯关成功，去掉抽奖页面 
var isEnd = false//活动页面是否结束
var scoreVal = 0;//分值
var chanceNum = 1;//今天剩余次数
var isChallenge = true;//是否挑战过游戏
var prizeNum = 7;// 1 --> 智能锁
				 // 2 --> 凉衣机
				 // 3 --> 凉衣架
				 // 4 --> 200元
				 // 5 --> 挂机凉衣架
				 // 6 --> 现金红包
				 // 7 --> 谢谢参与
var isLuckDraw = true;//是否第一次抽奖

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
			isOpen = false;
		} else {
			// 关闭音乐
			$('.mus').attr('src', './img/yue2.png');
			$('.mus').removeClass('rotate');
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
		$('.chanceNum').text(chanceNum);
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



















