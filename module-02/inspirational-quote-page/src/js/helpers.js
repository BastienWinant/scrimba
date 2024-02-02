/**
 * Returns a random element from the input array
 * @param arr array to be sampled from 
 * @returns a single array element
 */
export default function getRandomElement(arr) {
  // get a random element from the input array
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}