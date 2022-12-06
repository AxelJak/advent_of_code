import sys

def count_callories(filename):
    highes_calories = 0
    calories = 0
    with open(filename) as f:
        for line in f:
            if line == "\n":
                if calories > highes_calories:
                    highes_calories = calories
                calories = 0
                continue
            calories += int(line)
    print("Elf with the most calories has:",highes_calories)



if __name__ == '__main__':
    count_callories(sys.argv[1])