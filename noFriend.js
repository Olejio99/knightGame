class Enemy{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.dir = 0;
        this.state = '';
        this.lastState = ''
        this.index = 0;
        this.frameCount = 0;
        this.speed = 0;
        this.view = 0;
        this.power = 0;
        this.hp = 0;
        this.w = 0;
        this.h = 0;
        this.attackCount = 0;
        this.attackSpeed = 50;
        this.dieCount = 0;
        this.dieSpeed = 40;
        this.aggress = false;
        this.death = false;
        this.animeStop = false;
    }

    move(){
        let pl = app.player;
        this.state = 'run';
        if(pl.view == -1){

            if(this.x + 10 < pl.x ){
                this.view = 1;
                this.x += this.speed;
                this.aggress = false;
            }else if(this.x - pl.w + 10 > pl.x ){
                this.view = -1;
                this.x += -this.speed;
                this.aggress = false;
            }else{
                this.aggress = true;
            }
        }else if(pl.view == 1){
            if(this.x + this.w - 10 < pl.x ){
                this.view = 1;
                this.x += this.speed;
                this.aggress = false;
            }else if(this.x + 10 > pl.x + pl.w / 2 ){
                this.view = -1;
                this.x += -this.speed;
                this.aggress = false;
            }else{
                this.aggress = true;
            }
        }
    }

    showHp(hp){
        let color = 'green';
        
        var hpMax = hp;
        // console.log('testSuccess');
        ctx.beginPath();
        ctx.rect(this.x + 5, this.y - 25, this.w/2, 10);
        ctx.fillStyle =  "rgba(255,255,255,0.1)";
        ctx.fill();
                 
        // console.log(hp, this.hp)
        if(this.hp < hpMax){
            color = 'orange';
        }else if(this.hp < hpMax / 2){
            color = 'red'
        }
        ctx.beginPath();
        ctx.rect(this.x + 5, this.y - 25, this.w/2, 10);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

    }

    attack(s){
        let pl = app.player;
        if(this.aggress){
            if(!pl.death && !pl.shieldOn && this.attackCount >= this.attackSpeed){
                pl.addHp(-this.power);
                this.attackCount = 0;
            }
            this.attackCount++;
            this.state = s;
        }
    }

    punch(n){
        this.hp -=n;
        return this.hp <=0;
    }

    die(n){
        if(this.death){
            this.state = 'die'
            if(this.animeStop){
                this.death = false;
                this.animeStop = false;
                app.enemies.splice(n,1)
            }
        }
    }

    // setState(s){
    //     if(this.lastState !== s)this.index = 0;

    //     this.lastState = this.state;
    //     this.state = s;
    // }
}


class Skeleton extends Enemy{
    constructor(){
        let state = 'idle';
        super(width, app.groundY - skeletonSpr[state][0].frame.h + 10);
        this.state = state;
        this.speed = 2;
        this.hp = 1;
        this.power = 1;
        this.view = -1;
    }
    
    show(){
        if(this.state !== this.lastState){
            this.index = 0;
            this.lastState = this.state;
        }
        let spr = skeletonSpr[this.state];
        if(this.frameCount > spr.length){
            this.frameCount = 0;
            if(this.death){
                if (this.index + 1 === spr.length - 1) this.animeStop = true;
            }
            this.index = (this.index + 1) % spr.length;
        }
        let a = spr[this.index].frame;
        
        this.w = a.w ;
        this.h = a.h ;
        
        if(this.view === -1){
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(app.atlases['skeleton'], a.x, a.y, a.w, a.h,
            -this.x-this.w, this.y, this.w, this.h );
            ctx.restore();
          
        }else {
            ctx.drawImage(app.atlases['skeleton'], a.x, a.y, a.w, a.h,
            this.x, this.y, this.w, this.h );
            
        }
        this.frameCount++;
    }
    
    attack(){
        super.attack('attack');
    }
    
    // die(){
    //         super.die(n);
    //     }
        
    }
    
    
    // function enemyHpshow() {
        //     console.log(this.enemy(x,y));
        //     // this.enemy(x,y)
        // }
        
        class Dog extends Enemy{
            constructor(){
                let state = 'run';
                super(width, app.groundY - spritesDog[state][0].frame.h + 10);
                this.state = state;
                this.speed = 4;
                this.hp = 1;
                this.power = 1;
                this.view = -1;
            }
            
            show(){
                let spr = spritesDog[this.state];
                if(this.frameCount>spr.length){
                    this.frameCount = 0;
                    this.index = (this.index + 1) % spr.length;
                }
                let a = spr[this.index].frame;
                
                this.w = a.w ;
                this.h = a.h ;
                
                if(this.view === -1){
                    
                    ctx.save();
                    // ctx.translate()
                    ctx.scale(-1, 1);
                    ctx.drawImage(app.atlases['dog'], a.x, a.y, a.w, a.h,
                    -this.x-this.w, this.y, this.w, this.h );
                    ctx.restore();
                }else {
                    ctx.drawImage(app.atlases['dog'], a.x, a.y, a.w, a.h,
                    this.x, this.y, this.w, this.h );
                }
                this.frameCount++;
            }
            
            attack(){
                super.attack('run');
            }
            
            showHp(){
                let hp = this.hp;
                super.showHp(hp);
            }
        }
        
 class Scorpion extends Enemy{
    constructor(){
        let state = 'run';
        super(width, app.groundY - scorpionSpr[state][0].frame.h + 10);
        this.state = state;
        this.speed = 2;
        this.hp = 1;
        this.power = 1;
        this.view = -1;
    }
    
    show(){
        if(this.state !== this.lastState){
            this.index = 0;
            this.lastState = this.state;
        }
        let spr = scorpionSpr[this.state];
        if(this.frameCount > spr.length){
            this.frameCount = 0;
            if(this.death){
                if (this.index + 1 === spr.length - 1) this.animeStop = true;
            }
            this.index = (this.index + 1) % spr.length;
        }
        let a = spr[this.index].frame;
        
        this.w = a.w ;
        this.h = a.h ;
        
        if(this.view === -1){
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(app.atlases['scorpion'], a.x, a.y, a.w, a.h,
            -this.x-this.w, this.y, this.w, this.h );
            ctx.restore();
          
        }else {
            ctx.drawImage(app.atlases['scorpion'], a.x, a.y, a.w, a.h,
            this.x, this.y, this.w, this.h );
            
        }
        this.frameCount++;
    }
    
    attack(){
        super.attack('attack');
    }
 }       
        
        
        
        
        
        
        
        
        
        
        



























// function Enemy(x,y, mob){
//     this.x = x;
//     this.y = y;
//     this.state = 'idle';
//     this.sprState = dogRun;
//     this.index = 0;
//     this.frameCount = 0;
//     this.dir = 0;
//     this.speed = 2;
//     this.view = -1;
//     this.power = 5;
//     this.mob = 'dog';

// }

// Enemy.prototype.show = function(){
// 	if(this.state === 'idle')sprState = dogRun;
// 	if(this.state === 'run' && this.dir !=0)sprState = DogRun;
// 	if(this.state === 'attack')sprState = DogAttack;
// 	if(this.state === 'die')sprState = DogDie;
// 	if(this.state ==='jump')sprState = DogJump;
//     if(this.frameCount>7){
//         this.frameCount = 0;
// 		this.index = (this.index + 1) % sprState.frames.length;
//     }
//     let a = sprState.frames[this.index].frame;
// 	this.w = a.w;
// 	this.h = a.h;

//     if(this.view === -1){
//         ctx.save();
//         // ctx.translate()
//         ctx.scale(-1, 1);
// 		ctx.drawImage(dog.img, a.x, a.y, a.w, a.h,
// 			-this.x-this.w, this.y, this.w, this.h );
//         ctx.restore();
//     }else {
// 		ctx.drawImage(dog.img, a.x, a.y, a.w, a.h,
// 			this.x, this.y, this.w, this.h );
// 	}
// 	this.frameCount++;
// }

// // Enemy.prototype.loadAtlas = function(atlas) {
// //     let img = new Image();
// //     img.onload = ()=> {
        
// //     } 
// //     img.src = 'img/dogg.png';
// //     this.knight.img = this.enemySpr.img = img;
// //     // if(atlas == this.enemySpr){
// //     //     console.log(1)
// //     //     img.scr = 'img/dogg.png';
// //     //     this.enemySpr.img = img;
// //     // }
// //     // this.enemy.img = img
// //     // this.knight.atlas = atlas;
// // }