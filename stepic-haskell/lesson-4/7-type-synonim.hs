module Demo where

import Data.Char
import qualified Data.Map as Map

-- type String = [Char]

allUpper :: String -> Bool
allUpper = all isUpper

type IntegerList = [Integer]
sumSquares :: IntegerList -> Integer
sumSquares = foldr1 (+) . map (^2)

-- xs = [1,2] :: IntegerList
-- ys = [1,2] :: [Integer]
-- xs == ys ~> True

type AssocList k v = [(k, v)]

lookup' :: Eq k => k -> AssocList k v -> Maybe v
lookup' _ []                = Nothing
lookup' key ((x, y) : xys)
    | key == x              = Just y
    | otherwise             = lookup' key xys

type IntMap = Map.Map Int
-- :k Map.Map ~> Map.Map :: * -> * -> *
-- :k IntMap ~>  IntMap :: * -> *

-- https://stepik.org/lesson/7602/step/3
-- type Endo a = a -> a
-- func :: Endo (Endo Int) -> Int
-- func x = x (1+) 1
-- test = func (\x y -> x y)

-- funcInt :: ((Integer -> Integer) -> Integer -> Integer) -> Integer
-- funcInt x = x (1+) 1
-- testInt = funcInt (\x -> x y)
