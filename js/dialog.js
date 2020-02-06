$(function () {
    // showDialog({type:2,tip:'友情提示',text:'222',giftType:2,});
	// 点击缩放
	function showDialog(obj) {
        var giftType = {
            1: './img/1.png',
            2: './img/2.png',
            3: './img/3.png',
            4: './img/4.png',
            5: './img/5.png',
        }
        if(obj.type){
            $('.dialog').show()
            $('.dialog-tip').text(obj.tip)
            $('.dialog-context').text(obj.text)
        }
        if(obj.type===2){
            $('.closeDialog').show()
            $('.linkGift').hide()
        }else{
            $('.closeDialog').hide()
            $('.linkGift').show()
        }
        if(obj.giftType && giftType[obj.giftType]){
            $(".dialog-top").attr("src", giftType[obj.giftType]);
        } else {
            $(".dialog-top").attr("src", './img/dialog-top.png');
        }

        


    }
    function linkGift(){
        console.log('linkto');
    }
    $('.closeDialog').on('touchstart',function(e){
        $('.dialog').hide()
    })
    $('.linkGift').on('touchstart',function(e){
        linkGift()
    })
    // $('.prize-btn').on('touchstart',function(e){
    //     showDialog({type:2,tip:'友情提示',text:'222',giftType:2,});
    // })
    $('.ruleclosebtn').on('touchstart',function(e){
        $('.dialog-rule').hide()
    })






})