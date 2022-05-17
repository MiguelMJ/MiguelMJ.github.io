function Component(drawFun,x,y,life=Infinity){
    this.draw = drawFun
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.lifeTime = life
    this.update = function(dt){
        this.userUpdate()
        this.physicsUpdate(dt)
    }
    this.physicsUpdate = function(dt){
        this.vx += this.ax
        this.vy += this.ay
        this.x += this.vx * dt
        this.y += this.vy * dt
        this.lifeTime += dt
    }
    this.userUpdate = function(){
        // the user must overwrite
    }
}

function GameArea(){
    
    this.canvas = document.createElement("canvas"),
    this.canvas.widht = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext('2d')
    this.components = []
    document.body.insertBefore(this.canvas, document.getElementById("out"))

    this.start() = function(){
        let delta = 30
        setInterval(()=>this.update(delta),delta)
    }

    this.clear = function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

    this.update = function(dt){
        this.clear()
        this.userUpdate()
        this.physicsUpdate(dt)
        for(let c of this.components){
            this.draw(c)
        }
    }

    this.physicsUpdate = function(dt){
        for(let ci in this.components){
            components[ci].update(dt)
            if(components[ci] )
        }
    }
    
    this.userUpdate = function(){
        // user must overwrite
    }

    this.addComponent = function(component, life=Infinity){

    }

    this.draw = function(component){
        component.draw(this.context, component)
    }
}
