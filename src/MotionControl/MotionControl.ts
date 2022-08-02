import { Background } from '../Background/backgroud'
import { Character } from '../Character/Character'
import {Direction} from './MotionConstants'
import {ComponentConstants as constant} from '../ComponentControl/ComponentConstants'
//Motion controller module to control a character motion on a map
export class MotionController{
    enable:boolean
    character:Character
    background:Background
    mapX:number
    mapY:number
    backgroundAction:Record<string, boolean> = {
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
        if(this.checkCollsion(this.mapX,this.mapY-1)) return
        //check for collsion TDD
        this.mapY-=1
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
        if(this.checkCollsion(this.mapX,this.mapY+1)) return
        this.mapY+=1
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
        if(this.checkCollsion(this.mapX-1,this.mapY)) return
        this.mapX-=1
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
        if(this.checkCollsion(this.mapX+1,this.mapY)) return
        this.mapX+=1
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
        })
    }

    checkCollsion = (currX:number, currY:number)=>{
        const backgroundCollision = this.background.extractCollsionMap()
        return backgroundCollision[currY][currX]!=0 ||
        backgroundCollision[currY][currX+1]!=0 ||
        backgroundCollision[currY+1][currX+1]!=0 ||
        backgroundCollision[currY+1][currX]!=0 
    }

    constructor(character:Character,background:Background){
        //control the on/off
        this.enable = true
        //get the required element
        this.character = character
        this.background = background
        this.mapX = -1*constant.INIT_PALLET_X/32+constant.INIT_CHARACTER_X/32
        this.mapY = -1*constant.INIT_PALLET_Y/32+constant.INIT_CHARACTER_Y/32
        //start the eventlistener for keypressing
        this.initializeListener()
    } 
}