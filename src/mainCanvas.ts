import { CANVAS_WIDTH_DEFAULT,CANVAS_HEIGHT_DEFAULT} from './constants'
import { ComponentController } from './ComponentControl/ComponentControl'
import { MotionController } from './MotionControl/MotionControl'

export const canvasInit = ()=>{
    console.log("canvas init start")
    //get the canvas object
    const canvas = document.querySelector('canvas')
    if(canvas) {
        canvas.width = CANVAS_WIDTH_DEFAULT
        canvas.height = CANVAS_HEIGHT_DEFAULT
        ProcessContent()
    }
}

export const ProcessContent = async()=>{
    console.log("content Process Start")
    const componentController = new ComponentController()
    await componentController.initialize()
    const motionController = new MotionController(componentController.character,componentController.background, componentController.directionKey)
}


