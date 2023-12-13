export const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',
};

export function generateRandomDirection() {
  const randomInt = Math.floor(Math.random() * 4);
  switch (randomInt) {
    case 0:
      return Direction.Up;
    case 1:
      return Direction.Down;
    case 2:
      return Direction.Left;
    case 3:
      return Direction.Right;
    default:
      return Direction.Down;
  }
}
