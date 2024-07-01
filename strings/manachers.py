# Manacher's algorithm to find all palindromic substrings
def manacher(s: str):
    t = '#'.join(f'^{s}$')
    n = len(t)
    p = [0] * n
    center = right = 0
    for i in range(1, n - 1):
        p[i] = (right > i) and min(right - i, p[2 * center - i])
        while t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1
        if i + p[i] > right:
            center, right = i, i + p[i]
    return p

print(manacher('abacaba'))
# Output: [0, False, 1, False, 3, False, 1, False, 7, False, 1, False, 3, False, 1, False, 0]

print(manacher('abacabadabacaba'))
# Output: [0, False, 1, False, 3, False, 1, False, 7, False, 1, False, 3, False, 1, False, 15, False, 1, False, 3, False, 1, False, 7, False, 1, False, 3, False, 1, False, 0]
