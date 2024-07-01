# sets the x-th bit in the number n
def set_bit(n, x):
    return n | (1 << x)