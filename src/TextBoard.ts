import {
  DIALOGUE_X_POS, DIALOGUE_Y_POS, LINE_SPACING, MAX_DIALOGUE_LINES,
  MAX_LINE_LENGTH, TEXT_Y_POS, TEXT_X_POS,
} from './constants';

/**
 * The TextBoard class is responsible for the management and rendering
 * of game dialogues. This includes enabling and disabling of dialogues,
 * cutting the dialogue text into chunks, and displaying the text on the screen.
 *
 * It contains properties that specify the start position for the text,
 * text chunks for splitting the dialogue into manageable parts, and status flags
 * for dialogue and load lock control.
 *
 * A method is provided for rendering the dialogues and manipulating
 * the text chunks. Furthermore, checks are included to see if any
 * additional texts are available, which enables the game to control
 * the flow of dialogue.
 *
 * The class is initialized with a reference to an Image object
 * representing the dialogue box and a CanvasRenderingContext2D object
 * used for drawing this dialogue box and the text onto the canvas.
 */

// eslint-disable-next-line import/prefer-default-export
export class TextBoard {
  // Constants for textBoard
  // enable the dialog
  enableDialogue:boolean;

  loadLock:boolean;

  canvasCxt:CanvasRenderingContext2D;

  imageElement:HTMLImageElement;

  textChunks: string[];

  xPos:number;

  yPos:number;

  constructor(imageElement:HTMLImageElement, canvasCxt:CanvasRenderingContext2D) {
    this.enableDialogue = false;
    this.loadLock = false;
    this.xPos = DIALOGUE_X_POS;
    this.yPos = DIALOGUE_Y_POS;
    this.imageElement = imageElement;
    this.textChunks = [];
    this.canvasCxt = canvasCxt;
  }

  /**
   * Draws an image on the canvas and displays dialogue text if enabled.
   * If dialogue is disabled, the function will not draw anything.
   */
  draw = () => {
    if (!this.enableDialogue) return;
    this.canvasCxt.font = '32px PixelFont';
    this.canvasCxt.fillStyle = 'black';
    this.canvasCxt.drawImage(this.imageElement, this.xPos, this.yPos);
    this.loadLock = true;
    this.displayReadyText();
    if (this.textChunks.length === 0) this.enableDialogue = false;
  };

  /**
   * Load text chunks from dialog content.
   *
   * @param {string} dialogContent - The dialog content.
   *
   * @returns {void}
   */
  loadTextChunks = (dialogContent: string): void => {
    // break the string into chunks
    for (let i = 0; i < dialogContent.length; i += MAX_LINE_LENGTH) {
      const chunk = dialogContent.substring(i, i + MAX_LINE_LENGTH);
      this.textChunks.push(chunk.trim());
    }
  };

  /**
   * Removes the specified number of lines from the textChunks array
   * and checks if there are any remaining texts.
   *
   * @returns {boolean} - True if there are no more texts remaining, false otherwise.
   */
  enterForNextText = (): boolean => {
    for (let i = 0; i < MAX_DIALOGUE_LINES; i += 1) {
      this.textChunks.shift();
    }
    return this.checkRemainTextsEmpty();
  };

  /**
   * Display ready text on the canvas.
   *
   * This function iterates over the text chunks and displays them on the canvas
   * using the specified position and line spacing.
   *
   * @function displayReadyText
   *
   * @returns {void} Does not return a value.
   */
  displayReadyText = (): void => {
    for (let i = 0; i < Math.min(MAX_DIALOGUE_LINES, this.textChunks.length); i += 1) {
      console.log(`remaining strings${this.textChunks}`);
      this.canvasCxt.fillText(this.textChunks[i], TEXT_X_POS, TEXT_Y_POS + i * LINE_SPACING);
    }
  };

  /**
   * Sets the input text and triggers the loading of text chunks.
   *
   * @param {string} inputText - The input text to be set.
   * @returns {void}
   */
  setInputText = (inputText: string): void => this.loadTextChunks(inputText);

  /**
   * Checks whether the remaining texts are empty.
   *
   * @returns {boolean} True if the remaining texts are empty, false otherwise.
   */
  checkRemainTextsEmpty = (): boolean => this.textChunks.length === 0;
}
