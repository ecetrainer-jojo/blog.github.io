export default function getRandomTime() {
  // Generate a random number between 3000 and 7000
  return Math.floor(Math.random() * (2000 - 1000)) + 1000;
}
