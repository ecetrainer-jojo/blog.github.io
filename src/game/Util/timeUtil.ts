export default function getRandomTime() {
  // Generate a random number between 3000 and 6000
  return Math.floor(Math.random() * (6000 - 3000)) + 3000;
}
