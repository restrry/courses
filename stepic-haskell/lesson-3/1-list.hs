import Prelude hiding (length, (++), null, last, init, reverse, zip, zip3, unzip, take, drop, splitAt, (!!))
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

last :: [a] -> a
last (x:[]) = x -- match on 1 elem list
last (_:xs) = last xs

init :: [a] -> [a]
init []     = error "Error! cannot be applied on empty list"
init [_]    = [] -- match on 1 elem list
init (x:xs) = x : init xs

{-
sum, product :: (Num a) => [a] -> a
maximum, minimum :: (Ord a) => [a] -> a
-}

reverse :: [a] -> [a]
reverse l = rev l []
    where
    rev []      a = a
    rev (x:xs)  a = rev xs (x:a)

zip :: [a] -> [b] -> [(a, b)]
zip []      bs      = []
zip as      []      = []
zip (a:as)  (b:bs)  = (a, b) : zip as bs

zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]
zip3 (a:as) (b:bs) (c:cs) = (a, b, c) : zip3 as bs cs
zip3 _      _      _      = []

unzip :: [(a, b)] -> ([a], [b])
unzip [] = ([], [])
unzip ((x, y):xys) =
    let (xs, ys) = unzip xys
    in (x:xs, y:ys)

-- https://stepik.org/lesson/8326/step/12
-- sum3 should sum 3 passed array by longest length
-- sum3 [1,2,3] [4,5] [6] ~> [11,7,3]
sum3 :: Num a => [a] -> [a] -> [a] -> [a]
sum3 a b c = sum2 a $ sum2 b c
    where
    sum2 []     []      = []
    sum2 (x:xs) []      = x : sum2 xs []
    sum2 []     (y:ys)  = y : sum2 ys []
    sum2 (x:xs) (y:ys)  = x + y : sum2 xs ys


-- groupElems [] ~> []
-- groupElems [1,2] ~> [[1],[2]]
-- groupElems [1,2,2,2,4] ~> [[1],[2,2,2],[4]]
-- groupElems [1,2,3,2,4] ~> [[1],[2],[3],[2],[4]]
-- https://stepik.org/lesson/8326/step/13
-- groupElems consecutive elements
groupElems :: Eq a => [a] -> [[a]]
groupElems [] = []
groupElems (x : []) = [[x]]
groupElems (x:xs) = if x == head xs
                        then [x,x] : groupElems (tail xs)
                        else [x] : groupElems xs

take :: Int -> [a] -> [a]
take n _  | n <= 0  = []
take _ []           = []
take n (x:xs)       = x : take (n - 1) xs

drop :: Int -> [a] -> [a]
drop n xs | n <= 0  = xs
drop _ []           = []
drop n (x:xs)       = drop (n - 1) xs

splitAt :: [a] -> ([a], [a])
splitAt n xs = (take n xs, drop n xs)

xs      !! n | n < 0    = error "negative index"
[]      !! _            = error "index too large"
(x:_)   !! 0            = x
(_:xs)  !! n            = xs !! (n - 1)
