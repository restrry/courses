module Demo where

import Data.Function
-- let id x = x
-- :t id ~> id :: t -> t
-- :t id True ~> id True :: Bool
-- :t (id id) ~> (t -> t) -> (t -> t) ~> t -> t

-- let k x y = x
-- :t k ~> k :: t1 -> t -> t1
-- :t const ~> const: a -> b -> a

-- :t undefined ~> undefined :: a - it's universal polymorphic type
-- :t error ~> error :: [Char] -> a - it's universal polymorphic type

-- monomorphic function
mono :: Char -> Char
mono x = x

-- half-limited monomorphic function by 1st arg, polymorphic by 2nd type
semiMono :: Char -> a -> Char
semiMono x y = x

apply2 f x = f (f x)
-- :t apply2 ~> apply2 :: (t -> t) -> t -> t
-- apply2 (++ "AB") "CD" ~> "CDABAB"

flip f x y = f y x
-- :t flip ~> flip :: (a -> b -> c) -> b -> a -> c
-- flip (/) 4 2 ~> 0.5

-- https://stepik.org/lesson/8417/step/7
-- sumSquares = (+) `on` (^2)
multSecond = g `on` h
-- multSecond ('A',2) ('E',7) ~> 14
g = (*)

h = snd

{-
arg bounding
f x = 2 * x + 7
f 10 ~> 27
or with lambda
(\x -> 2 * x + 7) 10 ~> 27
or
f2 = \x -> 2 * x + 7
f2 10 ~> 27
-}
lenVec x y = sqrt $ x ^ 2 + y ^ 2
lenVec2 = \x -> \y -> sqrt $ x ^ 2 + y ^ 2
lenVec3 = \x y -> sqrt $ x ^ 2 + y ^ 2

p1 = ((1, 2), (3, 4))
p2 = ((3, 4), (5, 6))

sumFstFst = (+) `on` helper
    where helper pp = fst $ fst pp

-- sumFst p1 p2 ~> 4

sumFstFst2 = (+) `on` (\pp -> fst $ fst pp)

-- https://stepik.org/lesson/8417/step/9
on3 :: (b -> b -> b -> c) -> (a -> b) -> a -> a -> a -> c
on3 op f x y z = op (f x) (f y) (f z)

sum3squares = (\x y z -> x+y+z) `on3` (^2)
-- sum3squares 1 2 3 ~> 14
