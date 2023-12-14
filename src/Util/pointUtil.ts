import { Direction } from '../MotionControl/Direction';
import { NPC } from '../Character/NPC';
import { Character } from '../Character/Character';

export type Coordinate = [number, number];

// eslint-disable-next-line no-shadow
export enum CollisionType {
  Human = 1,
  Boundary = 2,
}

const HUMAN_TOLERANCE = 2;
const BOUNDARY_TOLERANCE = 1;

export const CollisionTolerance = {
  [CollisionType.Human]: HUMAN_TOLERANCE,
  [CollisionType.Boundary]: BOUNDARY_TOLERANCE,
};

export function checkBoundaryCollide(p1:Coordinate, p2: Coordinate):boolean {
  return (p1[0] === p2[0] && p1[1] === p2[1])
      || (p1[0] === p2[0] && p1[1] === p2[1] + BOUNDARY_TOLERANCE)
      || (p1[0] === p2[0] + BOUNDARY_TOLERANCE && p1[1] === p2[1])
      || (p1[0] === p2[0] + BOUNDARY_TOLERANCE && p1[1] === p2[1] + BOUNDARY_TOLERANCE);
}

export function checkHumanCollide(p1:Coordinate, p2: Coordinate):boolean {
  return (p1[0] === p2[0] && Math.abs(p1[1] - p2[1]) <= BOUNDARY_TOLERANCE)
      || (p1[1] === p2[1] && Math.abs(p1[0] - p2[0]) <= BOUNDARY_TOLERANCE)
      || (Math.abs(p1[0] - p2[0]) <= BOUNDARY_TOLERANCE
          && Math.abs(p1[1] - p2[1]) <= BOUNDARY_TOLERANCE);
}

export function checkCharacterNpcCollide(npcs: NPC[], pos: Coordinate): boolean {
  return npcs.some((npc) => checkHumanCollide(
    pos,
    [npc.mapX, npc.mapY],
  ));
}

function checkCharacterFaceToNpc(
  character:Coordinate,
  npc: Coordinate,
  direction: string,
): string | undefined {
  if (direction === Direction.Down
  && character[0] === npc[0] && character[1] + HUMAN_TOLERANCE === npc[1]) {
    return Direction.Up;
  }
  if (direction === Direction.Up
      && character[0] === npc[0] && character[1] - HUMAN_TOLERANCE === npc[1]) {
    return Direction.Down;
  }
  if (direction === Direction.Left
      && character[1] === npc[1] && character[0] - HUMAN_TOLERANCE === npc[0]) {
    return Direction.Right;
  }
  if (direction === Direction.Right
      && character[1] === npc[1] && character[0] + HUMAN_TOLERANCE === npc[0]) {
    return Direction.Left;
  }
  return undefined;
}

export function checkStartNpcConversation(
  character:Character,
  npcs:NPC[],
): NPC | undefined {
  for (let i = 0; i < npcs.length; i += 1) {
    const characterPos: Coordinate = [character.mapX, character.mapY];
    const npcPos: Coordinate = [npcs[i].mapX, npcs[i].mapY];
    console.log(character, npcPos);
    const faceDirection = checkCharacterFaceToNpc(characterPos, npcPos, character.direction);
    console.log(faceDirection);
    if (faceDirection) {
      const involvedNpc = npcs[i];
      involvedNpc.changeDirection(faceDirection);
      return involvedNpc;
    }
  }
  return undefined;
}
