# Given the xor of two numbers, a and b, this function returns a tuple containing the two numbers.
# It does this by isolating the rightmost set bit in the xor of the two numbers and separating the two numbers based on that bit.
def xor_separation(xor):
    rightmost_set_bit = xor & -xor
    a = 0
    b = 0
    for num in xor:
        if num & rightmost_set_bit:
            a ^= num
        else:
            b ^= num
    return a, b
