import { CANVAS_WIDTH_DEFAULT, CANVAS_HEIGHT_DEFAULT } from './constants';
import { ComponentController } from './ComponentControl/ComponentControl';
import { MotionController } from './MotionControl/MotionControl';

/**
 * Async function to process content.
 * It initializes a component controller and a motion controller.
 */
export const ProcessContent = async () => {
  const componentController = new ComponentController();
  await componentController.initialize();
  const motionController = new MotionController();
  motionController.initialize(
    componentController.character,
    componentController.background,
    componentController.directionKey,
    componentController.textBoard,
  );
};

/**
 * Performs the necessary initialization steps for the canvas element.
 * This function sets the default size for the canvas and calls the ProcessContent function.
 *
 * @function canvasInit
 */
export const canvasInit = () => {
  // Get the canvas object
  const canvas = document.querySelector('canvas');
  if (canvas) {
    // Get the ideal canvas size
    canvas.width = CANVAS_WIDTH_DEFAULT;
    canvas.height = CANVAS_HEIGHT_DEFAULT;
    // eslint-disable-next-line no-console
    ProcessContent().then((r) => console.log(`CANVAS INITIALIZATION DONE: ${r}`));
  }
};
