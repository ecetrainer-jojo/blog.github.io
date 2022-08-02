import { ComponentConstants, mapLayer} from '../ComponentControl/ComponentConstants'
import { CANVAS_HEIGHT_DEFAULT, CANVAS_WIDTH_DEFAULT } from '../constants'

export class Background{
    xPos: number
    yPos: number
    imageElement:HTMLImageElement
    collisionMap:Record<string,unknown>
    constructor(xPos:number,yPos:number,imageElement:HTMLImageElement, collisionMap:Record<string,unknown> ){
        this.xPos = xPos
        this.yPos = yPos
        this.imageElement = imageElement
        this.collisionMap = collisionMap
    }

    //extract the collsion Map, targeted collsion
    extractCollsionMap = ()=> {
        const collisionArray:number[][] = []
        const rawCollsion = (this.collisionMap.layers as Array<mapLayer>).filter(element => element.name==='Collision')[0].data
        //please change that later
        for(let i=0; i<rawCollsion.length;i+=50){
            collisionArray.push(rawCollsion.slice(i,50+i))
        }
        return collisionArray
    }

    //content rendering
    draw = (canvasCxt:CanvasRenderingContext2D)=>{
        canvasCxt.drawImage(this.imageElement,this.xPos,this.yPos)
    }

    //vision control
    moveDown = ()=>{
        if(this.yPos!=0){
            this.yPos += ComponentConstants.CANVAS_UNIT
            return true
        }
        return false
    }
    moveUp = ()=>{
        if(this.yPos+this.imageElement.height!==CANVAS_HEIGHT_DEFAULT){
            this.yPos -= ComponentConstants.CANVAS_UNIT
            return true
        }
        return false
    }

    moveLeft = ()=>{
        if(this.xPos+this.imageElement.width!==CANVAS_WIDTH_DEFAULT){
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