import sys

def count_callories(filename):
    with open(filename) as f:
        for line in f:
            if line == "":
                print("Empty line")
                continue
            print(line)



if __name__ == '__main__':
    count_callories(sys.argv[1])