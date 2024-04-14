/**
 * Finds the greatest common divisor (GCD) of two positive integers using the Euclidean Algorithm.
 * 
 * Time and space complexity is O(log(min(a, b)))
 *
 * @param {number} a - The first positive integer.
 * @param {number} b - The second positive integer.
 * @returns {number} The GCD of `a` and `b`.
 */
const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
}