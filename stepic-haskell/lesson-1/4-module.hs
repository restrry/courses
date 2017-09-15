module Demo where

import Data.Char

test = isDigit '7'

-- https://stepik.org/lesson/8412/step/9?course=%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B5-Haskell&unit=1551
-- if we both passed args are digits - cast to Int and create number, return 100 otherwise
twoDigits2Int :: Char -> Char -> Int
twoDigits2Int a b =
  if isDigit a && isDigit b
    then (digitToInt a) * 10 + digitToInt b
    else 100
