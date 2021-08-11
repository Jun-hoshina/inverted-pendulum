//Apparatus
var Apparatus = function(width, height) {
	//this.scale = 100.0;
	this.width = 100;
	this.height = 50;
	this.color = "rgb(31, 191, 191)";
	this.init();
	this.init2();
};
Apparatus.prototype.init2= function() {
	doc=document.ele.elements;
	this.scale = Number(doc[0].value);
    this.M = Number(doc[1].value); // [kg]
	this.m = Number(doc[2].value); // [kg]
	this.l = Number(doc[3].value); // [m]
	this.g = Number(doc[4].value); // [m/sec^2]
	this.f = Number(doc[5].value); // [N]
	// console.log(this.M);
	// this.scale = 100.0;
    // this.M = 1.0; // [kg]
	// this.m = 1.0; // [kg]
	// this.l = 0.8; // [m]
	// this.g = 9.8; // [m/sec^2]
	// this.f = 10.0; // [N]
	// console.log(this.M);
};


Apparatus.prototype.init = function() {
	this.x0 = MainFrame.WIDTH / 2.0;
	this.y0 = MainFrame.HEIGHT - this.height - 160;
	this.x = 0.0;
	//this.margin = 4;
	this.dx = 0.0;
	this.theta = Math.random() * 0.02 - 0.01;
	this.dtheta = 0.0;
	this.failed = false;
	//this.M = 1.0; // [kg]
	//this.m = 1.0; // [kg]
	//this.l = 0.8; // [m]
	//this.g = 9.8; // [m/sec^2]
	this.tau = 0.02; // [sec]
	//this.f = 10.0; // [N]
}

Apparatus.prototype.move = function(action) {
	var ff = this.f * action
	var sinTheta = Math.sin(this.theta);
	var cosTheta = Math.cos(this.theta);
	var tmp1 = ff + this.m * this.l * sinTheta * this.dtheta * this.dtheta;
	var tmp2 = this.M + this.m * sinTheta * sinTheta;
	var ddx = (tmp1 - this.m * this.g * sinTheta * cosTheta) / tmp2;
	var ddtheta = (this.M * this.g * sinTheta - cosTheta * tmp1) / (this.l * tmp2);
	this.x += this.dx * this.tau;
	this.dx += ddx * this.tau;
	this.theta += this.dtheta * this.tau;
	this.dtheta += ddtheta * this.tau;
	var tmpx = this.x0 + this.x * this.scale;
	this.failed =tmpx - this.width / 2 < 0||tmpx + this.width / 2 >= MainFrame.WIDTH||Math.cos(this.theta)<=0;
	// this.failed = this.failed || tmpx - this.width / 2 < 0;
	// this.failed = this.failed || tmpx + this.width / 2 >= MainFrame.WIDTH;
	// this.failed = this.failed || Math.cos(this.theta) <= 0;
};

Apparatus.prototype.getX = function() {
	return this.x * this.scale;
};

Apparatus.prototype.isMovable = function() {
	return Math.cos(this.theta) > 0;
};

Apparatus.prototype.isFailed = function() {
	return this.failed;
};

Apparatus.prototype.drawCart = function(ctx) {
	var tmpx = this.x0 + this.x * this.scale - this.width / 2.0;
	var tmpy = this.y0;
	var r = this.height / 5.0;
	ctx.globalCompositeOperation = "source-over";
	ctx.clearRect(0,0,MainFrame.WIDTH,MainFrame.HEIGHT);
    // ctx.fillStyle = "rgb(255, 255, 255)";
    // ctx.fillRect(0, 0, MainFrame.WIDTH, MainFrame.HEIGHT);
    ctx.fillStyle = "rgb(191, 191, 191)";
    ctx.fillRect(0, tmpy+this.height, MainFrame.WIDTH, MainFrame.HEIGHT - tmpy - this.height);
	ctx.fillStyle = "rgb(31, 191, 191)";
	ctx.fillRect(tmpx, tmpy, this.width, this.height - r);
	ctx.fillStyle = "rgb(127, 127, 127)";
	ctx.beginPath();
	ctx.arc(tmpx + this.width/4.0, tmpy + this.height - r, r, 0.0, Math.PI*2.0, true);
    ctx.fill();
	ctx.beginPath();
	ctx.arc(tmpx + 3*this.width/4.0, tmpy + this.height - r, r, 0.0, Math.PI*2.0, true);
    ctx.fill();
	// r -= this.margin;
	// ctx.fillStyle = "rgb(191, 191, 191)";
	// ctx.beginPath();
	// ctx.arc(tmpx + this.width/4.0, tmpy + this.height - r - this.margin, r, 0.0, Math.PI*2.0, true);
    // ctx.fill();
	// ctx.beginPath();
	// ctx.arc(tmpx + 3*this.width/4.0, tmpy + this.height - r - this.margin, r, 0.0, Math.PI*2.0, true);
    // ctx.fill();
	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(tmpx + this.width / 2.0, tmpy);
	ctx.lineTo(tmpx + this.width / 2.0 + 2.0 * this.l * this.scale * Math.sin(this.theta),
		tmpy - 2.0 * this.l * this.scale * Math.cos(this.theta));
	ctx.stroke();
};

