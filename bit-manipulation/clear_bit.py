# clears the x-th bit in the number n
def clear_bit(n, x):
    return n & ~ (1 << x)