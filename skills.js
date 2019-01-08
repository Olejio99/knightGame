class Skill{
    constructor(x, y, dir){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.w = 50;
        this.h = 50;
        this.count = 0;
        this.speed = 0;
        this.power = 0;
        this.hitting = false;
    }
    flight(){
        this.x += this.dir * this.speed;
    }

    hit(target){
        if(target <= this.x) return this.hitting = true;

        // return ((target.x < this.x &&  this.x < target.x + target.w )||
        // (target.x < this.x + this.w && this.x + this.w < target.x + target.w));
    }
}

class Sword extends Skill{
    constructor(x, y, dir){
        super(x, y, dir);
        this.speed = 15;
        this.power = 2;
        this.count = 3;
    }
    show(){
        if (this.dir == -1) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(app.atlases['sword'], -this.x, this.y, this.w, this.h);
            ctx.restore();
    
        } else {
            ctx.drawImage(app.atlases['sword'], this.x, this.y, this.w, this.h);
        }
    }

    flight(){
        super.flight();
        // this.x += this.dir * this.speed;
    }

    // hit(target){
    //     // console.log(target)
    //     super.hit(target);
    // }
}