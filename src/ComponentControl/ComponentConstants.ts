import * as PalletTownJson from '../../resources/PalletTown.json'

export const ComponentConstants = {
    DEFAULT_BACKGROUND_IMG : 'img/PalletTown.png',
    DEFAULT_CHARACTER_IMG:'img/FrontWalk.png',
    DEFAULT_ARROW_KEY_IMG:'img/controllerKey.png',
    DEFAULT_DIALOG_IMG:'img/dialogue-box.png',
    PALLET_TOWN_RESOURCE: PalletTownJson,
    CANVAS_UNIT :32,
    INIT_PALLET_X :-6 * 32,
    INIT_PALLET_Y :-10 * 32,
    INIT_CHARACTER_X :10 * 32,
    INIT_CHARACTER_Y :11 * 32,
    INIT_DIRECTION_KEY_X :3 * 32,
    INIT_DIRECTION_KEY_Y :13 * 32,
    ARROW_KEY_SIZE: 32
}

//trying to map every map a interface with specific settings
export interface mapSetting {
    BACKGROUND_IMG : string,
    CHARACTER_IMG: string,
    PALLET_TOWN_RESOURCE: JSON,
    CANVAS_UNIT :number,
    INIT_PALLET_X :number,
    INIT_PALLET_Y :number,
    INIT_CHARACTER_X :number,
    INIT_CHARACTER_Y :number,
}

//record the types for the extracted layer info from json
export interface mapLayer {
    data: number[];
    height: number,
    id: number,
    name: string,
    opacity: number,
    type: string,
    visible: boolean,
    width: number,
    x: number,
    y: number
}




