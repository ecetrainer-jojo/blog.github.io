import { ComponentConstants } from '../ComponentControl/ComponentConstants'

export class Background{
    xPos: number
    yPos: number
    imageElement:HTMLImageElement
    constructor(xPos:number,yPos:number,imageElement:HTMLImageElement){
        this.xPos = xPos
        this.yPos = yPos
        this.imageElement = imageElement
    }

    draw = (canvasCxt:CanvasRenderingContext2D)=>{
        canvasCxt.drawImage(this.imageElement,this.xPos,this.yPos)
    }

    moveDown = ()=>{
        if(this.yPos!=0){
            this.yPos += ComponentConstants.CANVAS_UNIT
            return true
        }
        return false
    }
    moveUp = ()=>{
        if(this.yPos+this.imageElement.height!==ComponentConstants.CANVAS_HEIGHT_DEFAULT){
            this.yPos -= ComponentConstants.CANVAS_UNIT
            return true
        }
        return false
    }

    moveLeft = ()=>{
        if(this.xPos+this.imageElement.width!==ComponentConstants.CANVAS_WIDTH_DEFAULT){
            this.xPos -= ComponentConstants.CANVAS_UNIT
            return true
        }
        return false
    }

    moveRight = ()=>{
        if(this.xPos!=0){
            this.xPos += ComponentConstants.CANVAS_UNIT
            return true
        }
        return false
    }
}