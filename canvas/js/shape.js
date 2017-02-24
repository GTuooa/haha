function shape(canvas,copy,cobj) {
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.history=[];//存放图片的信息
    this.type="line";//画的类型线-长方形等
    this.bianNum=5;
    this.jiaoNum=5;
    this.lineWidth=2;//边框的宽度
    this.fillSylet="#000";//填充色
    this.strokeStyle="#000";//线性的边框色
    this.style="stroke";//填充型的或线型的
}
shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;//线条粗细
        this.cobj.fillStyle=this.fillStyle;//填充色
        this.cobj.strokeStyle=this.strokeStyle;//边框色
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e) {
            that.isback=true;
            that.init();
            var dx=e.offsetX;
            var dy=e.offsetY;
            that.copy.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var mx=e.offsetX;
                var my=e.offsetY;
                that.cobj.beginPath();
                that[that.type](dx,dy,mx,my);
                that.cobj.closePath();
                that.cobj[that.style]();

            }//move
            that.copy.onmouseup=function(e){
                that.history.push(cobj.getImageData(0,0,that.width,that.height))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }//up
        }//down
    },
    line:function(x1,y1,x2,y2){
        this.cobj.moveTo(x1,y1);
        this.cobj.lineTo(x2,y2);
    },
    rect:function(x1,y1,x2,y2){
        this.cobj.rect(x1,y1,x2-x1,y2-y1);
    },
    arc:function(x1,y1,x2,y2){//圆
        var r=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        this.cobj.arc(x1,y1,r,0,Math.PI*2);
    },
    bian:function(x1,y1,x2,y2){//正多边形
        var r=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        var angle=360/this.bianNum*Math.PI/180;
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(r*Math.cos(angle*i)+x1,r*Math.sin(angle*i)+y1);
        }
    },
    jiao:function(x1,y1,x2,y2){//N角形
        var r1=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        var r2=r1 /3;
        var angle=360/this.jiaoNum/2*Math.PI/180;
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(r1*Math.cos(angle*i)+x1,r1*Math.sin(angle*i)+y1);
            }else{
                this.cobj.lineTo(r2*Math.cos(angle*i)+x1,r2*Math.sin(angle*i)+y1);
            }
        }
    },
    pen:function(){//钢笔
        var that=this;
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();

            }

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },//pen-end
    blur:function(dataobj,num,x,y) {//模糊
        var width = dataobj.width, height = dataobj.height;
        var arr=[];
        var num = num;
        for (var i = 0; i <height ; i++) {//行
            for (var j = 0; j <width ; j++) {//列  x
                var x1=j+num>width?j-num:j;
                var y1=i+num>height?i-num:i;
                var dataObj = cobj.getImageData(x1, y1,num, num);
                var r = 0, g = 0, b = 0;
                for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                    r += dataObj.data[k * 4 + 0];
                    g += dataObj.data[k * 4 + 1];
                    b += dataObj.data[k * 4 + 2];
                }
                r = parseInt(r / (dataObj.width * dataObj.height));
                g = parseInt(g / (dataObj.width * dataObj.height));
                b = parseInt(b / (dataObj.width * dataObj.height));
                arr.push(r,g,b,255);
            }
        }
        for(var i=0;i<dataobj.data.length;i++){
            dataobj.data[i]=arr[i]
        }
        cobj.putImageData(dataobj,x,y);
    },//blur-end
    fx:function(dataobj,x,y){//反向-底片
        for(var i=0;i<dataobj.width*dataobj.height;i++){//反向-底片
            dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
            dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
            dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
            dataobj.data[i*4+3]=255;
        }
        cobj.putImageData(dataobj,x,y);
     },//fx
    mosaic:function(dataobj,num,x,y){//num:马赛克格格
        var imgw=dataobj.width,imgh=dataobj.height;
        var num=30;
        var w=imgw/num;
        var h=imgh/num;
        for(var i=0;i<num;i++){//行
            for(var j=0;j<num;j++){//列
                var dataObj=cobj.getImageData(w*j,h*i,w,h);
                var r=g=b=0;
                for(var k=0;k<dataObj.width*dataObj.height;k++){
                    //每个马赛克格格包含单位像素的r,g,b,的总和
                    r+=dataObj.data[k*4+0];
                    g+=dataObj.data[k*4+1];
                    b+=dataObj.data[k*4+2];
                }<!--k-->
                //取平均数
                r=parseInt(r/(dataObj.width*dataObj.height));
                g=parseInt(g/(dataObj.width*dataObj.height));
                b=parseInt(b/(dataObj.width*dataObj.height));
                for(var k=0;k<dataObj.width*dataObj.height;k++){
                    //每个马赛克格格包含单位像素的r,g,b,的均值放入
                    dataObj.data[k*4+0]=r;
                    dataObj.data[k*4+1]=g;
                    dataObj.data[k*4+2]=b;
                }<!--k-->
                cobj.putImageData(dataObj,x+w*j,y+i*h);
            }<!--j-->
        }<!--i-->
    }//mosaic

}//onload