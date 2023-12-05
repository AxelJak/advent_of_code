{-# LANGUAGE OverloadedStrings #-}
import Data.Text
import Data.Text.Internal.Search


findStringMaybe :: Text -> Text -> Maybe Int
findStringMaybe x str = case indices x str of
                         (idx:_) -> Just idx
                         _ -> Nothing


findDigit :: [Char] -> Int
findDigit "one" = 1
findDigit "two" = 2
findDigit "three" = 3
findDigit "four" = 4
findDigit "five" = 5
findDigit "six" = 6
findDigit "seven" = 7
findDigit "eight" = 8
findDigit "nine" = 9
findDigit _ = 0
