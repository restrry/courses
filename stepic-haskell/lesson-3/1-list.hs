import Prelude hiding (length, (++), null)
{-
[] -- create empty list
3 : [] -- add to head
lst = 5 : 3 : [] -- ~> [5, 3]
[5, 3] == lse -- ~> True
-- list is immutable
-- cons42 :: [Integer] -> [Integer]
cons42 = (42 :)
cons42 [1, 2, 3] -- ~> [42, 1, 2, 3]
-}
addTwoElements :: a -> a -> [a] -> [a]
addTwoElements a b list = a : b : list

-- nTimes 42 3 ~> [42,42,42]
-- nTimes 'z' 5 ~> "zzzzz"

nTimes :: a -> Int -> [a]
nTimes x y = helper [] y
    where
    helper list 0 = list
    helper list n = helper (x:list) (n - 1)

-- :t head ~> head :: [a] -> a
-- head [1, 2, 3] ~> 1
-- : t tail ~> tail :: [a] -> [a]
-- tail [1, 2, 3] ~> [2, 3]
-- head [] ~> error empty list
second :: [a] -> a
second xs = head (tail xs)
-- or second = head . tail
-- second [1, 2, 3] ~> 2

-- usage with pattern matching
fst1 ((,) x y) = x
head1 ((:) x xs) = x
head2 ((:) x _) = x
tail1 (x:xs) = xs
tail2 (_:xs) = xs

second2 :: [a] -> a
second2 (_ : xs) = head xs

second3 :: [a] -> a
second3 (_ : x : xs) = x

second4 :: [a] -> a
second4 (_ : x : _) = x


length :: [a] -> Int
length []      = 0
length (_:xs)  = 1 + length xs

-- O(n) compexity
(++) :: [a] -> [a] -> [a]
[] ++ ys     = ys
(x:xs) ++ ys = x : (xs ++ ys)

null :: [a] -> Bool
null [] = True
null _  = False

-- oddsOnly [2,5,7,10,11,12] ~> [5,7,11]
oddsOnly :: Integral a => [a] -> [a]
oddsOnly []     = []
oddsOnly (x:xs) = if odd x
                    then x : oddsOnly xs
                    else oddsOnly xs
