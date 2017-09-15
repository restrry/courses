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

-- https://stepik.org/lesson/8412/step/11?course=%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B5-Haskell&unit=1551
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
