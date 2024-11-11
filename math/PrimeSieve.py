import math

class PrimeSieve:
    @staticmethod
    def eratosthenes(max, return_as_array=False):
        """
        Implements the Sieve of Eratosthenes algorithm to find prime numbers up to a given maximum.
        Time complexity is O(n log log n) and space complexity is O(n)
        :param max: The maximum possible prime number to search for.
        :param return_as_array: If True, return an array of prime numbers instead of a boolean list.
        :return: A list where each index represents a number up to 'max', and the value indicates whether the number is prime.
        """
        primes = [True] * (max + 1)
        primes[0] = primes[1] = False

        for i in range(2, int(math.sqrt(max)) + 1):
            if primes[i]:
                for j in range(i * i, max + 1, i):
                    primes[j] = False

        if return_as_array:
            return [index for index, is_prime in enumerate(primes) if is_prime]

        return primes

    @staticmethod
    def linear(max):
        """
        Implements the Linear Sieve algorithm to find prime numbers up to a given maximum.
        Time complexity is O(n) and space complexity is O(n)
        :param max: The maximum possible prime number to search for.
        :return: A list of all prime numbers up to 'max'.
        """
        factors = [0] * (max + 1)
        primes = []

        for i in range(2, max + 1):
            if factors[i] == 0:
                factors[i] = i
                primes.append(i)

            j = 0
            while j < len(primes) and i * primes[j] <= max:
                factors[i * primes[j]] = primes[j]
                if primes[j] == factors[i]:
                    break
                j += 1

        return primes

    @staticmethod
    def segmented(left, right):
        """
        Implements a derivative of the Sieve of Eratosthenes algorithm to find prime numbers between a range.
        Time complexity is O((R - L + 1) log log R + √R log log √R)
        :param left: The left bound of the range of prime numbers to search for.
        :param right: The right bound of the range of prime numbers to search for.
        :return: A list where each index represents a number up from 'left' to 'right',
                 and the value indicates whether the number is prime (True) or not (False).
        """
        is_prime = [True] * (right - left + 1)
        primes = []

        sqrt = math.ceil(math.sqrt(right))
        mark = [False] * (sqrt + 1)

        # Generate primes up to sqrt(right)
        for i in range(2, sqrt + 1):
            if not mark[i]:
                primes.append(i)
                for j in range(i * i, sqrt + 1, i):
                    mark[j] = True

        # Mark non-primes in the range [left, right]
        for prime in primes:
            start = max(prime * prime, math.ceil(left / prime) * prime)
            for j in range(start, right + 1, prime):
                is_prime[j - left] = False

        if left == 1:
            is_prime[0] = False

        return is_prime

# Example usage
primesA = PrimeSieve.eratosthenes(12, return_as_array=True)
print('Eratosthenes (as Array):', primesA)

primesB = PrimeSieve.linear(12)
print('Linear:', primesB)

primesC = PrimeSieve.segmented(3, 12)
print('Segmented:', primesC, [index + 3 for index, is_prime in enumerate(primesC) if is_prime])
