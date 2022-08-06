import { Background } from '../Background/backgroud'
import { Character } from '../Character/Character'
import { DirectionKey } from '../DirectionalKey/DirectionKey'
import {ComponentConstants as constant} from './ComponentConstants'

export class ComponentController{
    canvasCxt:CanvasRenderingContext2D
    background:Background
    character:Character
    directionKey:DirectionKey

    constructor(){
        console.log("COmponentConrtoller constructs")
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.canvasCxt = document.querySelector('canvas').getContext('2d')!
    }

     initialize = async ()=>{
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
    }
}