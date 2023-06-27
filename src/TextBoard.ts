import { DIALOGUE_X_POS, DIALOGUE_Y_POS, LINE_SPACING, MAX_DIALOGUE_LINES, MAX_LINE_LENGTH, TEXT_Y_POS, Text_X_POS } from "./constants"

export class TextBoard{
    // Constants for textBoard
    // enable the dialog
    enableDialogue:boolean
    loadLock:boolean
    canvasCxt:CanvasRenderingContext2D
    imageElement:HTMLImageElement
    textChunks: string[]
    xPos:number
    yPos:number
    constructor(imageElement:HTMLImageElement, canvasCxt:CanvasRenderingContext2D){
        this.enableDialogue = false
        this.loadLock = false
        this.xPos = DIALOGUE_X_POS
        this.yPos = DIALOGUE_Y_POS
        this.imageElement = imageElement
        this.textChunks = []
        this.canvasCxt = canvasCxt
    }

    draw = ()=>{
        if(!this.enableDialogue) return
        this.canvasCxt.font = '32px PixelFont';
        this.canvasCxt.fillStyle = 'black';
        this.canvasCxt.drawImage(this.imageElement,this.xPos,this.yPos)
        this.loadLock = true
        const size = this.textChunks.length
        console.log("there are "+ size + "chunks")
        this.displayReadyText()
        if(this.textChunks.length == 0) this.enableDialogue = false
    }

    loadTextChunks = (dialogContent: string) => {
        // break the string into chunks
        for (let i = 0; i < dialogContent.length; i += MAX_LINE_LENGTH) {
            const chunk = dialogContent.substring(i, i + MAX_LINE_LENGTH);
            this.textChunks.push(chunk.trim());
        }
    }

    enterForNextText = () => {
        for(let i = 0; i < MAX_DIALOGUE_LINES; i += 1) {
            this.textChunks.shift()
        }
        if(this.checkRemainTextsEmpty()) return true
    }

    displayReadyText = () => {
        for(let i = 0; i < Math.min(MAX_DIALOGUE_LINES, this.textChunks.length); i += 1) {
            console.log("remaining strings" + this.textChunks)
            this.canvasCxt.fillText(this.textChunks[i], Text_X_POS, TEXT_Y_POS + i * LINE_SPACING)
        }
    }

    setInputText = (inputText: string) => this.loadTextChunks(inputText)

    checkRemainTextsEmpty = () => this.textChunks.length === 0
}