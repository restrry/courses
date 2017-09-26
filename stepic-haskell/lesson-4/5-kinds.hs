module Demo where

-- uses forcing
{-
data Complex a = !a :+ !a
data Ratio a = !a :% !a
-}
import Data.Complex
import Data.Ratio
-- :type 'c' ~> 'c' :: char
-- :kind Char ~> Char :: *
-- * is kind for all basic types
-- :k Maybe ~> Maybe :: * -> *
-- :k Maybe Int ~> Maybe Int :: *
-- :k Either Int Char ~> Either Int Char :: *
-- :k [] ~> [] :: * -> *
-- :k [Int] ~> [Int] :: *
-- :k (,) ~> (,) :: * -> * -> *
-- :k Int -> [] Int ~> Int -> [] Int :: *
-- :k (->) ~> (->) :: * -> * -> *
-- :k (->) Char [Char] ~> (->) Char [Char] :: *

-- https://stepik.org/lesson/5746/step/12
eitherToMaybe :: Either a  b -> Maybe a
eitherToMaybe (Left a) = Just a
eitherToMaybe (Right _) = Nothing

data CoordLazy a = CoordLazy a a
    deriving (Show)

-- ! forces calculations during object init
-- some fields still could be lazy: CoordStrict a !a
data CoordStrict a = CoordStrict !a !a
    deriving (Show)

getXLazy :: CoordLazy a -> a
getXLazy (CoordLazy x _) = x

getXStrict :: CoordStrict a -> a
getXStrict (CoordStrict x _) = x
