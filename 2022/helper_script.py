import sys
import os

#Make a sub directory in the current directory with three files called Demo.txt, input.txt and Problem.md

if len(sys.argv) == 1:
    print("Please provide a directory name")
    sys.exit(1)

dir_name = sys.argv[1]

if not os.path.exists("day" + dir_name):
    os.mkdir("day" + dir_name)

f = open("day" + dir_name + "/Demo.txt", "w")
f.close()
f = open("day" + dir_name + "/input.txt", "w")
f.close()
f = open("day" + dir_name + "/problem.md", "w")
f.close()
f = open("day" + dir_name + "/part1.py", "w")
f.close()
f = open("day" + dir_name + "/part2.py", "w")
f.close()
