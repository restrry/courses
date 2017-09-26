module Demo where

import Data.List (find)
import Data.Char (isDigit)

data CoordD = CoordD Double Double

data CoordI = CoordI Int Int

-- parametrised type constructor
data Coord a = Coord a a
    deriving (Show)
-- Coord (3::Int) (4::Int)  ~> :t ~> Coord Int

-- https://stepik.org/lesson/5746/step/3
distance :: Coord Double -> Coord Double -> Double
distance (Coord x1 y1) (Coord x2 y2) = sqrt ((x2 - x1) ^ 2 + (y2 - y1) ^ 2)

manhDistance :: Coord Int -> Coord Int -> Int
manhDistance (Coord x1 y1) (Coord x2 y2) = abs(x2 - x1) + abs(y2 - y1)

-- https://stepik.org/lesson/5746/step/4
getCenter :: Double -> Coord Int -> Coord Double
getCenter width (Coord x y) = Coord cX cY
    where
        cX = calcCenterBy width $ fromIntegral x
        cY = calcCenterBy width $ fromIntegral y

calcCenterBy :: Double -> Double -> Double
calcCenterBy width x = width * (x + 0.5)

getCell :: Double -> Coord Double -> Coord Int
getCell width (Coord x y) = Coord cX cY
        where
            cX = floor $ x / width
            cY = floor $ y / width

twice :: a -> [] a -- the same as > twice :: a -> [a]
twice x = [x, x]

thrice :: a -> (,,) a a a
thrice x = (,,) x x x

id' :: (->) a a -- the same as > id' :: a -> a
id' x = x

k :: (->) a ((->) b a)
k x y = x

{-
data Maybe a = Nothing | Just a
data Either a b = Left a | Right b

:t Just (2::Int) ~> Just (2::Int) :: Maybe Int

:t Left "ABC" ~> Left "ABC" :: Either [Char] b
:t Right True ~> Right True :: Either a Bool
-}

roots :: Double -> Double -> Double -> Either [Char] (Double, Double)
roots a b c
    | discr >= 0 = Right (x1, x2)
    | otherwise  = Left "Negative discriminant"
    where
        x1 = helper (-d)
        x2 = helper d
        helper x = (-b + x) / (2 * a)
        d = sqrt discr
        discr = b ^ 2 - 4 * a * c

-- https://stepik.org/lesson/5746/step/6
findDigit :: [Char] -> Maybe Char
findDigit = find isDigit

-- https://stepik.org/lesson/5746/step/7
findDigitOrX :: [Char] -> Char
findDigitOrX x = case findDigit x of
        (Just x) -> x
        _        -> 'X'

-- https://stepik.org/lesson/5746/step/8
maybeToList :: Maybe a -> [a]
maybeToList (Just x)  = [x]
maybeToList Nothing   = []

listToMaybe :: [a] -> Maybe a
listToMaybe xs | length xs > 0 = Just $ head xs
               | otherwise     = Nothing
