module Demo where

import Control.Monad.Writer

calc :: (Int -> Int -> Int) -> Int -> Int -> Writer (Sum Integer) Int
calc op arg1 arg2 = do
    let res = arg1 `op` arg2
    tell 12
    if abs res < 128 then
        return res
    else do
        tell 11
        return res

-- https://stepik.org/lesson/8442/step/6
-- purchase :: String -> Integer -> Shopping
-- purchase item cost = tell (Sum cost)

-- total :: Shopping -> Integer
-- total = getSum . execWriter

-- https://stepik.org/lesson/8442/step/7
type Shopping = Writer (Sum Integer, [String]) ()

-- shopping1 :: Shopping
-- shopping1 =
--     do
--     purchase "Jeans"   19200
--     purchase "Water"     180
--     purchase "Lettuce"   328

purchase :: String -> Integer -> Shopping
purchase item cost = tell (Sum cost, [item])

total :: Shopping -> Integer
total = getSum . fst . execWriter

items :: Shopping -> [String]
items = snd . execWriter
