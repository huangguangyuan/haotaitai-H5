
$('.start-btn').on('touchstart', function (e) {
    $('.home').hide();
    $('.game').show();
    init(1000 / 40, "mylegend", 750, 1484, main);
});

var loadingLayer, backLayer, gameLayer, bulletLayer, enemyLayer, bgLayer, magicLayer;
var player;
var mouseStartX, mouseStartY, mouseNowX, mouseNowY;
var MOVE_STEP = 20;
var frame = 0, frame2 = 0;
var imglist = {};
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
    }, gameInit)
}

function gameInit(result) {
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
    player = new Player(100, 150, bitmapData.width * 0.5, 0, bitmapData, 30);
    backLayer.addChild(player);
    player.setBullet(0);

    bulletLayer = new LSprite();
    backLayer.addChild(bulletLayer);

    enemyLayer = new LSprite();
    backLayer.addChild(enemyLayer);

    magicLayer = new LSprite();
    backLayer.addChild(magicLayer);

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
    if (frame++ < 20) return;
    frame = 0;
    var bitmapData = new LBitmapData(imglist['enemy' + fnRand(1, 4)]);
    var enemy = new Enemy(bitmapData);
    enemyLayer.addChild(enemy);
}
// 增加法术
function addMagic() {
    if (frame2++ < 50) return;
    frame2 = 0;
    if (fnRand(1, 3) == 1) {
        var bitmapData = new LBitmapData(imglist['magic1']);
        var magic = new Magic1(bitmapData);
    }else{
        var bitmapData = new LBitmapData(imglist['magic2']);
        var magic = new Magic2(bitmapData);
    }

    magicLayer.addChild(magic);
}






