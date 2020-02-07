/*
** boss类
*/
function Boss(){
    base(this,LSprite,[]);
    var self = this;
    self.y = -150;
    self.x = 0;
    self.hp = 600;
    self.speed = 5;
    self.isDie = false;
    self.bitmap = new LBitmap(new LBitmapData(imglist['boss']));
    self.addChild(self.bitmap);
}
Boss.prototype.onframe = function(){
    var self = this;
    self.y += 5;
    self.x += self.speed;
    if(self.x >= LGlobal.width - self.bitmap.getWidth()){
        self.speed *= -1;
    }else if(self.x <= 0){
        self.speed *= -1;
    }
    if(self.y >= 300){
        self.y = 300;
    }
}