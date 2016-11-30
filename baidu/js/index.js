/**
 * Created by Administrator on 2016/11/29.
 */
$(function(){
    var num=0;
    var flog=true;
    var ch=$(window).height();
    var marginT=parseInt($("#fullPage").css("marginTop")?$("#fullPage").css("marginTop"):0);
    touch.on("body","swipeup","#fullPage",function(e){
        e.preventDefault();
            if(!flog){
                return false;
            }
            num++;
            if(num==4){
                num=3;
            }
            $("#fullPage").css({
                marginTop:-num*ch,
                transition:"margin-top 0.5s ease"
            })
            flog=false;
            if(num==3){
                flog=true;
            }

    })//up
    touch.on("body","swipedown","#fullPage",function(e){
        console.log(flog+"--");
            e.preventDefault();
            if(!flog){
            return false;
            }
            num--;
            if(num==-1){
                num=0;
            }
            $("#fullPage").css({
                marginTop:-num*ch,
                transition:"margin-top 0.5s ease"
            })
            flog=false;
            if(num==0){
                flog=true;
            }
    })//down
    $("#fullPage")[0].addEventListener("webkitTransitionEnd",function () {
        flog=true;
    })
})//function