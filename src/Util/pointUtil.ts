export type Coordinate = [number, number];

export function checkTwoPointsCollide(p1:Coordinate, p2: Coordinate):boolean {
  if ((p1[0] === p2[0] && p1[1] === p2[1])
        || (p1[0] === p2[0] && p1[1] === p2[1] + 1)
        || (p1[0] === p2[0] + 1 && p1[1] === p2[1])
        || (p1[0] === p2[0] + 1 && p1[1] === p2[1] + 1)) {
    return true;
  }
  return false;
}
