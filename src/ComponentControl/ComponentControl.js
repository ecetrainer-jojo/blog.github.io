import { Background } from '../Background/backgroud.js'
import { Character } from '../Character/Character.js'
import {ComponentConstants as constant} from './ComponentConstants.js'
export class ComponentController{
    constructor(){
        console.log("COmponentConrtoller constructs")
        this.canvasCxt = document.querySelector('canvas')?.getContext('2d')
        this.background = undefined
        this.character = undefined
        // //for constructor will load the pallet town and main character
        // const backgroundImg = new Image()
        // backgroundImg.src = constant.DEFAULT_BACKGROUND_IMG
        // const characterImg = new Image()
        // characterImg.src = constant.DEFAULT_CHARACTER_IMG

        // characterImg.onload = ()=>{
        //     this.background = new Background(constant.INIT_PALLET_X,
        //         constant.INIT_PALLET_Y,
        //         backgroundImg)
        
        //     this.character = new Character(constant.INIT_CHARACTER_X,
        //         constant.INIT_CHARACTER_Y,
        //         characterImg)
        
        //     //wait till the character finishing loading to animte
        //     this.animate()
        // }
    }

     initialize = async ()=>{
        this.background = new Background(constant.INIT_PALLET_X,
            constant.INIT_PALLET_Y,
            await this.loadImage(constant.DEFAULT_BACKGROUND_IMG))
            
        this.character = new Character(constant.INIT_CHARACTER_X,
            constant.INIT_CHARACTER_Y,
            await this.loadImage(constant.DEFAULT_CHARACTER_IMG))

        this.animate()
    }

    async loadImage(imageUrl) {
        console.log(imageUrl+" start loading")
        let img;
        const imageLoadPromise = new Promise(resolve => {
            img = new Image();
            img.onload = resolve;
            img.src = imageUrl;
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