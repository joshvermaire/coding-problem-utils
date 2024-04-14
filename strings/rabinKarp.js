/**
 * 
 * Finds all occurrences of a pattern string within a given text using the Rabin-Karp algorithm.
 *
 * @param {string} s The pattern string to search for.
 * @param {string} t The text in which to search for the pattern.
 * @returns {number[]} An array of indices where the pattern occurs in the text.
 */
function rabinKarp(s, t) {
    const p = 31;
    const m = 1e9 + 9;
    const S = s.length;
    const T = t.length;

    const pPow = new Array(Math.max(S, T));
    pPow[0] = 1;
    for (let i = 1; i < pPow.length; i++) {
        pPow[i] = (pPow[i - 1] * p) % m;
    }

    const h = new Array(T + 1).fill(0);
    for (let i = 0; i < T; i++) {
        h[i + 1] = (h[i] + (t.charCodeAt(i) - 'a'.charCodeAt(0) + 1) * pPow[i]) % m;
    }

    let hS = 0;
    for (let i = 0; i < S; i++) {
        hS = (hS + (s.charCodeAt(i) - 'a'.charCodeAt(0) + 1) * pPow[i]) % m;
    }

    const occurrences = [];

    for (let i = 0; i + S - 1 < T; i++) {
        const curH = (h[i + S] + m - h[i]) % m;
        if (curH === (hS * pPow[i]) % m) {
            occurrences.push(i);
        }
    }

    return occurrences;
}

// Test case 1: Pattern occurs multiple times in the text
const text1 = "ababcabcabababc";
const pattern1 = "abc";
const result1 = rabinKarp(pattern1, text1);
console.log("Occurrences of pattern in text1:", result1); // Expected output: [2, 5, 12]

// Test case 2: Pattern occurs at the beginning of the text
const text2 = "abcxyzdef";
const pattern2 = "abc";
const result2 = rabinKarp(pattern2, text2);
console.log("Occurrences of pattern in text2:", result2); // Expected output: [0]

// Test case 3: Pattern occurs at the end of the text
const text3 = "xyzdefabc";
const pattern3 = "abc";
const result3 = rabinKarp(pattern3, text3);
console.log("Occurrences of pattern in text3:", result3); // Expected output: [6]

// Test case 4: Pattern does not occur in the text
const text4 = "hello world";
const pattern4 = "abc";
const result4 = rabinKarp(pattern4, text4);
console.log("Occurrences of pattern in text4:", result4); // Expected output: []