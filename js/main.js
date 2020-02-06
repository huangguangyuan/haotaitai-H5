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

	$('.award2').on('touchstart',function(e){
		luckDraw(0);
	})

	// 大转盘抽奖
	function luckDraw(param){
		// 1 --> 50元
		// 2 --> 10元
		// 3 --> 2元
		// 4 --> 1元
		// 5 --> 谢谢参与
		// 6 --> 100元
		// 7 --> 88元
		var num = param || fnRand(1,8);//这里输入需要中奖的数据，默认随机
		var deg = 1440 + num * 51.4;
		$('.award1').css({ 'transform': 'rotate('+deg+'deg)' });
	}





})




