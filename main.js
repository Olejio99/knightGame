let width, height, halfWidth, halfHeight, canv, ctx;
requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame;
function App(){
    this.nodes = {};
    this.nodes.screenStart = new Node('.screen-start');
    this.nodes.startBtn = new Node('#startBtn');
    this.nodes.playerName = new Node('#playerName');
    this.nodes.userName = new Node('.user-info');
    this.nodes.hp = new Node('.panel-hp > .score-value');
	this.nodes.hpVal = new Node('.panel-hp > .score-value > span');
	this.nodes.mp = new Node('.panel-mp > .score-value');
    this.nodes.mpVal = new Node('.panel-mp > .score-value > span');
    this.nodes.skillOne = new Node('.one > span');
    this.nodes.skillTwo = new Node('.two > span');
    // this.nodes.screenGame = new Node('.screen-game');
    
    
    canv = document.createElement('canvas');
    canv.width = width = window.innerWidth;
    canv.height = height = window.innerHeight;;
    document.body.appendChild(canv);
    ctx = canv.getContext('2d');

    
    this.groundY = height-(height*0.11);
    
    this.player = new Knight(0, this.groundY - 150 ); 
    this.enemies = [];
    this.swords = [];
    this.atlases = [];
    this.name = '';
    this.gameOver = false;
    
    this.loadAtlas('knight', 'img/player/KnightFinal.png');
    this.loadAtlas('shield', 'img/skills/shield.png');
    this.loadAtlas('sword', 'img/skills/skill-sword.png');
    this.loadAtlas('skeleton', 'img/player/skeleton.png')
    this.loadAtlas('dog','img/player/dog.png')
    this.loadAtlas('scorpion','img/player/scorpion.png')

    // setTimeout(() => {
    //     this.loop();
    // }, 100);
    // this.nodes.screenStart.hide();

    this.nodes.startBtn.addEvent('click', (e) => {
        e.preventDefault();

        this.startGame();
    });
}

App.prototype.startGame = function(){
    this.nodes.screenStart.hide();
    this.name = this.nodes.playerName.val();
    this.nodes.userName.text(this.name);


    document.addEventListener('keydown', (e) => {
		if (e.keyCode == 37) {
            this.player.view = this.player.dir  = -1;
            this.player.runOn = true;
            this.player.shieldOn = false;
        } else if (e.keyCode == 39) {
            this.player.view = this.player.dir  = 1;
            this.player.runOn = true;
            this.player.shieldOn = false;
		} else if (e.keyCode == 50) {
			this.player.shieldOn = true;
		}else if(e.keyCode ==38 ){
            this.player.jumpOn = true;
            this.player.shieldOn = false;
        }
    });

    document.addEventListener('keyup', (e) => {
		if (e.keyCode == 37 || e.keyCode == 39 ) {
            this.player.dir = 0;
            this.player.runOn = false;
		} else if (e.keyCode == 49) {
            this.player.attackOn = true;
            this.player.attack();
		} else if (e.keyCode == 50) {
			this.player.shieldOn = false;
		} else if (e.keyCode == 51) {
            // this.player.attackOn = true;
            this.player.attack(1);
            this.player.shieldOn = false;            
		}else if(e.keyCode == 38){
        }
    });
    
    // document.addEventListener('click', (e) => {
	// 	console.log(e.clientX, e.clientY);
	// });

    this.interval = setInterval(() => {
		this.addEnemy();

        if(this.player.shieldOn){
            this.player.addMp(-10)
        }else{
            this.player.addMp(5)
        }
	}, 1000);

	this.loop();
}



App.prototype.loadAtlas = function(master, atlas) {
    let img = new Image();
    img.src = atlas;
    this.atlases[master] = img;
    // img.onload = ()=> {
        
    // } 
}

App.prototype.draw = function(){
    
    ctx.clearRect(0, 0,width, height);
    this.player.show();
    this.player.move();
    this.player.jump();
    this.player.attack();
    this.player.shielded();
    this.player.die();
    
    for(let i = 0; i < this.swords.length; i++){
        this.swords[i].flight();
        this.swords[i].show();
        if(this.swords[i].x > width || this.swords[i].x < 0){
            this.swords.splice(i, 1)
        }
    }

    // for (let i = this.enemies.length-1; i >= 0; i--){
    //     let enemy = this.enemies[i];
    //     enemy.showHp();
	// 	enemy.show();
    //     enemy.move();
    //     enemy.attack();
    // }

    for(let j = 0; j < this.enemies.length; j++){
        let enemy = this.enemies[j];
        enemy.die(j);
        // if(enemy.die()){
        //     this.enemies.splice(j, 1);
        // }
        enemy.showHp();
		enemy.show();
        enemy.move();
        enemy.attack();
        

        for (let i = 0; i < this.swords.length; i++) {
            let sword = this.swords[i];
            sword.hit(enemy.x);
            
            if (sword.hitting) {
                if(enemy.punch(sword.power)){
                    enemy.death = true;
                    this.swords.splice(i, 1)
                    break;
                }
                this.swords.splice(i, 1)
                sword.hitting = false;
            }  
            
        }
    }
}


App.prototype.loop = function(){
    if(this.gameOver) return;
    // console.log(222)
     
    this.draw();
    requestAnimationFrame(() => {
		this.loop();
          // this.enemyHpshow();
	});
}

App.prototype.addEnemy = function() {
	if (this.enemies.length >= 1) return;

	// let r = this.randInt(0, 2);
	let r = 2;

	if (r == 0) {
        this.enemies.push(new Dog());
    }
    
    if(r == 1){
        this.enemies.push(new Skeleton());
    }

    if(r == 2){
        this.enemies.push(new Scorpion());
    }
};

App.prototype.endGame = function(){
    this.gameOver = true;
    console.log(111)
    clearInterval(this.interval);
}

App.prototype.randInt = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};

let app = new App();