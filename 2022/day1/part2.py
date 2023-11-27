import sys

def count_callories(filename):
    highest_calories = [0,0,0]
    calories = 0
    with open(filename) as f:
        for line in f:
            if line == "\n":
                # Find the lowest amount in Highest_calories and compare it to calories to see if calories is higher if it is then replace the lowest amount in highest_calories with calories
                if calories > min(highest_calories):
                    highest_calories[highest_calories.index(min(highest_calories))] = calories
                calories = 0
                continue
            calories += int(line)
        if calories > min(highest_calories):
            highest_calories[highest_calories.index(min(highest_calories))] = calories
    print("Elf with the most calories has:",sum(highest_calories))



if __name__ == '__main__':
    count_callories(sys.argv[1])