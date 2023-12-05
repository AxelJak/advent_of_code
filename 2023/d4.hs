import System.IO

preCompare :: [[Char]] -> Int
preCompare [[]] = 0
preCompare x = sumCard (compare' (take 10 x) (drop 11 x))


compare' :: [[Char]] -> [[Char]] -> Int
compare' [] _ = 0
compare' (x:xs) y = sum (map (isEqual x) y) + compare' xs y

sumCard :: Int -> Int
sumCard x
        | x == 1 = 1
        | x == 2 = 2
        | x > 2 = 2^(x-1)
        | otherwise = 0

isEqual :: [Char] -> [Char] -> Int
isEqual x y = if x == y then 1 else 0

main = do
    handle <- openFile "input.txt" ReadMode
    contents <- hGetContents handle
    let linesOfString = map words (lines contents)
    let cards = map (drop 2) linesOfString
    let res = sum $ map preCompare cards
    print res
    hClose handle
