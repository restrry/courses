import Prelude hiding (filter, takeWhile, dropWhile, span, break, map, concat, concatMap, and, or, all, any, zipWith)
import Data.Char

filter :: (a -> Bool) -> [a] -> [a]
filter p [] = []
filter p (x:xs)
    | p x       = x : filter p xs
    | otherwise = filter p xs

takeWhile :: (a -> Bool) -> [a] -> [a]
takeWhile _ [] = []
takeWhile p (x:xs)
    | p x       = x : takeWhile p xs
    | otherwise = []

-- @ means local alias
dropWhile :: (a -> Bool) -> [a] -> [a]
dropWhile _ [] = []
dropWhile p xs@(x:xs')
    | p x       = dropWhile p xs'
    | otherwise = xs

span :: (a -> Bool) -> [a] -> ([a], [a])
span p xs = (takeWhile p xs, dropWhile p xs)

break :: (a -> Bool) -> [a] -> ([a], [a])
break p = span (not . p)

-- https://stepik.org/lesson/12321/step/3
-- readDigits "365ads" ~> ("365","ads")
-- readDigits "365" ~> ("365","")
readDigits :: [Char] -> ([Char], [Char])
readDigits = span isDigit

-- https://stepik.org/lesson/12321/step/4
-- filterDisj (< 10) odd [7,8,10,11,12] ~> [7,8,11]
-- or
-- filterDisj _ _ [] = []
-- filterDisj p1 p2 xs = filter (\x -> p1 x || p2 x) xs
filterDisj :: (a -> Bool) -> (a -> Bool) -> [a] -> [a]
filterDisj p1 p2 [] = []
filterDisj p1 p2 (x:xs)
    | p1 x       = x : filterDisj p1 p2 xs
    | p2 x       = x : filterDisj p1 p2 xs
    | otherwise  = filterDisj p1 p2 xs

-- https://stepik.org/lesson/12321/step/5
-- qsort [1,3,2,5] ~> [1,2,3,5]
qsort :: Ord a => [a] -> [a]
qsort [] = []
qsort xs'@(x:xs) = qsort(filter (< x) xs) ++ filter (== x) xs' ++ qsort(filter (> x) xs)
-- qsort (x:xs) = qsort(filter (<= x) xs) ++ [x] ++ qsort(filter (> x) xs)

map :: (a -> b) -> [a] -> [b]
map _ []     = []
map f (x:xs) = f x : map f xs

concat :: [[a]] -> [a]
concat []       = []
concat (xs:xss) = xs ++ concat xss

concatMap :: (a -> [b]) -> [a] -> [b]
concatMap f = concat . map f
-- concatMap (\x -> [x, x, x]) "ABC" ~> "AAABBBCCC"


-- https://stepik.org/lesson/12321/step/7
-- squares'n'cubes [3,4,5] ~> [9,27,16,64,25,125]
squares'n'cubes :: Num a => [a] -> [a]
-- squares'n'cubes [] = []
-- squares'n'cubes (x:xs) = [x ^ 2, x ^ 3] ++ squares'n'cubes xs
squares'n'cubes xs = concatMap (\x -> [x^2, x^3]) xs

-- https://stepik.org/lesson/12321/step/8
-- find all permutations
-- perms [1,2,3] ~> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
perms :: [a] -> [[a]]
perms [] = [[]]
perms xs = [ y:zs | (y,ys) <- select xs, zs <- perms ys]
  where select []     = []
        select (x:xs) = (x,xs) : [ (y,x:ys) | (y,ys) <- select xs ]

and :: [Bool] -> Bool
and []      = True
and (x:xs)  = x && and xs

or :: [Bool] -> Bool
or []      = False
or (x:xs)  = x || or xs

all :: (a -> Bool) -> [a] -> Bool
all p = and . map p

any :: (a -> Bool) -> [a] -> Bool
any p = or . map p

-- words "ABC is not" ~> ["ABC", "is", "not"]
-- unwords ["ABC", "is", "not"] ~> "ABC is not"
reverserWordsInSentence = unwords . map reverse . words

-- https://stepik.org/lesson/12321/step/10
-- delAllUpper "Abc IS not ABC" ~> "Abc not"
delAllUpper = unwords . filter (any isLower) . words

zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith _ []     _      = []
zipWith _ _     []      = []
zipWith f (x:xs) (y:ys) = f x y : zipWith f xs ys

-- https://stepik.org/lesson/12321/step/12
-- max3 [7,2,9] [3,6,8] [1,8,10] ~> [7,8,10]
max3 :: Ord a => [a] -> [a] -> [a] -> [a]
-- max3 = zipWith3 (\x y z -> maximum [x, y, z])
max3 = zipWith3 (\x y z -> max x (max y z))
-- max3 (x:xs) (y:ys) (z:zs) = max x (max y z) : max3 xs ys zs
-- max3 _      _      _      = []
