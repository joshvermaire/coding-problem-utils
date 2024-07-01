# This function isolates the least significant (rightmost) set bit in a number.
# It does this by taking the two's complement of the number and performing a bitwise AND operation with the original number.
#
# To get the two's compliment of a number, you can do one of the following:
# 1. Get the bitwise NOT of the number and add 1.
# 2. Get the negative of the number.
#
# For example:
# The binary representation of  10 is 1010.
# The binary representation of -10 is 0110.
# The bitwise AND operation of 10 and -10 is 2 or the binary representation 10.
def isolate_lowest_set_bit(n):
    return n & -n

print(isolate_lowest_set_bit(10)) # 2
