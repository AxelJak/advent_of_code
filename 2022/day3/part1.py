import sys
from string import ascii_letters

def findCharInCommon(s1, s2):
    for i in range(len(s1)):
        for j in range(len(s2)):
            if s1[i] == s2[j]:
                return ascii_letters.index(s1[i]) + 1
    return None


sum = 0
with open(sys.argv[1], "r") as f:
    for line in f:
        line = line[:-1]
        length = len(line)
        half = length // 2
        parts = [line[:half], line[half:]]
        point = findCharInCommon(parts[0], parts[1])
        sum += point
        
print(sum)

