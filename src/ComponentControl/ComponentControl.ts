import { Background } from '../Background/backgroud'
import { Character } from '../Character/Character'
import {ComponentConstants as constant} from './ComponentConstants'

export class ComponentController{
    canvasCxt:CanvasRenderingContext2D
    background:Background
    character:Character

    constructor(){
        console.log("COmponentConrtoller constructs")
        this.canvasCxt = document.querySelector('canvas')!.getContext('2d')!
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

        this.animate()
    }

    async loadImage(imageUrl:string) {
        console.log(imageUrl+" start loading")
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
    }

    getCharacter = ()=> this.character
    getBackground = ()=>this.background
}