-- declare type
let x = 3 :: Int
let y = 3 :: Double

-- :t (&&)
-- (&&) :: Bool -> Bool -> Bool

-- tuples
-- (2, True)
-- fst (2, True) ~> 2
-- snd (2, True) ~> True

{-
:t ('x', True, 'u')
('x', True, 'u') :: (Char, Bool, Char)
-}

-- https://stepik.org/lesson/8412/step/11
-- implement function calcs distance between two points
dist :: (Double, Double) -> (Double, Double) -> Double
dist x y = sqrt $ (fst(x) - fst(y))^2 + (snd(x) - snd(y))^2

-- list
-- :t [1, 2]
-- [1,2] :: Num a => [a]
-- ['H', 'i'] ~> "Hi"
-- :t "Hi"
-- "Hi" :: [Char]
-- "Hi" :: String also

-- add to list head
let str = 'H' : "ello" ~> "Hello"
-- concatination
str ++ " world" ~> "Hello world"
