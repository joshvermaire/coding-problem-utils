# checks if the x-th bit of n is set
def is_set(n, x):
    return (n >> x) & 1