/**
 * Created by Administrator on 2017/3/15.
 */
window.onload=function () {

    waterFull('main','box');
    var dataInt={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};

    window.onscroll=function () {
        if(checkScrollSlde){
            //将数据块渲染到当前页面的尾部
            var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
            if(scrollTop>2000){
                return
            }
            var oParent=document.getElementById('main');
            for(var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src="img/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterFull('main','box');
        }
    }
}
function waterFull(parent,box) {
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);
    var oBoxW=oBoxs[0].offsetWidth;
    var hArr = [];
    var clos = Math.floor(document.documentElement.clientWidth/ oBoxW);
    oParent.style.cssText = "width:" + oBoxW * clos + "px;margin:0 auto";
        for (var i = 0; i < oBoxs.length; i++) {
            if (i < clos) {
                hArr.push(oBoxs[i].offsetHeight)
            } else {
                var minH = Math.min.apply(null, hArr);
                var index = getMinhIndex(hArr, minH);
                oBoxs[i].style.position = 'absolute';
                oBoxs[i].style.top = minH + 'px';
                //oBoxs[i].style.left=oBoxW*index+'px';
                oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
                hArr[index] += oBoxs[i].offsetHeight;
            }
        }
}

function getByClass(parent,clsName) {
    var boxArr=new Array();//存储获取到的所有class为box的元素
    oElements=parent.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex(arr,val) {
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}
function checkScrollSlde() {
    var oParent=document.getElementById('main');
    var oBoxs=getByClass(oParent,'box');
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;
}





























