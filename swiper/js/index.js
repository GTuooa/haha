/**
 * Created by Administrator on 2016/12/2.
 */
$(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        pagination : '.swiper-pagination',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })
    function resize(now,type){
        var type=type||"x";
        var html=document.querySelector("html");
        var cw=document.documentElement.clientWidth;
        var ch=document.documentElement.clientHeight;

        if(type=="x"){
            var scale=cw/now*100;
        }else if(type=="y"){
            var scale=ch/now*100;
        }

        html.style.fontSize=scale+"px";
    }
    ;
    resize(1334,"y");
})//function