/******************************************/
/**
 * 子弹类 
 * */
/******************************************/
var isOnes = true;
function Bullet(params) {
    base(this, LSprite, []);
    var self = this;
    //出现位置
    self.x = params.x;
    self.y = params.y;
    //xy轴速度
    self.xspeed = params.xspeed;
    self.yspeed = params.yspeed;
    self.belong = params.belong;
    self.isdie = false;
    //子弹图片
    self.bitmap = new LBitmap(params.bitmapData);
    //显示
    self.addChild(self.bitmap);
}
/**
 * 循环
 * */
Bullet.prototype.onframe = function () {
    var self = this;
    //子弹移动
    self.x += self.xspeed;
    self.y += self.yspeed;
    //子弹位置检测
    if (self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height) {
        //从屏幕移除
        bulletLayer.removeChild(self);
    }
    var key,plain;
    for(key in enemyLayer.childList){
        plain = enemyLayer.childList[key];
        if(LGlobal.hitTestArc(self,plain)){
            self.bitmap.bitmapData = new LBitmapData(imglist["bomb"]);
            enemyLayer.removeChild(plain);
            createjs.Sound.play("bomb");
            setTimeout(() => {
                bulletLayer.removeChild(self);
            }, 200);
            scoreVal += 5;
            scoreTxt.text = scoreVal;
        }
        if(LGlobal.hitTestRect(self,boss)){
            self.bitmap.bitmapData = new LBitmapData(imglist["bomb2"]);
            createjs.Sound.play("bomb");
            boss.hp -= 0.5;
            if(boss.hp < 0){
                if(isOnes){
                    backLayer.removeAllEventListener();
                    boss.remove();
                    boss.isDie = true;
                    scoreVal += 200;
                    scoreTxt.text = scoreVal;
                    showDialog({type:2,tip:'闯关成功',text:`
                    <p>获得 ${scoreVal} 分与一次抽奖机会</p>
                    <p>Tips：手机钥匙等随时物品也要</p>
                    <p>记得消毒喔~</p>`});
                    clickType = 1;
                    isOnes = false;
                }
            }
            setTimeout(() => {
                bulletLayer.removeChild(self);
            }, 200);
        }
    }
};
