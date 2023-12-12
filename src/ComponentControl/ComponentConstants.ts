import * as PalletTownJson from '../../resources/tile_assets/towns/PalletTownMap.json';

// eslint-disable-next-line import/prefer-default-export
export const ComponentConstants = {
  DEFAULT_BACKGROUND_IMG: 'img/PalletTown.png',
  DEFAULT_CHARACTER_IMG: 'img/FrontWalk.png',
  DEFAULT_ARROW_KEY_IMG: 'img/controllerKey.png',
  DEFAULT_DIALOG_IMG: 'img/dialogue-box.png',
  PALLET_TOWN_RESOURCE: PalletTownJson,
  CANVAS_UNIT: 32,
  INIT_PALLET_X: -6 * 32,
  INIT_PALLET_Y: -10 * 32,
  INIT_CHARACTER_X: 10 * 32,
  INIT_CHARACTER_Y: 11 * 32,
  INIT_DIRECTION_KEY_X: 3 * 32,
  INIT_DIRECTION_KEY_Y: 13 * 32,
  ARROW_KEY_SIZE: 32,
};
