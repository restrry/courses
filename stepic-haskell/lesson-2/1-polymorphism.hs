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

-- f :: b -> c
-- g :: a -> b
-- compose f g = \x -> f (g x)
-- :t compose ~> compose :: a -> c
-- with compose function (.)
sumFstFst3 = (+) `on` (fst . fst)

-- doIt x = f (g (h x))
-- doIt = f . g . h

-- https://stepik.org/lesson/12398/step/3?unit=2828
doItYourself = f . g . h
f = logBase 2
g = (^ 3)
h = max 42

-- :t [True, False] ~> [Bool]
-- :t "ABC" ~> [Char]
-- :t [] ~> []
-- :t (++) ~> [a] -> [a] -> [a]
-- :t (:) ~> a -> [a] -> [a]

-- tuple prefix style
(,) True 3
-- :t (,) ~> (,) :: ~> a -> b -> (a, b)
-- mixfix style
(True, 3)

dup x = (x, x)
-- :t dup ~> dup :: t -> (t, t)

-- curry
cur f x y = f (x, y)
-- :t cur ~> cur :: ((t1, t2) -> t) -> t1 -> t2 -> t
-- :t curry ~> curry :: ((a, b) -> c) -> a -> b -> c
-- :t uncurry ~> uncurry :: (a -> b -> c) -> (a, b) -> c
-- curry id ~> (,)
-- uncurry (flip const) ~> snd

-- https://stepik.org/lesson/12398/step/9?unit=2828
-- swap (1,'A') ~> ('A',1)
swap = f (g h)
f = uncurry
g = flip
h = (,)
