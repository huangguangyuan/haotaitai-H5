/*
** 敌人类
*/
function Enemy(bitmapData){
    base(this,LSprite,[]);
    var self = this;
    //出现位置
	self.x = fnRand(0,LGlobal.width-self.getWidth());
    self.y = -80;
    // 移动速度
    self.speed = 15;
    //显示到画面上
	self.bitmap = new LBitmap(bitmapData);
	self.addChild(self.bitmap);
}

/**
 * 循环
 * */
Enemy.prototype.onframe = function (){
	var self = this;
	//移动
    self.y += self.speed;
    if(self.y >= LGlobal.height){
        enemyLayer.removeChild(self);
        
    }
};




