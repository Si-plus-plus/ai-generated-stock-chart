import random

def hashName (s):
    mul = random.randint(1, 23)
    mod = random.randint(1e2, 1e3)
    hashVal = 0

    for x in s:
        hashVal *= mul
        hashVal %= mod

        hashVal += ord(x)
        hashVal %= mod

    return hashVal
