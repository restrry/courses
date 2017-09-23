import Debug.Trace
-- https://stepik.org/lesson/8328/step/7
data Odd = Odd Integer deriving (Eq, Show)
-- class Enum a where
--     succ, pred :: a -> a
--     toEnum :: Int -> a
--     fromEnum :: a -> Int
unOdd :: Odd -> Integer
unOdd (Odd n) = n
instance Enum Odd where
    succ a = Odd (succ (unOdd a) + 1)
    pred a = Odd (pred (unOdd a) - 1)
    toEnum a = Odd (toInteger a)
    fromEnum a = fromIntegral (unOdd a)

    -- enumFrom :: a -> [a]
    enumFrom x       =  map Odd [unOdd x, unOdd x + 2 ..]
    enumFromTo x y   =  map Odd [unOdd x, unOdd x + 2 .. unOdd y]
    enumFromThen x y =  map Odd [unOdd x, unOdd y ..]
    enumFromThenTo x y z =
                        map Odd [unOdd x, unOdd y .. unOdd z]

test0 = succ (Odd 1) == (Odd 3)
test1 = pred (Odd 3) == (Odd 1)

-- enumFrom
test2 = (take 3 $ [Odd 1 ..]) == [Odd 1,Odd 3,Odd 5]

-- enumFromTo
-- -- inc
test3 = (take 3 $ [Odd 1..Odd 7]) == [Odd 1,Odd 3,Odd 5]
-- -- dec
test4 = (take 3 $ [Odd 7..Odd 1]) == []

-- enumFromThen
-- -- inc
test5 = (take 3 $ [Odd 1, Odd 3 ..]) == [Odd 1,Odd 3,Odd 5]
-- -- dec
test6 = (take 3 $ [Odd 3, Odd 1 ..]) == [Odd 3,Odd 1,Odd (-1)]

-- enumFromThenTo
-- -- inc
test7 =([Odd 1, Odd 5 .. Odd 7]) == [Odd 1,Odd 5]
-- -- dec
test8 =([Odd 7, Odd 5 .. Odd 1]) == [Odd 7,Odd 5,Odd 3,Odd 1]
-- -- x1 < x3 && x1 > x2
test9 =([Odd 7, Odd 5 .. Odd 11]) == []
-- -- x1 > x3 && x1 < x2
test10 =([Odd 3, Odd 5 .. Odd 1]) == []

allTests = zip [0..] [test0, test1, test2, test3, test4, test5, test6, test7, test8, test9, test10]

-- https://stepik.org/lesson/8328/step/9
-- coins = [2, 3, 7]
-- change 7 ~> [[2,2,3],[2,3,2],[3,2,2],[7]]
-- change :: (Ord a, Num a) => a -> [[a]]

coins = [2, 3, 7]
change 0 = [[]]
change v = concat $ change' v
change' value = [
        map ((:) c) $ change (value-c) |
        c <- coins,
        c <= value
    ]

change2 0     = [[]];
change2 value = [
        c : cs |
        c <- coins,
        c <= value,
        cs <- change2 $ value - c
    ]
