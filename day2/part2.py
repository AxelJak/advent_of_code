# A = Rock 1p
# B = Paper 2p
# C = Scissors 3p

#X = lose
#Y = draw
#Z = win

# Read the input file
import sys

if len(sys.argv) != 2:
    print("Usage: python part1.py <input_file>")
    sys.exit(1)

def rock_paper_scissors(opponent, outcome):
    if outcome == 'X':
        # lose 0 points
        if opponent == 'A':
            return 3
        elif opponent == 'B':
            return 1
        elif opponent == 'C':
            return 2
    elif outcome == 'Y':
        #draw 3 points
        if opponent == 'A':
            return 4
        elif opponent == 'B':
            return 5
        elif opponent == 'C':
            return 6
    elif outcome == 'Z':
        #win 6 points
        if opponent == 'A':
            return 8
        elif opponent == 'B':
            return 9
        elif opponent == 'C':
            return 7

sum = 0

with open(sys.argv[1], "r") as f:
    for line in f:
        line = line.split()
        opponent = line[0]
        outcome = line[1]
        sum += rock_paper_scissors(opponent, outcome)

print(sum)
