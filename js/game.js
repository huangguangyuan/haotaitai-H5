
$('.start-btn').on('touchstart', function (e) {
    $('.home').hide();
    $('.dialog-rule').show();
});
$('.ruleclosebtn').on('touchstart',function(e){
    $('.game').show();
    $('.dialog-rule').hide();
    init(1000 / 40, "mylegend", 750, 1484, main);
})

$(function() {
	createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("./music/zero.wav", "zero"); 
    createjs.Sound.registerSound("./music/three.wav", "three"); 
    createjs.Sound.registerSound("./music/bomb.mp3", "bomb"); 
});

var loadingLayer, backLayer, gameLayer, bulletLayer, enemyLayer, bgLayer, magicLayer;
var scoreLayer,scoreTxt;
var player,boss;
var mouseStartX, mouseStartY, mouseNowX, mouseNowY;
var MOVE_STEP = 20;
var frame = 0, frame2 = 0;
var imglist = {};
var scoreVal = 0;

/**
 * 子弹类型数组
 * 【开始角度，增加角度，子弹速度，角度加速度，子弹总数，发动频率，枪口旋转】
 * */
var bulletList = new Array(
    { startAngle: -90, angle: 20, step: 10, speed: 15, count: 1 },//1发
    { startAngle: -110, angle: 20, step: 10, speed: 15, count: 3 },//3发
    { startAngle: -40, angle: 20, step: 10, speed: 15, count: 5 },//5发
    { startAngle: 0, angle: 20, step: 10, speed: 15, count: 18 },//环发
    { startAngle: 180, angle: 20, step: 50, speed: 15, count: 1 },//1发
    { startAngle: 160, angle: 20, step: 50, speed: 15, count: 3 },//3发
    { startAngle: 140, angle: 20, step: 50, speed: 15, count: 5 }//5发
);
var imgData = [
    { name: "game-bg", path: "./img/game-bg.jpg" },
    { name: "player", path: "./img/player.png" },
    { name: "enemy1", path: "./img/enemy1.png" },
    { name: "enemy2", path: "./img/enemy2.png" },
    { name: "enemy3", path: "./img/enemy3.png" },
    { name: "bullet", path: "./img/bullet.png" },
    { name: "bullet2", path: "./img/bullet2.png" },
    { name: "remove", path: "./img/remove.png" },
    { name: "magic1", path: "./img/magic1.png" },
    { name: "magic2", path: "./img/magic2.png" },
    { name: "magic3", path: "./img/magic3.png" },
    { name: "bomb", path: "./img/bomb.png" },
    { name: "bomb2", path: "./img/bomb2.png" },
    { name: "score-bg", path: "./img/score-bg.png" },
    { name: "boss", path: "./img/boss.png" },
]
function main() {
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT; //设置全屏变量
    LGlobal.screen(LStage.FULL_SCREEN); //设置全面适应
    backLayer = new LSprite();
    backLayer.graphics.drawRect(1, "#98c2e1", [0, 0, LGlobal.width, LGlobal.height], true, "#98c2e1");
    addChild(backLayer);
    loadingLayer = new LoadingSample3();
    backLayer.addChild(loadingLayer);
    LLoadManage.load(imgData, function (progress) {
        loadingLayer.setProgress(progress);
    }, readyFn)
}

function readyFn(result){
    $('.ready').show();
    
    var downNum = 3;
    var timer = setInterval(() => {
        createjs.Sound.play("three");
        downNum --;
        $('.ready h5').text(downNum);
        if(downNum <= 0){
            $('.ready h5').text('Ready Go');
            createjs.Sound.stop("three");
            createjs.Sound.play("zero");
            setTimeout(function(){
                $('.ready').hide();
                gameInit();
            },1000);
            clearInterval(timer);
        }
    }, 1000);

    // 取得图片读取结果
    LGlobal.setDebug(true);
    imglist = result;
    backLayer.removeChild(loadingLayer);
    loadingLayer = null;

    bgLayer = new LSprite();
    bgLayer.bitmap = new LBitmap(new LBitmapData(imglist['game-bg']));
    bgLayer.addChild(bgLayer.bitmap);
    backLayer.addChild(bgLayer);

    var bitmapData = new LBitmapData(imglist['player']);
    player = new Player((LGlobal.width - bitmapData.width)/2, LGlobal.height - bitmapData.height - 100, bitmapData.width * 0.5, 0, bitmapData, 30);
    backLayer.addChild(player);
    player.setBullet(0);

    bulletLayer = new LSprite();
    backLayer.addChild(bulletLayer);

    enemyLayer = new LSprite();
    backLayer.addChild(enemyLayer);

    magicLayer = new LSprite();
    backLayer.addChild(magicLayer);

    boss = new Boss();
    backLayer.addChild(boss);

    scoreLayer = new LSprite();
    scoreLayer.bitmap = new LBitmap(new LBitmapData(imglist['score-bg']));
    scoreLayer.bitmap.x = LGlobal.width - scoreLayer.bitmap.getWidth() - 20;
    scoreLayer.bitmap.y = 180;
    scoreLayer.addChild(scoreLayer.bitmap);
    backLayer.addChild(scoreLayer);

    scoreTxt = new LTextField();
    scoreTxt.x = LGlobal.width - scoreLayer.bitmap.getWidth() + 60;
    scoreTxt.y = 202;
    scoreTxt.text = scoreVal;
    scoreTxt.size = 30;
    scoreTxt.color = '#fde78e';
    scoreTxt.weight = 'bolder';
    backLayer.addChild(scoreTxt);
    
}

function gameInit() {
    backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, ondown);
    backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, onmove);
    backLayer.addEventListener(LMouseEvent.MOUSE_UP, onup);
}
/*
** 循环
*/
function onframe() {
    player.onframe();
    if(scoreVal >= 300){
        boss.onframe();
    }
    var key;
    for (key in bulletLayer.childList) {
        bulletLayer.childList[key].onframe();
    }
    addEnemy();
    for (key in enemyLayer.childList) {
        enemyLayer.childList[key].onframe();
    }

    addMagic();
    for (key in magicLayer.childList) {
        magicLayer.childList[key].onframe();
    }

    if (!player.canshoot) return;
    if (player.x - player.downX > mouseNowX - mouseStartX) {
        player.x -= MOVE_STEP;
        if (player.x - player.downX < mouseNowX - mouseStartX) {
            player.x = mouseNowX - mouseStartX + player.downX;

        }
    } else if (player.x - player.downX < mouseNowX - mouseStartX) {
        player.x += MOVE_STEP;
        if (player.x - player.downX > mouseNowX - mouseStartX) {
            player.x = mouseNowX - mouseStartX + player.downX;
        }
    }
    if (player.y - player.downY > mouseNowY - mouseStartY) {
        player.y -= MOVE_STEP;
        if (player.y - player.downY < mouseNowY - mouseStartY) {
            player.y = mouseNowY - mouseStartY + player.downY;
        }
    } else if (player.y - player.downY < mouseNowY - mouseStartY) {
        player.y += MOVE_STEP;
        if (player.y - player.downY > mouseNowY - mouseStartY) {
            player.y = mouseNowY - mouseStartY + player.downY;
        }
    }
    if (player.x < 0) {
        player.x = 0;
        setCoordinate(mouseNowX, mouseNowY);
    } else if (player.x + player.getWidth() > LGlobal.width) {
        player.x = LGlobal.width - player.getWidth();
        setCoordinate(mouseNowX, mouseNowY);
    }
    if (player.y < 0) {
        player.y = 0;
        setCoordinate(mouseNowX, mouseNowY);
    } else if (player.y + player.getHeight() > LGlobal.height) {
        player.y = LGlobal.height - player.getHeight();
        setCoordinate(mouseNowX, mouseNowY);
    }
}

function ondown(event) {
    player.canshoot = true;
    setCoordinate(event.offsetX, event.offsetY);
}
function setCoordinate(x, y) {
    mouseStartX = mouseNowX = x;
    mouseStartY = mouseNowY = y;
    player.downX = player.x;
    player.downY = player.y;
}
function onmove(event) {
    if (!player.canshoot) return;
    mouseNowX = event.offsetX;
    mouseNowY = event.offsetY;
}
function onup(event) {
    player.canshoot = false;
}
// 增加敌人
function addEnemy() {
    if (frame++ < 10) return;
    frame = 0;
    var enemy = new Enemy();
    enemyLayer.addChild(enemy);
}
// 增加法术
function addMagic() {
    if (frame2++ < 300) return;
    frame2 = 0;
    var type = fnRand(1, 4);
    if (type == 1) {
        var bitmapData = new LBitmapData(imglist['magic1']);
        var magic = new Magic1(bitmapData);
    }else if(type == 2){
        var bitmapData = new LBitmapData(imglist['magic2']);
        var magic = new Magic2(bitmapData);
    }else{
        var bitmapData = new LBitmapData(imglist['magic3']);
        var magic = new Magic3(bitmapData);
    }

    magicLayer.addChild(magic);
}






