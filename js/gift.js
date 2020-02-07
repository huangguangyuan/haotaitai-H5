$(function () {
    $('.prize-btn').on('touchstart', function (e) {
        $('.home').hide();
        $('.gift').show();
    });
    $('.tab-1').on('touchstart', function (e) {
        $('.gift-tab-img').attr("src",'./img/gift2.png');
        $('.gift-bg-1').show();
        $('.gift-bg-2').hide();
    });
    $('.tab-2').on('touchstart', function (e) {
        $('.gift-tab-img').attr("src",'./img/gift8.png');
        $('.gift-bg-1').hide();
        $('.gift-bg-2').show();
    });
    $('.gift-tab-btn').on('touchstart', function (e) {
        $('.home').show();
        $('.gift').hide();
    });
    
})