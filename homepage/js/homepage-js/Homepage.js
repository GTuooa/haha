$(function(){
    // 菜单栏
    $(".header-right").click(function () {
        var width=$(".s-m").width();
        if(width==0){
            $("header .s-m").animate({width:200},500);
        }
        else {
            $("header .s-m").animate({width:0},500);
        }
    })
    $(".s-m li").each(function(i){
        $(".s-m li").eq(i).click(function(){
            $("header .s-m").animate({width:0},500);
            var scrollTop=$(".floor").eq(i).offset().top;
            $("html,body").animate({scrollTop:scrollTop},500)
        })
    })
//swiper
 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        parallax: true,
        speed: 600,
    });
    
    
    //楼层跳转
    $(".nav-l li").each(function(i){
        $(".nav-l li").eq(i).click(function(){
            var scrollTop=$(".floor").eq(i).offset().top-68;
            $("html,body").animate({scrollTop:scrollTop},500)
        })
    })
    //音频
    $(".nav-l li").each(function(i){
        $(".nav-l li").eq(i).mouseover(function(){
            $("audio")[0].play();
        })
        $(".nav-l li").eq(i).mouseout(function(){
            $("audio")[0].pause();
        })
    })
})//onload