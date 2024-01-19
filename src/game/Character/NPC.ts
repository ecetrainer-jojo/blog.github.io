import { Character } from './Character';

// eslint-disable-next-line import/prefer-default-export
export class NPC extends Character {
  // You can add specific properties for NPC here.
  name: string;

  intervalId: number;

  constructor(
    name: string,
    xPos: number,
    yPos: number,
    imageElement: HTMLImageElement
  ) {
    // so it is used to call the Character constructor from within NPC constructor.
    super(xPos, yPos, imageElement);
    // NPC specific property initialization
    this.name = name;
    this.intervalId = 0;
  }

  // For the NPC no need to shift through their perspective
  // Both global (relative to background) and rendering pos is modified
  moveUpMap = () => {
    this.mapY -= 1;
    return this.moveUpRenderingPosition();
  };

  moveDownMap = () => {
    this.mapY += 1;
    return this.moveDownRenderingPosition();
  };

  moveLeftMap = () => {
    this.mapX -= 1;
    return this.moveLeftRenderingPosition();
  };

  moveRightMap = () => {
    this.mapX += 1;
    return this.moveRightRenderingPosition();
  };
}
