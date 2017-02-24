/**
 * Created by Administrator on 2016/11/23.
 */
function person(canvas,cobj,runs,jumps){
    this.x = 0;
    this.y = 500;
    this.endy = 420;
    this.width = 94;
    this.height = 145;
    this.canvas = canvas;
    this.cobj = cobj;
    this.runs = runs;
    this.jumps = jumps;
    this.status = "runs";
    this.state = 0;
    this.speedx = 5;
    this.zhongli = 10;
    this.num=0;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        this.cobj.drawImage(this[this.status][this.state], 0, 0, 94, 145, 0, 0, this.width, this.height);
        this.cobj.restore();
    }
}//person-prototype
/*创建障碍物对象*/

function hinder(canvas, cobj, hinder) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.hinders = hinder;
    this.state = 0;
    this.x = canvas.width;
    this.y = 500;
    this.width=76;
    this.height=83;
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinders[this.state],0,0,76,83,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
function game(canvas,cobj,runs,jumps,hinders){
    this.canvas = canvas;
    this.canvasW = canvas.width;
    this.canvasH = canvas.height;
    this.cobj = cobj;
    this.person = new person(canvas, cobj, runs, jumps);
    this.speed = 8;
    this.runs=runs;
    this.jumps=jumps;
    this.hinders=hinders;
    this.hinderArr = [];
    this.score=1;
    this.life=3;
    this.back=0;
}
game.prototype={
    play:function(){
        var that=this;
        that.key();
        var num2=0;//随机出障碍物图
        var step=5000+parseInt(5*Math.random())*1000;//随机图的位置
        setInterval(function(){
            that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
            that.person.num++; //显示图片
            if(that.person.status=="jumps"){
                that.person.state=0;
            }else if(that.person.status=="runs"){
                that.person.state=that.person.num%8;
            }

            if(that.person.x>that.canvasW/3){
                that.person.x=that.canvasW/3;
            }
            that.back+=-5;
            that.canvas.style.backgroundPositionX = that.back + "px";
            that.person.x+=that.person.speedx;
            that.person.draw();


            //障碍物
            if(num2%step==0){
                num2=0;
                step=5000+parseInt(5*Math.random())*1000;
                var hinderObj=new hinder(that.canvas,that.cobj,that.hinders);
                hinderObj.state=Math.floor(that.hinders.length*Math.random());
                that.hinderArr.push(hinderObj);
                if(that.hinderArr.length>5){
                    that.hinderArr.shift();
                }
            }

            num2+=50;

            for(var i=0;i<that.hinderArr.length;i++) {
                that.hinderArr[i].x -= that.speed;
                that.hinderArr[i].draw();
                if (hitPix(that.canvas, that.cobj, that.person, that.hinderArr[i])) {
                    if (!that.hinderArr[i].flag1) {
                        that.life--;
                        //document.title=that.life;
                        hinder(that.cobj, that.person.x + that.person.width / 2, that.person.y + that.person.height / 2, "red")
                    }
                    that.hinderArr[i].flag1 = true;
                    if (that.life < 0) {
                        alert("game over");
                        location.reload();
                    }

                } else if (that.hinderArr[i].x + that.hinderArr[i].width < that.person.x) {
                    if (!that.hinderArr[i].flag && !that.hinderArr[i].flag1) {
                        document.title = ++that.score;
                        if (that.score % 3 == 0) {
                            that.speed += 1;
                        }
                    }
                    that.hinderArr[i].flag = true;
                }
            }
        },50)
    },//play
    key:function(){
        var that = this;
        var flag = true;
        document.onkeydown = function (e) {
            if (!flag) {
                return;
            }
            flag = false;
            if (e.keyCode == "32") {
                that.person.status = "jumps";
                var initA = 10;
                var speedA = 10;
                var r = 180;
                var initY = that.person.y;
                var t = setInterval(function () {
                    initA += speedA;
                    if (initA >=180) {
                        //stone(that.cobj, that.person.x + that.person.width / 2, that.person.y + that.person.height)

                        that.person.y = initY;
                        that.person.status = "runs";
                        clearInterval(t);
                        flag = true;
                    } else {
                        var len = Math.sin(initA * Math.PI / 180) * r;
                        that.person.y = initY - len;
                    }
                }, 50)
            }
        }

    },//key
    hidden:function(){

    }

}
