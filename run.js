var outerDiv;
var canvasDiv;
var ctx;
var cart;
var action=0;
var time = 0;
var episode = 1;
var record = 0;
var MainFrame = {
    WIDTH : 800,
    HEIGHT : 480
};
var ApparatusAction = {
    LEFT : -1,
    RIGHT : 1,
    NONE : 0
};
var timerID;
window.addEventListener('load',init())
function init() {
    chg3();
    episode = 1;
    time = 0;
    record = 0;
    timeUpdate();
    resultUpdate();
 //   outerDiv  = document.getElementById("outer");
 //   canvasDiv = document.getElementById("canvasContainer");
    document.onkeydown = onDocKeyDown;
    cart = new Apparatus(100, 50);
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        cart.init();
        cart.init2();
        cart.drawCart(ctx);
    }
};
function run() {
    timeUpdate();
        if (cart.isFailed()) {
            episode++;
            if(record<time){
                record = time;
                resultUpdate();
            }
            time=0;
            cart.init();
            cart.init2();
            cart.drawCart(ctx);
            action = ApparatusAction.NONE;
        } else {
            //action=0;
            //document.onkeydown=onDocKeyDown;
            cart.move(action);
            cart.drawCart(ctx);
            time++;
        }
}

// function run() {
//     timeUpdate();
//         if (cart.isMovable()) {
//             if (cart.isFailed()) {
//                 cart.move(action);
//                 cart.drawCart(ctx);
//             } else {
//                 cart.move(action);
//                 cart.drawCart(ctx);
//                 if (cart.isFailed()) {
//                     episode++;
//                     if(record<time){
//                         record = time;
//                     }
//                     resultUpdate();
//                 }
//                 time++;
//             }
//         } else {
//             time=0;
//             cart.init();
//             cart.drawCart(ctx);
//             action = ApparatusAction.NONE;
//         }
// };

function onDocKeyDown(e) {
    if (!e) e = window.event;
    if (e.key == "ArrowRight") {
        action = ApparatusAction.RIGHT;
    } else if (e.key == "ArrowLeft") {
        action = ApparatusAction.LEFT;
    } else {
        action=0;
    }
};

function chg1(){
    document.myForm.play.disabled = "true";
    document.myForm.pause.disabled = "";
    document.myForm.fast.disabled="true"
}
function chg2(){
    document.myForm.play.disabled = "true";
    document.myForm.fast.disabled = "true";
    document.myForm.pause.disabled = "";
}
function chg3(){
    document.myForm.play.disabled = "";
    document.myForm.fast.disabled = "";
    document.myForm.pause.disabled = "true";
}

function timeUpdate(){
    document.getElementById("time").innerHTML = "time: "+time;
}
function resultUpdate(){
    document.getElementById("record").innerHTML = "record: "+record;
}