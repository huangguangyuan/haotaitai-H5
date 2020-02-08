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
	self.bitmap = new LBitmap(new LBitmapData(imglist['enemy' + fnRand(1, 4)]));
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
    if(LGlobal.hitTestRect(self,player)){
        self.removeChild(self.bitmap);
        self.bitmap = new LBitmap(new LBitmapData(imglist['bomb2']));
        self.addChild(self.bitmap);
        backLayer.removeAllEventListener();
        clickType = 0
        showDialog({type:2,tip:'闯关失败',text:`<p>获得 ${scoreVal} 分；衣物尚未杀菌消毒彻底</p><p>仍需继续努力</p>
        Tips：出门戴口罩，回家勤洗手</p>室内常通风，健康你我他</p>`});      
    }
};




