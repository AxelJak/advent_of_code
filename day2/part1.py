# A = Rock
# B = Paper
# C = Scissors

#X = Rock 1p
#Y = Paper 2p
#Z = Scissors 3p

# Read the input file
import sys

if len(sys.argv) != 2:
    print("Usage: python part1.py <input_file>")
    sys.exit(1)

sum = 0

with open(sys.argv[1], "r") as f:
    for line in f:
        line = line.split()
        opponent = line[0]
        player = line[1]
        if player == 'X':
            if opponent == 'A':
                sum += 1 + 3
            elif opponent == 'B':
                sum += 1
            elif opponent == 'C':
                sum += 1 + 6
        elif player == 'Y':
            if opponent == 'A':
                sum += 2 + 6
            elif opponent == 'B':
                sum += 2 + 3
            elif opponent == 'C':
                sum += 2
        elif player == 'Z':
            if opponent == 'A':
                sum += 3
            elif opponent == 'B':
                sum += 3 + 6
            elif opponent == 'C':
                sum += 3 + 3

print(sum)
