class PrimeSieve {
    /**
     * Implements the Sieve of Eratosthenes algorithm to find prime numbers up to a given maximum.
     * Time complexity is O(n log log n) and space complexity is O(n)
     * @param {number} max - The maximum possible prime number to search for.
     * @returns {boolean[]} - An array where each index represents a number up to 'max',
     *                        and the value at each index indicates whether the number is prime (true) or not (false).
     */
    static eratosthenes(max) {
        let primes = new Array(max + 1).fill(true);
        primes[0] = primes[1] = false;
        for (let i = 2; i * i <= max; i++) {
            if (primes[i] && i * i <= max) {
                for (let j = i * i; j <= max; j += i) {
                    primes[j] = false;
                }
            }
        }
        
        // primes = primes.reduce((acc, isPrime, index) => {
        //     if (isPrime) {
        //         acc.push(index);
        //     }
        //     return acc;
        // }, []);
        
        return primes;
    }

    /**
     * Implements the Linear Sieve algorithm to find prime numbers up to a given maximum.
     * Time complexity is O(n) and space complexity is O(n)
     * While technically slower, in practice this is as about as fast as the classic Sieve of Eratosthenes. 
     * It uses more memory to store primes as well as using integers instead of booleans to find prime factors.
     * Can be very useful to find the smallest prime factors of numbers in linear time.
     * @param {number} max - The maximum possible prime number to search for.
     * @returns {boolean[]} - An array of all prime numbers up to 'max'.
     */
    static linear(max) {
        const factors = new Array(max + 1).fill(0);
        const primes = [];

        for (let i = 2; i <= max; ++i) {
            if (factors[i] === 0) {
                factors[i] = i;
                primes.push(i);
            }
            for (let j = 0; i * primes[j] <= max; ++j) {
                factors[i * primes[j]] = primes[j];
                if (primes[j] === factors[i]) {
                    break;
                }
            }
        }

        return primes;
    }

    /**
     * Implements a derivative of the Sieve of Eratosthenes algorithm to find prime numbers between a range 'right' and 'left'.
     * Time complexity is O((R - L + 1) log log R + √R log log √R)
     * @param {number} left - The left bound of the range of prime numbers to search for.
     * @param {number} right - The right bound of the range of prime numbers to search for.
     * @returns {boolean[]} - An array where each index represents a number up from 'left' to 'right',
     *                        and the value at each index indicates whether the number is prime (true) or not (false).
     */
    static segmented(left, right) {
        const isPrime = new Array(right - left + 1).fill(true);
        const primes = [];
        
        const sqrt = Math.sqrt(right);
        const mark = new Array(Math.floor(sqrt) + 1).fill(false);
        for (let i = 2; i <= sqrt; ++i) {
            if (!mark[i]) {
                primes.push(i);
                for (let j = i * i; j <= sqrt; j += i)
                    mark[j] = true;
            }
        }
        
        for (const prime of primes) {
            for (let j = Math.max(prime * prime, Math.ceil(left / prime) * prime); j <= right; j += prime) {
                isPrime[j - left] = false;
            }
        }
        
        if (left === 1) {
            isPrime[0] = false;
        }
        
        return isPrime;
    }
}

let primesA = PrimeSieve.eratosthenes(12)
console.log('Eratosthenes', primesA, primesA.reduce((acc, isPrime, index) => {
    if (isPrime) acc.push(index);
    return acc;
}, []));

let primesB = PrimeSieve.linear(12)
console.log('Linear', primesB);

let primesC = PrimeSieve.segmented(3, 12);
console.log('Segmented', primesC);
