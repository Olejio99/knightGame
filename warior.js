function Knight(x, y) {
	this.x = x;
	this.y = y;
	this.w = 0;
	this.h = 0;
	this.bottom = y;
	this.state = 'idle';
	this.lastState = 'idle';
	this.index = 0;
	this.frameCount = 0;
	// this.framePerSecond = 6;
	// this.lastDir = 0;
	this.dir = 0;
	this.speed = 6;
	this.hp = 100;
	this.mp = 100;
	this.view = 1;
	this.death = false;
	this.shieldOn = false;
	this.jumpOn = false;
	this.attackOn = false;
	this.runOn = false;
	this.walkOn = false;
	this.animeStop = false;
}
	let jumpCount = 0;
	let jumpLength = 50;
	let jumpHeight = 0;
	let attackCount = 0;

Knight.prototype.show = function(){
	if(this.state !== this.lastState){
		this.index = 0;
		this.lastState = this.state;
	}
	let spr = knightSpr[this.state];
    if(this.frameCount>spr.length){
		this.frameCount = 0;
		if (this.index + 1 === spr.length){
			this.animeStop = true;
		}
		this.index = (this.index + 1) % spr.length;
    }
    let a = spr[this.index].frame;
	this.w = a.w / 2.5;
	this.h = a.h / 2.5;
	// console.log(this.w, this.h)
    if(this.view === -1){
        ctx.save();
        // ctx.translate()
        ctx.scale(-1, 1);
		ctx.drawImage(app.atlases['knight'], a.x, a.y, a.w, a.h,
			-this.x-this.w, this.y, this.w, this.h );
        ctx.restore();
    }else {
		ctx.drawImage(app.atlases['knight'], a.x, a.y, a.w, a.h,
			this.x, this.y, this.w, this.h );
	}
	this.frameCount++;
}


Knight.prototype.move = function() {
	if (this.death) return;
	
	if ((this.dir === -1 && this.x <= 0) || 
	(this.dir === 1 && this.x + this.w >= width)) return;
	
	if(this.shieldOn)return;
	if(this.runOn){
		this.x += this.dir * this.speed;
		this.state = 'run';
	}else{
		this.state = 'idle'
	}
};

Knight.prototype.walk = function(){
	if(this.walkOn){
		this.x += this.dir * this.speed;
		this.state = 'walk';
	}
}

Knight.prototype.jump = function(){
	
	if(this.jumpOn){
		this.state = 'jump';
		jumpCount++;
		jumpHeight = 3*jumpLength*Math.sin(Math.PI*jumpCount/jumpLength);
		this.y = (this.bottom-12) - jumpHeight;
	}
	if(jumpCount>jumpLength){
		jumpCount=0;
    	this.jumpOn = false;
		jumpHeight=0;
		this.state = 'idle';
	}
}

Knight.prototype.die = function(){

	if(this.death){
		this.state = 'die'
		if(this.animeStop){
			this.death = false;
			this.animeStop = false;
			// app.endGame();
		}
	}
	// if(this.death){
	// 	this.state = 'die'
	// 	jumpCount++;
	// 	// console.log(ju)
	// }
	// if(jumpCount>=7){
	// 	jumpCount=0;
	// }
	
}

Knight.prototype.attack = function(type){

	if(this.attackOn){
		this.state = 'attack';
		attackCount++;
	}
	if(attackCount>jumpLength){
		for(let i = app.enemies.length - 1; i >=0; i--){
			let e = app.enemies[i];
			if(!e.aggress)continue;
			if(this.view == e.view)continue;
			if(e.punch(15)){
				app.enemies.splice(i,1)
				e.death = true;
			}
		}
		attackCount = 0;
		this.attackOn = false;
		this.state = 'idle';
	}
	if(type == '1'){
		if(app.swords.length > 2)return;
		app.swords.push(
			new Sword(this.x + this.w / 2, this.y + this.h / 2, this.view)
		);
	}
}

Knight.prototype.shielded = function(){

	if(this.shieldOn){
		this.state = 'idle';
		// let img = new Image;
		// img.src = 'img/shield.png';
		// shieldImg.img = img;

		if(this.view === -1){
			// ctx.scale(-1, 1);
			ctx.drawImage(app.atlases['shield'], this.x + 20, this.y, this.w , this.h);
		}else {
			ctx.drawImage(app.atlases['shield'], this.x - 20, this.y, this.w , this.h);
		}
		if(!this.shieldOn){
			ctx.clearRect(this.x - 20, this.y, this.w , this.h);
		}	
	}
}

Knight.prototype.addHp = function(n){
	if((this.hp >= 100 && n > 0) || this.death) return;

	this.hp += n;

	app.nodes.hp.node.style.width = `${this.hp}%`;
	app.nodes.hpVal.text(this.hp);

	if(this.hp <=0)this.death = true;
}

Knight.prototype.addMp = function(n){
	if(this.mp >= 100 && n > 0) return;
	if(this.mp <= 0 && n < 0){
		this.shieldOn = false;
		return;
	}
	this.mp +=n;

	app.nodes.mp.node.style.width = `${this.mp}%`;
	app.nodes.mpVal.text(this.mp);
	// app.setMp(this.mp);
}




// Knight.prototype.setState = function(s) {
// 	if(this.lastState !== s)this.index = 0;

// 	this.lastState = this.state;
// 	this.state = s;
// };


// Knight.prototype.setDir = function(n) {
//     if(n === 0) {
//         this.setState('idle');
//     }else if(n === -1){
//         this.view = -1
//         this.setState('run')
//     }else if(n === 1){
//         this.view = 1;
//         this.setState('run');
//     }
//     this.dir = n;
// };
