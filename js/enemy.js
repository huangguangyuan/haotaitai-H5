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
        showDialog({type:2,tip:'闯关失败',text:`获得 ${scoreVal} 分；衣物尚未杀菌消毒彻底仍需继续努力
        Tips：出门戴口罩，回家勤洗手\n室内常通风，健康你我他`});
    }
};




