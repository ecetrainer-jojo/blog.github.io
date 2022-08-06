import { ComponentConstants } from "../ComponentControl/ComponentConstants"
import { Direction } from "../MotionControl/MotionConstants"

interface arrowKey{
    xStart:number
    xEnd:number
    yStart:number
    yEnd:number
}
export class DirectionKey{
    xPos: number
    yPos: number
    imageElement:HTMLImageElement
    keySize:number
    upKey:arrowKey
    leftKey:arrowKey
    rightKey:arrowKey
    downKey:arrowKey
    constructor(xPos:number,yPos:number,imageElement:HTMLImageElement){
        this.xPos = xPos
        this.yPos = yPos
        this.imageElement = imageElement
        this.keySize = ComponentConstants.ARROW_KEY_SIZE
        this.upKey = {
            xStart: this.xPos+2*this.keySize,
            yStart: this.yPos,
            xEnd: this.xPos+4*this.keySize,
            yEnd: this.yPos+2*this.keySize
        }
        this.leftKey = {
            xStart: this.xPos,
            yStart: this.yPos+2*this.keySize,
            xEnd: this.xPos+2*this.keySize,
            yEnd: this.yPos+4*this.keySize
        }
        this.downKey = {
            xStart: this.xPos+2*this.keySize,
            yStart: this.yPos+4*this.keySize,
            xEnd: this.xPos+4*this.keySize,
            yEnd: this.yPos+6*this.keySize
        }
        this.rightKey = {
            xStart: this.xPos+4*this.keySize,
            yStart: this.yPos+2*this.keySize,
            xEnd: this.xPos+6*this.keySize,
            yEnd: this.yPos+4*this.keySize
        }
    }

    draw = (canvasCxt:CanvasRenderingContext2D)=>{
        canvasCxt.drawImage(this.imageElement,this.xPos,this.yPos)
    }

    checkKey = (xPos:number,yPos:number)=>{
        if(xPos>this.upKey.xStart && xPos<this.upKey.xEnd && yPos>this.upKey.yStart && yPos<this.upKey.yEnd) return Direction.Up
        else if (xPos>this.leftKey.xStart && xPos<this.leftKey.xEnd && yPos>this.leftKey.yStart && yPos<this.leftKey.yEnd) return Direction.Left
        else if (xPos>this.rightKey.xStart && xPos<this.rightKey.xEnd && yPos>this.rightKey.yStart && yPos<this.rightKey.yEnd) return Direction.Right
        else if (xPos>this.downKey.xStart && xPos<this.downKey.xEnd && yPos>this.downKey.yStart && yPos<this.downKey.yEnd) return Direction.Down
        else return "null"
    }
    
}