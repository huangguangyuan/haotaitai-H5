$(function () {
	// 首页滚动获奖名单
	$.ajax({
		//请求方式
		type: 'POST',
		//发送请求的地址
		url: 'http://bardiss.hengdikeji.com/index.php/index/activity/getAwardsList',
		//服务器返回的数据类型
		dataType: 'json',
		data: {},
		success: function (data) {
			if(data.status===1 && data.data.length){
				var html=''
				data.data.forEach(n=>{
					html+=`<div class="winning-list-item">${n.title}</div>`
				})
				$('#scroll_begin').html(html)
			}else{
				$('#scroll_begin').html(`<div><div>`)
			}
		},
		error: function (jqXHR) {
			//请求失败函数内容
		}
	});

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
	// 奖励ID,填写收货信息时需要的参数
	var awardsId = 0
	$('.award2').on('touchstart', function (e) {
		$.get('http://bardiss.hengdikeji.com/index.php/index/activity/awards', function (data, status) {
			if (data.status === 0) {
				prizeNum = 2
				luckDraw();
			} else {
				prizeNum = data.group
				awardsId = data.id
				luckDraw();
			}
		})
	})

	// 大转盘抽奖
	function luckDraw() {
		var deg = 1440 + prizeNum * 51.4;
		$('.award1').css({ 'transform': 'rotate(' + deg + 'deg)', 'transition': ' 2.5s ease-out all' });
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
			$('.award1').css({ 'transform': 'rotate(' + 0 + 'deg)', 'transition': ' 0s ease-out all' });
		}, 3000);
	}

	// 点击立刻领取
	$('.linkGift').on('touchstart', function (e) {
		$('.luckDraw').hide();
		$('.dialog').hide();
		$('.dialog-form').show();
	})

	// 提交表单信息
	$('.formbtn').on('touchstart', function (e) {
		var name =$('#name').val()
		var phone =$('#phone').val()
		var addres =$('#addres').val()
		var remark =$('#remark').val()
		var citydata =$('#city').text()
		var city=''		
		if(citydata){
			let ret =citydata.split('>')
			if(ret){
				city=ret.join('')
			}
		}
		var data={
			name:name,
			phone:phone,
			addres:addres,
			city:city,
			remark:remark
		}
		$.ajax({
			type: 'POST',
			url: 'http://bardiss.hengdikeji.com/index.php/index/index/exchange',
			dataType: 'json',
			data: data,
			success: function (data) {
				if (data.status === 1 && data.msg) {
					showDialog({type:2,tip:'提交成功',text:` <p>奖品在活动结束后统一邮寄</p> <p>因新型冠状病毒疫情影响</p> <p>快递时效无法保证</p> <p>请获奖者耐心等待，如有不便，敬请原谅</p>`})
					$('.luckDraw').hide()
					$('.home').show()	
				}else{
					$('.luckDraw').hide()
					$('.home').show()
				}
			},
			error: function (jqXHR) {
				//请求失败函数内容
			}
		});
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
		if (isChallenge) {
			$.get("http://bardiss.hengdikeji.com/index.php/index/activity/ranking", function (data, status) {
				if (data.status === 1) {
					var html = ''
					if (data.data.list.length) {
						let ret = data.data.list.find(n => n.num === data.data.num)
						if (ret) {
							$('.curr').html(`                        
						<div class="curr-left">${ret.num}</div>
						<div class="curr-center">
							<img src="${ret.open_face}" alt="">
							<span>${ret.open_name}</span>
						</div>
						<div class="curr-right">${ret.score}</div>`)
						}

						data.data.list.forEach(n => {
							if (n.num === 1) {
								html += ` <li> <div class="left"> <img src="./img/ico-1.png" alt=""> </div> <div class="center"> <img src="${n.open_face}" alt=""> <span>${n.open_name}</span> </div> <div class="right"> <span>${n.score}</span> </div> </li>`
							} else if (n.num === 2) {
								html += ` <li> <div class="left"> <img src="./img/ico-2.png" alt=""> </div> <div class="center"> <img src="${n.open_face}" alt=""> <span>${n.open_name}</span> </div> <div class="right"> <span>${n.score}</span> </div> </li>`
							} else if (n.num === 3) {
								html += ` <li> <div class="left"> <img src="./img/ico-3.png" alt=""> </div> <div class="center"> <img src="${n.open_face}" alt=""> <span>${n.open_name}</span> </div> <div class="right"> <span>${n.score}</span> </div> </li>`
							} else {
								html += ` <li> <div class="left"> ${n.num} </div> <div class="center"> <img src="${n.open_face}" alt=""> <span>${n.open_name}</span> </div> <div class="right"> <span>${n.score}</span> </div> </li>`
							}

						});
						$(".list-content").html(html)
						$('.ranking-list').fadeIn();
					}
				}
			});
		} else {
			showDialog({ type: 2, tip: '温馨提示', text: `暂无排名，赶紧去挑战吧~` });
		}

	});

	// 关闭排行榜
	$('.rankBtn').click(function () {
		$('.ranking-list').fadeOut();
	})





})




