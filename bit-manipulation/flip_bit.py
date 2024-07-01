# flips the x-th bit in the number n
def flip_bit(n, x):
    return n ^ (1 << x)