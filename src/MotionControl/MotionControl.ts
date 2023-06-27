import { Background } from '../Background/backgroud'
import { Character } from '../Character/Character'
import {Direction} from './MotionConstants'
import {ComponentConstants as constant} from '../ComponentControl/ComponentConstants'
import { DirectionKey } from '../DirectionalKey/DirectionKey'
import { TextBoard } from '../TextBoard'
//Motion controller module to control a character motion on a map
export class MotionController{
    enable:boolean
    character:Character
    directionKey:DirectionKey
    background:Background
    textBoard:TextBoard
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
        // check whether any dialogue will be triggered
        if(this.checkDialogueHandler(this.mapX,this.mapY-1)) return
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

    iniializeMouseTracker(){
        document.querySelector('canvas').addEventListener('mousedown',event=>{
            if(!this.enable) return
            switch(this.directionKey.checkKey(event.clientX,event.clientY)){
                case(Direction.Up):{
                    this.character.setEnableWalk()
                    this.moveUp()  
                    break;
                }
                case(Direction.Down):{
                    this.character.setEnableWalk()
                    this.moveDown()
                    break;
                }
                case(Direction.Left):{
                    this.character.setEnableWalk()
                    this.moveLeft()  
                    break;
                }
                case(Direction.Right):{
                    this.character.setEnableWalk()
                    this.moveRight() 
                    break;
                }
            }
        })
    }

    initializeListener(){
        window.addEventListener('keydown',(event) => {
            if(event.key=== 'Enter' && this.textBoard.enableDialogue === true){
                // when no remaining text to present, re-enable
                if(this.textBoard.enterForNextText()){
                    this.enable = true
                }
            }
            if(!this.enable) return
            if(event.key==='w'||event.key === 'ArrowUp'){
                this.character.setEnableWalk()
                this.moveUp()  
            }
            else if(event.key==='s'||event.key === 'ArrowDown'){
                this.character.setEnableWalk()
                this.moveDown()
            }
            else if(event.key==='a'||event.key === 'ArrowLeft'){
                this.character.setEnableWalk()
                this.moveLeft()
            }
            else if(event.key==='d'||event.key === 'ArrowRight'){
                this.character.setEnableWalk()
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

    checkDialogue = (currX:number, currY:number)=>{
        const backgroundDialogue = this.background.extractdialogueMap()
        return backgroundDialogue[currY][currX]!=0 ||
        backgroundDialogue[currY][currX+1]!=0 ||
        backgroundDialogue[currY+1][currX+1]!=0 ||
        backgroundDialogue[currY+1][currX]!=0 
    }

    checkDialogueHandler = (currX:number, currY:number)=>{
        if(this.checkDialogue(currX,currY)){
            this.textBoard.setInputText("Welcome to this Town. Please enjoy your time here and get to know more about me!")
            this.disable()
            this.textBoard.enableDialogue = true
            return true
        }
        return false
    }

    constructor(character:Character,background:Background,directionKey:DirectionKey, textBoard: TextBoard){
        //control the on/off event listener
        this.enable = true
        //get the required element
        this.character = character
        this.background = background
        this.directionKey = directionKey
        this.textBoard = textBoard
        this.mapX = -1*constant.INIT_PALLET_X/32+constant.INIT_CHARACTER_X/32
        this.mapY = -1*constant.INIT_PALLET_Y/32+constant.INIT_CHARACTER_Y/32
        
        //start the eventlistener for keypressing
        this.initializeListener()
        this.iniializeMouseTracker()
    } 
}