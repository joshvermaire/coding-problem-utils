/**
 * Counts the number of set bits in the binary representation of an integer using Brian Kernighan's algorithm. 
 *
 * @param {number} n - The integer for which to count set bits.
 * @returns {number} The count of set bits.
*/
const countSetBits = (n) => {
  let count = 0;
  while (n > 0) {
    n &= (n - 1);
    count++;
  }
  return count;
}

/*
 * Brian Kernighan's algorithm efficiently counts set bits by clearing the most set bit. 
 * This takes O(log n) operations, where n is the input integer.
 *
 *    n &= (n - 1); // Clear the rightmost set bit
 */