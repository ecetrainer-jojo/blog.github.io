import { Direction, CANVAS_UNIT} from '../MotionControl/MotionConstants.js'


export class Character{
    //Character holds an HTML image object
    constructor(xPos,yPos,imageElement){
        this.xPos = xPos
        this.yPos = yPos
        this.imageElement = imageElement
        this.direction = Direction.Down
        this.originX = xPos
        this.originY = yPos
    }

    draw = (canvasCxt)=>{
        canvasCxt.drawImage(this.imageElement,this.xPos,this.yPos)
    }

    changeDirection = (direction)=>{
        //please put them into constants
        switch (direction){
            case (Direction.Up):
                this.imageElement.src = 'img/BackStand.png'
                break
            case (Direction.Down):
                this.imageElement.src = 'img/FrontStand.png'
                break
            case (Direction.Left):
                this.imageElement.src = 'img/LeftStand.png'
                break
            case (Direction.Right):
                this.imageElement.src = 'img/RightStand.png'
                break
        }
    }

    xEquiv = ()=> this.xPos===this.originX
    yEquiv = ()=> this.yPos===this.originY

    moveDown = ()=>{
        this.yPos += CANVAS_UNIT
        if(this.yPos===this.originY){
            return false
        }
        return true
    }

    moveUp = ()=>{
        this.yPos -= CANVAS_UNIT
        if(this.yPos===this.originY){
            return false
        }
        return true
    }

    moveLeft = ()=>{
        this.xPos -= CANVAS_UNIT
        if(this.xPos===this.originX){
            return false
        }
        return true
    }

    moveRight = ()=>{
        this.xPos += CANVAS_UNIT
        if(this.xPos===this.originX){
            return false
        }
        return true
    }
}