/**
 * Finds the longest palindromic substring within a given input string.
 * Uses Manacher's algorithm to efficiently handle both odd and even-length palindromes.
 *
 * @param {string} s - The input string.
 * @returns {string} - The longest palindromic substring found.
 */
function longestPalindromicSubstring(s) {
  const T = preProcess(s);
  const n = T.length;
  const P = new Array(n).fill(0); // Array to store palindrome lengths
  let C = 0, R = 0; // Center and right boundary
  for (let i = 1; i < n - 1; i++) {
      const i_mirror = 2 * C - i;
      if (R > i) {
          P[i] = Math.min(R - i, P[i_mirror]);
      } else {
          P[i] = 0;
      }
      while (T.charAt(i + 1 + P[i]) === T.charAt(i - 1 - P[i])) {
          P[i]++;
      }
      if (i + P[i] > R) {
          C = i;
          R = i + P[i];
      }
  }

  let maxLen = 0;
  let centerIndex = 0;
  for (let i = 1; i < n - 1; i++) {
      if (P[i] > maxLen) {
          maxLen = P[i];
          centerIndex = i;
      }
  }
  // Extract the longest palindromic substring
  return s.substr((centerIndex - 1 - maxLen) / 2, maxLen);
}

function preProcess(s) {
  const n = s.length;
  if (n === 0) {
      return "^$"; // Empty string case
  }
  let ret = "^";
  for (let i = 0; i < n; i++) {
      ret += "#" + s.charAt(i);
  }
  ret += "#$";
  return ret;
}


// Example usage:
const inputString = "abccbaabccba";
const result = longestPalindromicSubstring(inputString);
console.log("Longest palindromic substring:", result);
