function countPrefixSuffixPairs(words) {
    const freq = new Map();
    let ans = 0;
    const mod = 10 ** 9 + 7;
    const p = 37;

    for (const w of words) {
        const z = zFunction(w);
        let hash = 0;

        for (let i = 1; i <= w.length; i++) {
            hash = (hash * p + (w.charCodeAt(i - 1) - 'a'.charCodeAt(0) + 1)) % mod;
            if (z[w.length - i] === i && freq.get(hash) != null) {
                ans += freq.get(hash);
            }
        }

        freq.set(hash, (freq.get(hash) || 0) + 1);
    }

    return ans;
}

function zFunction(string) {
    const n = string.length;
    const zArray = new Array(n).fill(0);
    zArray[0] = n; // set 0th index to the full length of the string
  
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

// Example usage:
const words = ["a","aba","ababa","aa"]; // 4
// const words = ["pa","papa","ma","mama"]; // 2
// const words = ["abab","ab"]; // 0
const result = countPrefixSuffixPairs(words);
console.log("Number of prefix-suffix pairs:", result);

