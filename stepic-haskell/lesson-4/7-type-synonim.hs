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


newtype IntList = IList [Int] deriving Show
example = IList [1,2]

data IntList' = IList' [Int] deriving Show
-- newtype is lazy type and could be optimized on copilation step
-- newtype couldn't be used for pattern matching since that is deleted
-- on compilation step because newtype exists on compilation step, not during runtime
ignore' :: IntList' -> String
ignore' (IList' _) = "Hello"

ignore :: IntList -> String
ignore (IList _) = "Hello"

newtype Identity a = Identity {runIdentity :: a}
    deriving (Eq, Show)

-- :k Identity    ~> * -> *
-- :t Identity    ~> a -> Identity a
-- :t runIdentity ~> Identity a -> a
