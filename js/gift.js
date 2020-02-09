$(function () {
    $('.prize-btn').on('touchstart', function (e) {
        showDialog({type:2,tip:'温馨提醒',text:`
        <p>活动即将开始</p>`});
        return
        $('.home').hide();
        $('.gift').show();
        // 点击我的奖品请求
        $.get('http://hotata.hengdikeji.com/index.php/index/activity/myPrize', function (data, status) {
            if (data.status === 1 && data.data.length) {
                $('.gift-enpty').hide()
            } else {
                $('.gift-bg-1-data').html('')
                $('.gift-enpty').show()
            }
        })
    });
    $('.tab-1').on('touchstart', function (e) {
        $('.gift-tab-img').attr("src", url + '/img/gift2.png');
        $('.gift-bg-1').show();
        $('.gift-bg-2').hide();
    });
    $('.tab-2').on('touchstart', function (e) {
        $('.gift-tab-img').attr("src", url + '/img/gift8.png');
        $('.gift-bg-1').hide();
        $('.gift-bg-2').show();
        $.get('http://hotata.hengdikeji.com/index.php/index/activity/PrizeList', function (data, status) {
            if (data.status === 1 && data.data.length) {
                $('.gifttext1').text(data.data[0].number)
                $('.gifttext2').text(data.data[1].number)
                $('.gifttext3').text(data.data[2].number)
                $('.gifttext4').text(data.data[3].number)
                $('.gifttext5').text(data.data[4].number)
            }
        })
    });
    $('.gift-tab-btn').on('touchstart', function (e) {
        $('.home').show();
        $('.gift').hide();
    });

})