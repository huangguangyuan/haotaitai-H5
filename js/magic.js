/*
** 法术类
*/
function Magic(bitmapData){
    base(this,LSprite,[]);
    var self = this;
    //出现位置
	self.x = fnRand(0,LGlobal.width-self.getWidth());
    self.y = -80;
    // 移动速度
    self.speed = 20;
    //显示到画面上
	self.bitmap = new LBitmap(bitmapData);
	self.addChild(self.bitmap);
}
/**
 * 循环
 * */
Magic.prototype.onframe = function (){
	var self = this;
	//移动
    self.y += self.speed;
    if(self.y >= LGlobal.height){
        enemyLayer.removeChild(self);
    }
    self.skill();
};
/**
 * 功能
 * */
Magic.prototype.skill = function(){}

// 散弹
function Magic1(bitmapData){
    base(this,Magic,[bitmapData]);
    var self = this;
}
Magic1.prototype.skill = function(){
    var self = this;
    if(LGlobal.hitTestArc(self,player)){
        magicLayer.removeChild(self);
        player.setBullet(1);
        setTimeout(function(){
            player.setBullet(0);
        },3000);
    }
}
// 大炮弹
function Magic2(bitmapData){
    base(this,Magic,[bitmapData]);
    var self = this;
}
Magic2.prototype.skill = function(){
    var self = this;
    if(LGlobal.hitTestArc(self,player)){
        magicLayer.removeChild(self);
        player.bulletBitmapData = new LBitmapData(imglist["bullet2"]);
        setTimeout(function(){
            player.bulletBitmapData = new LBitmapData(imglist["bullet"]);
        },3000);
    }
}
// 清屏幕
function Magic3(bitmapData){
    base(this,Magic,[bitmapData]);
    var self = this;
}

Magic3.prototype.skill = function(){
    var self = this;
    if(LGlobal.hitTestArc(self,player)){
        scoreVal += enemyLayer.childList.length*5;
        scoreTxt.text = scoreVal;
        magicLayer.removeChild(self);
        enemyLayer.removeAllChild();
    }
}








