import Prelude hiding (repeat, replicate, cycle, iterate)
nats n = n : nats (n + 1)
takeNfirst n = take n $ nats 0

-- head (x:xs) = x
-- head $ nats (40 + 2) ~> head (40 + 2 : nats (40 + 2 + 1)) ~> 40 + 2 ~> 42
-- squares = map (^ 2) nats 1 [x^2 | x <- ll]
-- squares = map (^ 2) nats 1 [x^2 | x <- ll]
-- take 3 $ squares ~> [1, 4, 9] [x^2 | x <- ll]
-- take 3 $ squares ~> [1, 4, 9] [x^2 | x <- ll]

--https://stepik.org/lesson/8328/step/3
-- take 10 $ fibStream ~> [0,1,1,2,3,5,8,13,21,34]
fibStream :: [Integer]
fibStream = 0 : 1 : zipWith (+) fibStream (tail fibStream)

repeat :: a -> [a]
repeat x = xs where xs = x : xs

replicate :: Int -> a -> [a]
replicate n x = take n $ repeat x

cycle :: [a] -> [a]
cycle [] = error "cannot be run on empty list"
cycle xs = ys where ys = xs ++ ys

iterate :: (a -> a) -> a -> [a]
iterate f x = x : iterate f (f x)

-- [1..10] ~> enumFromTo a b ~> [1,2,3,4,5,6,7,8,9,10]
-- enumFromTo :: Enum a => a -> a -> [a]
-- [1,3..10] ~> enumFromThenTo ~> [1,3,5,7,9]
-- [1..] ~> enumFrom
-- [7, 14...] ~> enumFromThen

ll = [1..20]
squares1 = [x^2 | x <- ll]
-- use predicate x^2 < 100
squares2 = [x^2 | x <- ll, x^2 < 100]
-- right part is changing first
tuples1 = [(x, y) | x <- [1, 2], y <- [1, 2]]
-- ~> [(1,1), (1,2), (2,1), (2,2)]
pythagoras3 = [(x, y, z) | x <- ll, y <- ll, z <- ll, x^2 + y^2 == z^2, x <= y]
