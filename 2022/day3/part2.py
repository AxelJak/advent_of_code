import sys
from string import ascii_letters

def findCharInCommon(s1, s2, s3):
    for i in range(len(s1)):
        for j in range(len(s2)):
            for k in range(len(s3)):
                if s1[i] == s2[j] and s2[j] == s3[k]:
                    return ascii_letters.index(s1[i]) + 1
    return None

with open(sys.argv[1], "r") as f:
    counter = 0
    sum = 0
    arr = []
    for line in f:
        counter += 1
        arr.append(line)
        if counter % 3 == 0:
            sum += findCharInCommon(arr[0], arr[1], arr[2])
            arr = []

print(sum)