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
    ;
    resize(1334);
    //iscroll
    var myScroll;
    var scroller=document.querySelector("#scroller");
    var loading=document.querySelector(".loading");

        myScroll = new IScroll('#wrapper', {
            mouseWheel: true,
            scrollbars: true,
            fadeScrollbars:true,
        });

    myScroll.on("scrollStart",function(){
        if(myScroll.y==myScroll.maxScrollY){//向下加载
            loading.style.display="block";
            setTimeout(function(){
                for(var i=0;i<1;i++){
                    var div=document.createElement("div");
                    div.innerHTML="持续更新中";
                    div.className="update";
                    scroller.insertBefore(div,loading);
                }
                myScroll.refresh();
                loading.style.display="none";

            },3000)
        }


    })

})//function