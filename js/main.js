$(function () {
	// $('.productImg').on('touchmove', function (event) {
	//     event.preventDefault();
	// });

	// document.body.addEventListener('touchmove', function (e) {
	// 	e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
	// }, { passive: false }); //passive 参数不能省略，用来兼容ios和android

	// 点击缩放
	function zoomFn(obj) {
		$(obj).on('touchstart', function (e) {
			$(this).css('-webkit-transform', 'scale3d(0.8,0.8,0.8)');
		})

		$(obj).on('touchend', function (e) {
			$(this).css('-webkit-transform', 'scale3d(1,1,1)');
		})
	}
	zoomFn('.clickBtn');


	document.body.addEventListener('focusout', () => { // 软键盘关闭事件
		window.scroll(0, 0) // 失焦后强制让页面归位 
	});

	$('.award2').on('touchstart', function (e) {
		luckDraw();
	})

	// 大转盘抽奖
	function luckDraw() {
		var deg = 1440 + prizeNum * 51.4;
		$('.award1').css({ 'transform': 'rotate(' + deg + 'deg)','transition':' 2.5s ease-out all' });
		setTimeout(() => {
			switch (prizeNum) {
				case 1:
					showDialog({ type: 1, tip: '恭喜您，获得二等奖', text: '<p>一套智能锁A71</p><p>（价值：¥1799.00元）</p><p>已放入“我的奖品”</p>', giftType: 2 });
					break;
				case 2:
					showDialog({ type: 1, tip: '恭喜您，获得四等奖', text: '<p>一套炫彩简约衣架礼盒</p><p>（价值：¥158.00元）</p><p>已放入“我的奖品”</p>', giftType: 4 });
					break;
				case 3:
					showDialog({ type: 1, tip: '恭喜您，获得三等奖', text: '<p>一套落地衣架GW-5823</p><p>（价值：¥588.00元）</p><p>已放入“我的奖品”</p>', giftType: 3 });
					break;
				case 4:
					showDialog({ type: 1, tip: '恭喜您，获得五等奖', text: '<p>一张200元通用代金券</p><p>（价值：¥200.00元）</p><p>已放入“我的奖品”</p>', giftType: 5 });
					break;
				case 5:
					showDialog({ type: 1, tip: '恭喜您，获得一等奖', text: '<p>一套消毒晾衣机GW-1122BS</p><p>（价值：¥2399.00元）</p><p>已放入“我的奖品”</p>', giftType: 1 });
					break;
				case 6:
					showDialog({ type: 1, tip: '恭喜您，获得幸运奖', text: '<p>一个微信红包，金额随机发放</p><p>关注好太太服务号</p><p>或微信官方服务消息发送</p>', giftType: 6 });
					break;
				default:
					showDialog({ type: 2, tip: '谢谢参与', text: '<p>感谢关注，每天闯关成功首次分享</p><p>可获得多一次抽奖机会哦</p>', giftType: 6 });
			}
			$('.award1').css({ 'transform': 'rotate(' + 0 + 'deg)','transition':' 0s ease-out all' });
		}, 3000);
	}

	// 点击立刻领取
	$('.linkGift').on('touchstart', function (e) {
		$('.luckDraw').hide();
		$('.dialog').hide();
		$('.dialog-form').show();
	})


	// 点击打开活动规则
	$('.active-ico').click(function () {
		$('.dialog-rule').fadeIn();
	});
	// 点击关闭活动规则
	$('.ruleclosebtn').click(function () {
		$('.dialog-rule').fadeOut();
	});

	// 排行榜
	$('.ranking-btn').click(function () {
		if(isChallenge){
			$('.ranking-list').fadeIn();
		}else{
			showDialog({type:2,tip:'温馨提示',text:`暂无排名，赶紧去挑战吧~`});
		}
		
	});

	// 关闭排行榜
	$('.rankBtn').click(function () {
		$('.ranking-list').fadeOut();
	})





})




