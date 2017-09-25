module Demo where

import Data.Char

test = isDigit '7'

-- https://stepik.org/lesson/8412/step/9
-- if we both passed args are digits - cast to Int and create number, return 100 otherwise
twoDigits2Int :: Char -> Char -> Int
twoDigits2Int a b =
  if isDigit a && isDigit b
    then (digitToInt a) * 10 + digitToInt b
    else 100
