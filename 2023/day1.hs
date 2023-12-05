import Data.Char
import System.IO

doubleMe x = x + x

dropChars :: [Char] -> Int
dropChars xs = readInt [x | x <- xs, isDigit x]

readInt :: [Char] -> Int
readInt [x] = read (x:[x])
readInt xs = read (head xs : [last xs])

main = do
    handle <- openFile "input.txt" ReadMode
    contents <- hGetContents handle
    let linesOfString = lines contents
    print (sum [dropChars x | x <- linesOfString])
    hClose handle


