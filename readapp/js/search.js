/**
 * Created by Administrator on 2016/12/2.
 */
$(function () {
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
    resize(1334);
    //iscroll
    var myScroll;
    var scroller=document.querySelector("#scroller");
    myScroll = new IScroll('#wrapper', {
        mouseWheel: true,
        scrollbars: true,
        fadeScrollbars:true,
    });
    //swiper
    var mySwiper = new Swiper ('.swiper-container', {
        pagination : '.swiper-pagination',
        autoplay: 5000,//可选选项，自动滑动
        paginationClickable :true,//可点击点点
    })
})//function