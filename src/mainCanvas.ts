import { CANVAS_WIDTH_DEFAULT, CANVAS_HEIGHT_DEFAULT } from './constants';
import { ComponentController } from './ComponentControl/ComponentControl';
import { MotionController } from './MotionControl/MotionControl';

export const canvasInit = () => {
  console.log('canvas init start');
  // Get the canvas object
  const canvas = document.querySelector('canvas');
  if (canvas) {
    // Get the ideal canvas size
    canvas.width = CANVAS_WIDTH_DEFAULT;
    canvas.height = CANVAS_HEIGHT_DEFAULT;
    ProcessContent();
  }
};

export const ProcessContent = async () => {
  console.log('content Process Start');
  const componentController = new ComponentController();
  await componentController.initialize();
  new MotionController(
    componentController.character,
    componentController.background,
    componentController.directionKey,
    componentController.textBoard,
  );
};
