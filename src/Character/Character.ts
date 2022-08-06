import { Direction, CANVAS_UNIT} from '../MotionControl/MotionConstants'


export class Character{
    //walkenable
    enableWalk:boolean
    //Character holds an HTML image object
    xPos:number
    yPos:number
    originX:number
    originY:number
    imageElement:HTMLImageElement
    direction: string
    //motion related to crop and render the spread sheet
    frameNum:number
    currFrame:number
    waitFrame:number
    motionInvoke:number
    constructor(xPos:number,yPos:number,imageElement:HTMLImageElement){
        this.enableWalk = false
        this.xPos = xPos
        this.yPos = yPos
        this.imageElement = imageElement
        this.direction = Direction.Down
        this.originX = xPos
        this.originY = yPos
        this.frameNum = 4
        this.currFrame = 0
        this.waitFrame = 5
    }

    draw = (canvasCxt:CanvasRenderingContext2D)=>{
        canvasCxt.drawImage(
            this.imageElement,
            this.currFrame*this.imageElement.width/this.frameNum,
            0,
            this.imageElement.width / this.frameNum,
            this.imageElement.height,
            this.xPos,
            this.yPos,
            this.imageElement.width / this.frameNum,
            this.imageElement.height,
        )
        //accumulate the frame
        this.frameControl()
        if(this.currFrame==0 && this.waitFrame==5 && this.enableWalk){
            this.enableWalk=false
        }
    }

    setEnableWalk = ()=> {
        console.log("set enable walk!")
        this.enableWalk = true
    }

    frameControl = ()=>{
        if(!this.enableWalk) return
        this.waitFrame -=1
        if(this.waitFrame==0){
            //iterate through the currFrame to make dynamic motion
            if(this.currFrame<this.frameNum-1) {
                this.currFrame+=1
            }
            else {
                this.currFrame = 0
            }
            this.waitFrame=5
        }
    }

    //vision control and picture switch
    changeDirection = (direction:string)=>{
        //please put them into constants
        switch (direction){
            case (Direction.Up):
                this.imageElement.src = 'img/BackWalk.png'
                break
            case (Direction.Down):
                this.imageElement.src = 'img/FrontWalk.png'
                break
            case (Direction.Left):
                this.imageElement.src = 'img/Leftwalk.png'
                break
            case (Direction.Right):
                this.imageElement.src = 'img/RightWalk.png'
                break
        }
    }



    //Motion related
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