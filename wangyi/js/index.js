/**
 * Created by Administrator on 2016/12/1.
 */
$(function(){
    $(".section").mousedown(function(e){
        e.preventDefault()
    })
    $(".section").mousemove(function(e){
        e.preventDefault()
    })
    // 右侧导航
    $(".fullPage").fullpage({
        verticalCentered: false,
        anchors: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
        navigation: true,
        navigationTooltips: ['首页', '视觉', '交互', '皮肤', '功能', '待办邮件', '联系人邮件', '科技', '连接易信', '马上体验'],
        'afterLoad': function(anchorLink, index) {
            $(".section").eq(index-1).addClass('active');
            if(index % 2==0){
                $(".section").eq(index-1).find("h3").css({
                    animation:"rote 1s 0.7s"
                })
            }//if
        },//afterLoad
        'onLeave': function(index,nextIndex,direction ) {

                $(".section").eq(index-1).find("h3").css({
                    transform:"rotateY(360deg)"
                })
        },//afterLoad
    });//fullpage
})// function

