/**
 * Searches for occurrences of a pattern (substring) within a given text using the Knuth-Morris-Pratt algorithm.
 * The KMP algorithm improves upon the naive pattern-searching approach by avoiding unnecessary character comparisons.
 *
 * @param {string} text - The input text where we want to find occurrences of the pattern.
 * @param {string} pattern - The pattern we are searching for in the text.
 * @returns {number[]} - An array of indices where the pattern occurs in the text (empty array if not found).
 */
function knuthMorrisPratt(text, pattern) {
    const lps = computeLPS(pattern);

    const result = [];
    let i = 0; // Index for text
    let j = 0; // Index for pattern

    while (i < text.length) {
        if (pattern[j] == text[i]) {
            j++;
            i++;
        }

        if (j == pattern.length) {
            // Pattern found at index i - j
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] != text[i]) {
            if (j != 0)
                j = lps[j - 1];
            else
                i = i + 1;
        }
    }

    return result;
}


/**
 * Computes the Longest Prefix Suffix (LPS) array for a given pattern.
 * The LPS array helps skip characters during pattern matching.
 *
 * @param {string} pattern - The pattern for which to compute the LPS array.
 * @returns {number[]} - The LPS array.
 */
function computeLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

// Example usage:
// const text = "ABABDABACDABABCABAB";
// const pattern = "ABABCABAB";



// Test case 1: 
const pattern1 = "ABABCAB";
const text1 = "ABABABCABABABCAB";
const result1 = knuthMorrisPratt(text1, pattern1);
console.log("Occurrences of pattern in text1:", result1); // Expected output: [2, 9]


// Test case 2:
const pattern2 = "abc"
const text2 = "abcaabcaaabcd";
const result2 = knuthMorrisPratt(text2, pattern2);
console.log("Occurrences of pattern in text1:", result2); // Expected output: [0, 4, 9]
