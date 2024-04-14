/**
 * Calculates the Z values for each position in a string.
 *
 * The Z function measures the length of the longest substring starting from a given position
 * that matches the prefix of the string. 
 *
 * @param {string} string - The input string for which to calculate Z values.
 * @returns {number[]} An array containing the Z values for each position in the input string.
 *
 * @example
 * const string = "abacabadabacaba";
 * const zValues = zFunction(string);
 * console.log(zValues);
 */
function zFunction(string) {
  const n = string.length;
  const zArray = new Array(n).fill(0);

  let left = 0;
  let right = 0;

  for (let i = 1; i < n; i++) {
      if (i < right) {
          zArray[i] = Math.min(right - i, zArray[i - left]);
      }

      while (i + zArray[i] < n && string[zArray[i]] === string[i + zArray[i]]) {
          zArray[i]++;
      }

      if (i + zArray[i] > right) {
          left = i;
          right = i + zArray[i];
      }
  }

  return zArray;
}

// Test case 1:
const string = "abacabadabacaba";
const result1 = zFunction(string);
console.log("Occurrences of pattern in text1:", result1); // Expected output: [0, 0, 1, 0, 3, 0, 1, 0, 7, 0, 1, 0, 3, 0, 1]


// Test case 2:
const text2 = "abcaabcaaabcd";
const result2 = zFunction(text2);
console.log("Occurrences of pattern in text1:", result2); // Expected output: [0, 0, 0, 1, 5, 0, 0, 1, 1, 3, 0, 0, 0]