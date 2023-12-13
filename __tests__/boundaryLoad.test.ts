import * as collisionMap from '../resources/tile_assets/towns/PalletTownMap.json';
import { MapLayer, MapLayers } from '../src/Models/mapLayer';
import { Coordinate } from '../src/Util/pointUtil';

describe('Testing extract the boundary info from the json file', () => {
  it('load the data from json file', () => {
    const collisionArray:number[][] = [];
    const rawCollision = (collisionMap.layers as Array<MapLayer>).filter((element) => element.name === 'Collision')[0].data;
    // please change that later
    for (let i = 0; i < rawCollision.length; i += 50) {
      collisionArray.push(rawCollision.slice(i, 50 + i));
    }
    expect(collisionArray.length).toBe(55);
  });

  it('load the diagloue boundaries from json file', () => {
    const rawDialogue = (collisionMap.layers as Array<MapLayers>).filter((element) => element.name === 'Dialogue_Group')[0].layers;
    rawDialogue.forEach((dialogueLayer) => {
      const diagloueBlock: Coordinate[] = [];
      for (let i = 0; i < dialogueLayer.data.length; i += 1) {
        if (dialogueLayer.data[i] !== 0) {
          diagloueBlock.push([Math.trunc(i / dialogueLayer.width), i % dialogueLayer.width]);
        }
      }
      expect(diagloueBlock.length).toBe(4);
    });
  });
});
