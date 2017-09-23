import Prelude hiding (foldr, foldl, foldl1, foldr1, maximum, scanr, iterate)

import Data.List (scanl)
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f ini []      = ini
foldr f ini (x:xs)  = x `f` foldr f ini xs

sumList :: [Integer] -> Integer
sumList = foldr (+) 0

sumPositiveSquares :: [Integer] -> Integer
sumPositiveSquares = foldr (\x s -> if x > 0 then x^2 + s else s) 0
sumPositiveSquares2 = foldr f 0
    where
        f x s = if x > 0 then x^2 + s else s

sumPositiveSquares3 = foldr f 0
    where
        f x s | x > 0     = x^2 + s
              | otherwise = s


-- https://stepik.org/lesson/4745/step/3
-- concatList [[1,2],[],[3]] ~> [1,2,3]

concatList :: [[a]] -> [a]
concatList = foldr (++) []

-- https://stepik.org/lesson/4745/step/5
-- lengthList [7,6,5] ~> 3
lengthList :: [a] -> Int
lengthList = foldr (\a s -> s + 1) 0

-- https://stepik.org/lesson/4745/step/6
sumOdd :: [Integer] -> Integer
-- sumOdd [2,5,30,37] ~> 42
sumOdd = foldr f 0
    where
        f x s | odd x     = x + s
              | otherwise = s

sumOdd2 = foldr (+) 0 . filter odd

{-
foldr f ini 1:2:3:[]
~> 1 `f` foldr f ini (2:3:[])
~> 1 `f` (2 `f` foldr f ini (3:[]))
~> 1 `f` (2 `f` (3 `f` foldr f ini ([])))
~> 1 `f` (2 `f` (3 `f` ini))
-}

foldl :: (b -> a -> b) -> b -> [a] -> b
{-
in lazy mode ! thunk -> thunk -> thunk !
foldl f ini 1:2:3:[] ~> f(f(f ini 1) 2) 3)
-}
foldl f ini []     = ini
-- foldl f ini (x:xs) = foldl f (f ini x) xs
foldl f ini (x:xs) = foldl f ini' xs
    where ini' = f ini x

foldl' :: (b -> a -> b) -> b -> [a] -> b
foldl' f ini []     = ini
foldl' f ini (x:xs) = ini' `seq` foldl' f ini' xs
    where ini' = f ini x

sumMul = foldr (\x (s, p) -> (x + s,x * p)) (0, 1)

-- https://stepik.org/lesson/5790/step/8
-- meanList [1,2,3,4]
meanList :: [Double] -> Double
meanList xs =  (/) (foldr (+) 0 xs) (fromIntegral $ length xs)

-- https://stepik.org/lesson/5790/step/9
-- evenOnly [1..10] ~> [2,4,6,8,10]
-- evenOnly ['a'..'z'] ~> "bdfhjlnprtvxz"
evenOnly :: [a] -> [a]
evenOnly xs = foldr f [] (zip [1..] xs)
    where
    f (i, x) acc | even i    = x : acc
                 | otherwise = acc


any :: (a -> Bool) -> [a] -> Bool
any p = foldr (\x b -> p x || b) False

foldr1 :: (a -> a -> a) -> [a] -> a
foldr1 _ [x]    = x
foldr1 f (x:xs) = f x (foldr1 f xs)
foldr1 _ []     = error "empty list"

foldl1 :: (a -> a -> a) -> [a] -> a
foldl1 f (x:xs) = foldl f x xs
foldl1 _ []     = error "empty list"

maximum :: (Ord a) => [a] -> a
maximum = foldl1 max

-- https://stepik.org/lesson/6196/step/3
lastElem :: [a] -> a
lastElem = foldl1 $ flip $ const

-- foldl f ini [1,2...] ~>> [ini, f ini 1, f (f ini 1) 2, ..]
-- scanl :: (b -> a -> b) -> b -> [a] -> [b]
-- scanl f ini []     = [ini]
-- scanl f ini (x:xs) = ini : scanl f (f ini x) xs

facs :: (Num a, Enum a) => [a]
facs = scanl (*) 1 [1..]
-- get by index
factorialOf5 = facs !! 5

partialSum :: (Num a) => [a] -> [a]
partialSum = scanl (+) 0

-- обратный факториал
bFacts = take 15 . partialSum . map (**(-1)) $ facs

-- foldr f ini [1,2...] ~>> [...f(f ini 3) 2, f ini 3, ini]
-- scanr :: (a -> b -> b) -> b -> [a] -> [b]
-- scanl f ini []     = [ini]
-- scanl f ini (x:xs) = (x `f` q) : qs
--                     where qs@(q:_) = scanr f ini xs

unfold :: (b -> (a, b)) -> b -> [a]
unfold f ini = let (x, ini') = f ini in
    x : unfold f ini'

iterate f = unfold (\x -> (x, f x))

-- :t Nothing ~> Nothing :: Maybe a
-- :t Just ~> Just :: a -> Maybe a
-- :t Just True ~> Just True :: Maybe Bool
-- :t Just False ~> Just False :: Maybe Bool

-- :t find ~> find :: (a -> Bool) -> [a] -> Maybe a
-- find odd [2,3,4] ~> Just 3
-- find odd [2,4,6] ~> Nothing

unfoldr :: (b -> Maybe(a, b)) -> b -> [a]
unfoldr f ini = helper (f ini) where
    helper (Just(x, ini')) = x : unfoldr f ini'
    helper Nothing         = []

-- unfoldr (\x -> if x == 10 then Nothing else Just(x, x + 2)) 0 ~> [0, 2, 4, 6, 8]

-- https://stepik.org/lesson/6196/step/10

-- revRange ('a','z') ~> "zyxwvutsrqponmlkjihgfedcba"
-- x >= a и x <= b
revRange :: (Char,Char) -> [Char]
revRange (fin, start) = unfoldr g start where
    g x = if x < fin then Nothing else Just(x, pred x)

