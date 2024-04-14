/**
 * 
 * @param {string} string
 * @returns string
 */
const computeHash = (string) => {
  const a = 'a'.charCodeAt(0);
  const p = 31;
  const mod = 10 ** 9 + 7;
  let hashVal = 0;
  let pow = 1;
  for (const char of string) {
    hashVal = (hashVal + pow * (char.charCodeAt(0) - a + 1)) % mod;
    pow = (pow * p) % mod;
  }
  return hashVal;
}

console.log(computeHash('hashofsometext'))