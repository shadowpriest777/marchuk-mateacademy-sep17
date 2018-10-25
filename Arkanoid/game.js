const game = {
    width: 1024,
    height: 576,
    ctx: undefined,
    platform: undefined,
    fireball: undefined,
    rows: 4,
    cols: 6,
    running: true,
    score: 0,
    blocks: [],
    sprites: {
        background: undefined,
        platform : undefined,
        fireball: undefined,
        blocks: undefined
    },
    init: function(){
        let canvas = document.getElementById('app');
        this.ctx = canvas.getContext('2d');
 
        window.addEventListener('keydown', function(e){
            if ( e.keyCode == 37){
                game.platform.dx = -game.platform.velocity
            } else if ( e.keyCode == 39 ){
                game.platform.dx = game.platform.velocity
            } else if ( e.keyCode == 32 ){ 
                game.platform.releaseBall();
            }
        });
         window.addEventListener('keyup', function(e){
            game.platform.stop();
        });
    },
    load: function(){
        for (let key in this.sprites){
            this.sprites[key] = new Image();
            this.sprites[key].src = 'images/' + key + '.png';
        }
    },
    create: function(){
        for (let row = 0; row < this.rows; row++){
            for (let col = 0; col < this.cols; col++){
                this.blocks.push({
                    x: 160 * col + 30,
                    y: 52 * row + 20,
                    width: 150,
                    height: 45,
                    isAlive: true
                });
            }
        }
    },
    start: function(){
        this.init();
        this.load();
        this.create();
        
        this.run();
    },
    render: function(){
        this.ctx.clearRect(0, 0, this.width, this.height); // очищает холст перед отрисовкой нового состояния
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);          
        this.ctx.drawImage(this.sprites.fireball, this.fireball.width * this.fireball.frame, 0, this.fireball.width, this.fireball.height, this.fireball.x, this.fireball.y, this.fireball.width, this.fireball.height); 
    
        this.blocks.forEach(function(element){
            if(element.isAlive){
               this.ctx.drawImage(this.sprites.blocks, element.x, element.y);
            }
        }, this);
        
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "#ffffff"
        this.ctx.fillText("SCORE: " + this.score, 15, this.height - 15)
    },
    update: function(){
      if ( this.fireball.collide(this.platform)){
            this.fireball.bumpPlatform(this.platform);
        }
        
       if ( this.platform.dx ){
            this.platform.move();
       }
        if ( this.fireball.dx  || this.fireball.dy){
            this.fireball.move();
       }
        
        this.blocks.forEach(function(element){
            if(element.isAlive){
                if ( this.fireball.collide(element)){
                    this.fireball.bumpBlock(element);
                }
            } 
        }, this);
        
        this.fireball.checkBounds();
    },
    run: function(){
        this.update(); //обновить информацию
        this.render(); //нарисовать с учетом обновлений
        
        if(this.running){
            window.requestAnimationFrame(function(){  //показать на экране
                game.run();
            });
        }
     
    },
    over: function(message){
        alert(message);
        this.running = false;
        window.location.reload();
    },
};

game.fireball = {
    width: 65,
    height: 65, 
    frame: 0,
    x: 460,
    y: 455, 
    velocity: 3,
    dx: 0,
    dy: 0,
    jump: function(){
        this.dy = -this.velocity;
        this.dx = -this.velocity;
        this.animate();
    },
    animate: function(){
        setInterval(function(){
            ++game.fireball.frame;
            if(game.fireball.frame > 3){
                game.fireball.frame = 0;
            }    
      }, 100);
       
    },
    move: function(){
        this.x += this.dx;
        this.y += this.dy;
    },
    collide: function(element){
       let x = this.x + this.dx;
       let y = this.y + this.dy;
        
        if ( x + this.width > element.x &&
            x < element.x + element.width &&
            y + this.height > element.y &&
            y < element.y + element.height
           ) {
            return true;
        }  
         return false;
    },
    onTheLeftSide: function(platform){
        return (this.x + this.width / 2) < (platform.x + platform.width / 2);
    },
    bumpBlock: function(block){
        this.dy *= -1;
        block.isAlive = false;
        ++game.score;
        
        if (game.score >= game.blocks.length){
            game.over("You Win!");
        }
    },
    bumpPlatform: function(platform){
        this.dy = -this.velocity;
        this.dx = this.onTheLeftSide(platform) ? -this.velocity : this.velocity;
    },
    checkBounds: function(){
        let x = this.x + this.dx;
        let y = this.y + this.dy; 
        
        if (x < 0){
            this.x = 0;
            this.dx = this.velocity;
            
        } else if (x + this.width > game.width) {
            this.x = game.width - this.width;
            this.dx = -this.velocity;
            
        } else if (y < 0) {
            this.y = 0;
            this.dy = this.velocity;
        } else if (y + this.height > game.height) {
           game.over("Game Over");
        }
    },
}; 

game.platform = {
    width: 245,
    height: 35, 
    x: 370,
    y: 520,
    velocity: 5,
    dx: 0,
    fireball: game.fireball,
    releaseBall: function(){
        if ( this.fireball ){
            this.fireball.jump();
            this.fireball = false;
        }  
    },
    move: function(){

        this.x += this.dx;

        if ( this.fireball ){
           this.fireball.x += this.dx;
        }
    
        if(this.x < 0){ 
           this.x = 0;
           this.fireball.x = (this.width - this.fireball.width) / 2;
        }
        if(this.x + this.width > game.width){
           this.x = game.width - this.width; 
           this.fireball.x = this.x + (this.width - this.fireball.width) / 2; 
        } 
      
    },
    stop: function(){
        this.dx = 0;
    }
}; 


window.onload = function() {
    game.start();
};
