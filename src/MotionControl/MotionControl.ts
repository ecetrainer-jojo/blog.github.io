import { Background } from '../Background/backgroud'
import { Character } from '../Character/Character'
import {Direction} from './MotionConstants'
//Motion controller module to control a character motion on a map
export class MotionController{
    enable:boolean
    character:Character
    background:Background
    backgroundAction:Record<string, Boolean> = {
        up:true,
        down:true,
        left:true,
        right:true
    }

    //disable the motion capture and prevent the character from moving
    disable(){
        this.enable = false
    }

    //vision control for moving character and background, from perspective of character
    moveUp = ()=>{
        this.character.changeDirection(Direction.Up)
        //check for collsion TDD
        if(this.character.yEquiv() && (this.backgroundAction).up){
            //In this case backrgound is allowed to move down
            if(!this.background.moveDown()){
                this.backgroundAction.up = false
                this.character.moveUp()
            }
        }
        else{
            if(!this.character.moveUp()){
                this.backgroundAction.down = true
            }
        }
    }

    moveDown = ()=>{
        this.character.changeDirection(Direction.Down)
        //check for collsion TDD
        if(this.character.yEquiv() && this.backgroundAction.down){
            //In this case backrgound is allowed to move down
            if(!this.background.moveUp()){
                this.backgroundAction.down = false
                this.character.moveDown()
            }
        }
        else{
            if(!this.character.moveDown()){
                this.backgroundAction.up = true
            }
        }
    }

    moveLeft = ()=>{
        this.character.changeDirection(Direction.Left)
        //check for collsion TDD
        if(this.character.xEquiv() && this.backgroundAction.left){
            //In this case backrgound is allowed to move down
            if(!this.background.moveRight()){
                this.backgroundAction.left = false
                this.character.moveLeft()
            }
        }
        else{
            if(!this.character.moveLeft()){
                this.backgroundAction.right = true
            }
        }
    }

    moveRight = ()=>{
        this.character.changeDirection(Direction.Right)
        //check for collsion TDD
        if(this.character.xEquiv() && this.backgroundAction.right){
            //In this case backrgound is allowed to move down
            if(!this.background.moveLeft()){
                this.backgroundAction.right = false
                this.character.moveRight()
            }
        }
        else{
            if(!this.character.moveRight()){
                this.backgroundAction.left = true
            }
        }
    }

    initializeListener(){
        window.addEventListener('keydown',(event) => {
            if(!this.enable) return
            if(event.key==='w'||event.key === 'ArrowUp'){
                this.moveUp()
                
            }
            else if(event.key==='s'||event.key === 'ArrowDown'){
                this.moveDown()
            }
            else if(event.key==='a'||event.key === 'ArrowLeft'){
                this.moveLeft()
            }
            else if(event.key==='d'||event.key === 'ArrowRight'){
                this.moveRight()
            }
            console.log(this.backgroundAction,this.character.xEquiv(),this.character.yEquiv())
        })
    }

    constructor(character:Character,background:Background){
        console.log(character)
        console.log(background)
        //control the on/off
        this.enable = true
        this.character = character
        this.background = background
        //start the eventlistener for keypressing
        this.initializeListener()
    } 
}