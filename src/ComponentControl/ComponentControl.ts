import { Background } from '../Background/backgroud'
import { Character } from '../Character/Character'
import { DirectionKey } from '../DirectionalKey/DirectionKey'
import { TextBoard } from '../TextBoard'
import {ComponentConstants as constant} from './ComponentConstants'

export class ComponentController{
    canvasCxt:CanvasRenderingContext2D
    background:Background
    character:Character
    directionKey:DirectionKey
    textBoard:TextBoard

    constructor(){
        console.log("ComponentConrtoller constructs")
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.canvasCxt = document.querySelector('canvas').getContext('2d')!
    }

     initialize = async ()=>{
        // 优化方案，每一个不同的场景都需要 新的background character 和 directional key, 需要一个
        // constants -> contentConfig
        this.background = new Background(constant.INIT_PALLET_X,
            constant.INIT_PALLET_Y,
            await this.loadImage(constant.DEFAULT_BACKGROUND_IMG),
            constant.PALLET_TOWN_RESOURCE
            )
            
        this.character = new Character(constant.INIT_CHARACTER_X,
            constant.INIT_CHARACTER_Y,
            await this.loadImage(constant.DEFAULT_CHARACTER_IMG))

        
        this.directionKey = new DirectionKey(constant.INIT_DIRECTION_KEY_X,
            constant.INIT_DIRECTION_KEY_Y,
            await this.loadImage(constant.DEFAULT_ARROW_KEY_IMG))

        this.textBoard = new TextBoard(
            await this.loadImage(constant.DEFAULT_DIALOG_IMG),
            this.canvasCxt
        )
        this.animate()
    }

    async loadImage(imageUrl:string) {
        let img:HTMLImageElement = new Image()
        const imageLoadPromise = new Promise(resolve => {
            img = new Image()
            img.onload = resolve
            img.src = imageUrl
        });
        await imageLoadPromise;
        return img;
    }

    //rendering out the pictures
    animate = () =>{
        window.requestAnimationFrame(this.animate)
        this.background.draw(this.canvasCxt)
        this.character.draw(this.canvasCxt)
        this.directionKey.draw(this.canvasCxt)
        this.textBoard.draw()
    }
}