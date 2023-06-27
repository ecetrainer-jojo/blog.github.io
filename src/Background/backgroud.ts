import { ComponentConstants, mapLayer, mapLayers} from '../ComponentControl/ComponentConstants'
import { CANVAS_HEIGHT_DEFAULT, CANVAS_WIDTH_DEFAULT } from '../constants'

export type Coordinate = [number,number]

export class Background{
    xPos: number
    yPos: number
    imageElement:HTMLImageElement
    // each background have their own layer settings
    collisionArray:Coordinate[] = []
    dialogueMap:Map<number,Coordinate[]>

    //extract the collsion Map, targeted collsion
    extractCollsionMap = (backgroundMapInfo:Record<string,unknown>)=> {
        const rawCollsionData = (backgroundMapInfo.layers as Array<mapLayer>).filter(element => element.name==='Collision')[0]
        for(let i=0; i<rawCollsionData.data.length;i++){
            if(rawCollsionData.data[i]!=0){
                this.collisionArray.push([Math.trunc(i / rawCollsionData.width), i % rawCollsionData.width])
            }
        }
    }

    //extract the dialogueMap
    // design a data structure -> map(number, listof(pairNumbers)
    extractdialogueMap = (backgroundMapInfo:Record<string,unknown>) => {
        const rawDialogue = (backgroundMapInfo.layers as Array<mapLayers>).filter(element => element.name==='Dialogue_Group')[0].layers
        rawDialogue.forEach(dialogueLayer => {
          const layerKey = Number(dialogueLayer.name)
          const diagloueBlock: Coordinate[] = []
          for(let i=0; i<dialogueLayer.data.length;i++){
            if(dialogueLayer.data[i]!=0){
              diagloueBlock.push([Math.trunc(i / dialogueLayer.width), i % dialogueLayer.width])
            }
          }
          this.dialogueMap.set(layerKey,diagloueBlock)
        })
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


    // true -> it has a collision
    checkCollsion = (currX:number, currY:number)=>{
        for(let i=0; i< this.collisionArray.length; i++){
            const collisionItem = this.collisionArray[i]
            if((collisionItem[0]===currY && collisionItem[1]===currX) ||
            (collisionItem[0]===currY && collisionItem[1]===currX+1) ||
            (collisionItem[0]===currY+1 && collisionItem[1]===currX) ||
            (collisionItem[0]===currY+1 && collisionItem[1]===currX+1)){
                console.log("get trapped with a collision")
                return true
            }
        }
        console.log("No collision collision")
        return false
    }


    checkDialogue = (currX:number, currY:number): number | null => {
        let keyResult: number | null = null
        this.dialogueMap.forEach((value, key) => {
            value.forEach(coordinate => {
                if(coordinate[0] === currY && coordinate[1]===currX) {
                    keyResult = key
                }
            })
        })
        return keyResult
    }

    constructor(xPos:number,yPos:number,imageElement:HTMLImageElement, backgroundMapInfo:Record<string,unknown> ){
        this.xPos = xPos
        this.yPos = yPos
        this.imageElement = imageElement
        this.dialogueMap = new Map<number,Coordinate[]>()
        this.extractCollsionMap(backgroundMapInfo)
        this.extractdialogueMap(backgroundMapInfo)
    }
}