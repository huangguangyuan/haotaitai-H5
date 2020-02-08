// showDialog({type:2,tip:'友情提示',text:'222',giftType:2,});
// type int 1-'立即领取' 2-'我知道了'
// tip  string  提示标题
// text string 内容
// giftType int 礼物类型，1一等奖
// 点击缩放
function showDialog(obj) {
    var giftType = {
        1: '/static/index/img/1.png',
        2: '/static/index/img/2.png',
        3: '/static/index/img/3.png',
        4: '/static/index/img/4.png',
        5: '/static/index/img/5.png',
    }
    if (obj.type) {
        $('.dialog').show()
        $('.dialog-tip').text(obj.tip)
        $('.dialog-context').html(obj.text)
    }
    if (obj.type === 2) {
        $('.closeDialog').show()
        $('.linkGift').hide()
    } else {
        $('.closeDialog').hide()
        $('.linkGift').show()
    }
    if (obj.giftType && giftType[obj.giftType]) {
        $(".dialog-top").attr("src", giftType[obj.giftType]);
    } else {
        $(".dialog-top").attr("src", '/static/index/img/dialog-top.png');
    }

}
function linkGift() {
    console.log('linkto');
}

$('.closeDialog').on('touchstart', function (e) {
    $('.dialog').hide();
    switch (clickType) {
        case 0:
            // 完成游戏后提交 —— 闯关失败
            $.ajax({
                type: 'POST',
                url: 'http://hotata.hengdikeji.com/index.php/index/activity/sub',
                dataType: 'json',
                data: { score: scoreVal, status: 0 },
                success: function (data) {
                    if (data.status === 0 && data.msg) {
                        clickType = 2
                        showDialog({ type: 2, tip: '友情提示', text: `${data.msg}` })
                        $('.game').hide()
                        $('.home').show()
                    }
                    if (data.status === 0) {
                        if (data.is_awards) {
                            $('.game').hide()
                            $('.luckDraw').show()
                        } else {
                            $('.game').hide()
                            $('.home').show()
                        }
                    }
                },
                error: function (jqXHR) {
                    //请求失败函数内容
                }
            });
            break;
        case 1:
            //闯关成功
            $.ajax({
                type: 'POST',
                url: 'http://hotata.hengdikeji.com/index.php/index/activity/sub',
                dataType: 'json',
                data: { score: scoreVal, status: 1 },
                success: function (data) {
                    if (data.status === 0 && data.msg) {
                        showDialog({ type: 2, tip: '友情提示', text: `${data.msg}` })
                        $('.game').hide()
                        $('.home').show()
                    }
                    if (data.status === 0) {
                        if (data.is_awards) {
                            $('.game').hide()
                            $('.luckDraw').show()
                        } else {
                            $('.game').hide()
                            $('.home').show()
                        }
                    }
                },
                error: function (jqXHR) {
                    //请求失败函数内容
                }
            });
            break;
        case 2:
            break;
        default:
    }
    clickType = 2
})
$('.linkGift').on('touchstart', function (e) {
    linkGift()
})
// $('.prize-btn').on('touchstart',function(e){
//     showDialog({type:2,tip:'友情提示',text:'222',giftType:2,});
// })
$('.ruleclosebtn').on('touchstart', function (e) {
    $('.dialog-rule').hide()
})
$('.gameclosebtn').on('touchstart', function (e) {
    $('.dialog-game').hide()
})
$('.formclosebtn').on('touchstart', function (e) {
    $('.dialog-form').hide()
})