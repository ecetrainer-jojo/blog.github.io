import { NPC } from '../Character/NPC';

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
